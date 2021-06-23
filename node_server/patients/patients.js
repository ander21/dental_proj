const fs = require('fs');
const ObjectID = require('mongodb').ObjectID;

class Patients
{
    constructor(filename = "patients.json")
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

    createId ()
    {
        return new ObjectID();
    };

    async add(data, id)
    {
        if(!data)
            throw("Error");

        const totalData = JSON.parse(await fs.promises.readFile(this.path));
        const file = data.file;

        const objToWrite = {
            _id: id,
            fullname: data.fullname,
            phone: data.phone,
            picture:  file.fileUri,
        }
        // console.log(file);
        // if( file.fileBase64)
        // {
        //     let base64URL = file.fileBase64;
        //     let path = `./data/images/${file.fileName}`;
        //     fs.writeFile(path, base64URL, 'base64', (err) => console.log(err));
        //     objToWrite.picture = path;
        // }


        totalData.push(objToWrite);

        await fs.promises.writeFile(this.path, JSON.stringify(totalData, null, 2));
    }

    async getAll()
    {
        const data = JSON.parse(await fs.promises.readFile(this.path));
        return data;
    }

    async getSingle(id)
    {
        const data = await JSON.parse(await fs.promises.readFile(this.path));
        return data.find(patient => patient._id === id);
    }
}

module.exports = Patients;
