const fs = require('fs');
const patients = require('../patients/patients');
const ObjectID = require('mongodb').ObjectID;

class Appointments
{
    constructor(filename = "appointments.json")
    {
        this.path = `./data/${filename}`;

        try
        {
            fs.readdirSync('data');
        }
        catch (error)
        {
            fs.mkdirSync('data');
        }

        try
        {
            fs.accessSync(this.path);
        }
        catch (error)
        {
            fs.writeFileSync(this.path, '[]');
        }
    }

    createId()
    {
        return new ObjectID();;
    };

    async add(data, id)
    {
        if(!data)
            throw("Error");

        console.log(data);

        data.description = data.description.trim();

        const totalData = JSON.parse(await fs.promises.readFile(this.path));
        totalData.push({
            ...data,
            "_id": id,
        });

        await fs.promises.writeFile(this.path, JSON.stringify(totalData, null, 2));
    }

    async getAll()
    {
        const appointments = [];
        const data = JSON.parse(await fs.promises.readFile(this.path));

        data.forEach(appointment => {
            let appointment_date = new Date(+appointment.date);
            appointment.date_ms = +appointment.date;
            appointment.date = appointment_date.getFullYear().toString() + "-" + (1 + appointment_date.getMonth()) + "-" + appointment_date.getDate().toString();
            appointment.time = appointment_date.getHours() + ":" + appointment_date.getMinutes();
        });
        for(let i = 0; i < data.length; i++)
        {
            const appointment = data[i];
            if(appointments.find(i => i.title === appointment.date))
            continue;
            let the_same_date = data.filter(item => item.date === appointment.date);
            appointments.push({ title: appointment.date, data: the_same_date });
        }
        return appointments;
    }

    async getSingle(id)
    {
        const data = await JSON.parse(await fs.promises.readFile(this.path));
        return data.find(appointment => appointment._id === id);
    }

    async getByPatientId(id)
    {
        const data = await JSON.parse(await fs.promises.readFile(this.path));
        const needed_appointments = [];
        data.forEach(appointment => {
            if(appointment.patient_id === id)
                needed_appointments.push(appointment);
        });

        return needed_appointments;
    }

    async getByDoctorId(id)
    {
        const data = await JSON.parse(await fs.promises.readFile(this.path));
        return data.find(appointment => appointment.doctor_id === id);
    }

    async remove(id)
    {
        let data = await JSON.parse(await fs.promises.readFile(this.path));
        const index = data.findIndex(appointment => appointment._id === id);
        if(index !== 'undefined')
        {
            data.splice(index, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
        }
        else
            throw("error");
    }

    async getDoned()
    {
        const data = await JSON.parse(await fs.promises.readFile(this.path));
        return data.find(appointment => appointment.status && appointment.status === "done");
    }

    async setDone(id, data)
    {
        console.log(id);
        const TotalData = await JSON.parse(await fs.promises.readFile(this.path));
        // console.log(TotalData.find(appointment => appointment._id === id));
        // let index = TotalData.findIndex(appointment => appointment._id === id);
        // data[index] = {
        //     _id: data[index]._id,
        //     date: data[index].date,
        //     description: data[index].description,
        //     patient_id: data[index].patient_id,
        //     status: ="done";
        //     tooth: appointment.tooth === "8";
        //     ppointment.price === "50";
        // }
        TotalData.forEach(appointment => {
            if(appointment._id === id)
            {
                appointment.status = "done";
                appointment.tooth = data.tooth;
                appointment.price = data.price;
                appointment.description = data.description.trim();
            }
        });
        // console.log(TotalData.find(appointment => appointment._id === id));
        await fs.promises.writeFile(this.path, JSON.stringify(TotalData, null, 2));
        return true;
    }

    // async addToAppointment(data, id)
    // {
    //     console.log(data)
    //     console.log(id)

    //     const totalData = await JSON.parse(await fs.promises.readFile(this.path));
    //     totalData.forEach(appointment => {
    //         console.log("appointment: ", appointment);
    //         if(appointment._id === id)
    //         {
    //             console.log("appointment: ", appointment);
    //             appointment.data.push(data);
    //         }
    //     });
    //     // console.log("totalData: ", totalData);
    //     await fs.promises.writeFile(this.path, JSON.stringify(totalData, null, 2));
    // }
}

module.exports = Appointments;
