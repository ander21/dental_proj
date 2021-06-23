const Appointments = require('../appointments/appointments');

const appointments = new Appointments();

const addAppointment = (req, res) => {
    // console.log("appointments add");
    const id = appointments.createId();
    try {
        console.log("body: " + req.body);
        appointments.add(req.body, id).then(result => {
            res.json({ success: true, message: 'Appointment added successfully.' });
        })
        .catch(err => {
            res.json({ success: false, message: err });
        });
    }
    catch (error)
    {
        res.json({
            success: false,
            message: 'Something went wrong, server error!',
        });
        console.log('Error while adding appointment', error.message);
    }
};

const getDonedAppointments = async (req, res) => {
    try
    {
        const data = await appointments.getDoned();
        res.json({ success: true, appointments: data });
    }
    catch (error)
    {
        res.json({
            success: false,
            message: 'Something went wrong, server error!',
        });
        console.log('Error while getting all appointments', error.message);
    }
};



// const addToAppointment = async (req, res) => {
//     try {
//         appointments.addToAppointment(req.body.data, req.body.id).then(result => {
//             res.json({ success: true, message: 'Appointment added successfully.' });
//         })
//         .catch(err => {
//             res.json({ success: false, message: err });
//         });
//     }
//     catch (error)
//     {
//         res.json({
//             success: false,
//             message: 'Something went wrong, server error!',
//         });
//         console.log('Error while adding appointment', error.message);
//     }
// }

const getAllAppointments = async (req, res) => {
    console.log("appointments controller");
    try
    {
        const data = await appointments.getAll();
        res.json({ success: true, appointments: data });
    }
    catch (error)
    {
        res.json({
            success: false,
            message: 'Something went wrong, server error!',
        });
        console.log('Error while getting all appointments', error.message);
    }
};

const getAppointmentsByPatientId = async (req, res) => {
    try
    {
        const data = await appointments.getByPatientId(req.params.id);
        if (!data)
        {
            return res.json({
            success: false,
            message: 'Appointments not found!',
            });
        }
        res.json({
            success: true,
            appointments: data,
        });
    }
    catch (error)
    {
        res.json({
            success: false,
            message: 'Something went wrong, server error!',
        });
        console.log('Error while getting appointments by patient id', error.message);
    }
}

const removeAppointment = async (req, res) => {
    try
    {
        console.log(req.params.id);
        const data = await appointments.remove(req.params.id);
        if (!data)
        {
            return res.json({
            success: false,
            message: 'Appointment not found!',
            });
        }
        res.json({
            success: true,
            message: "Appointment succesfully removed!"
        });
    }
    catch (error)
    {
        res.json({
            success: false,
            message: 'Something went wrong, server error!',
        });
        console.log('Error while removing appointment', error.message);
    }
}

const setDone = async (req, res) => {
    try
    {
        console.log(req.params.id);
        const data = await appointments.setDone(req.params.id, req.body);
        if (!data)
        {
            return res.json({
            success: false,
            message: 'Appointment not found!',
            });
        }
        res.json({
            success: true,
            message: "Appointment succesfully updated!"
        });
    }
    catch (error)
    {
        res.json({
            success: false,
            message: 'Something went wrong, server error!',
        });
        console.log('Error while updating appointment', error.message);
    }
}

const getSingleAppointment = async (req, res) => {
    try
    {
        const data = await appointments.getSingle(req.params.id);
        if (!data)
        {
            return res.json({
            success: false,
            message: 'Appointment not found!',
            });
        }

        res.json({
            success: true,
            appointment: data,
        });
    }
    catch (error)
    {
        res.json({
            success: false,
            message: 'Something went wrong, server error!',
        });
        console.log('Error while getting appointment', error.message);
    }
};

module.exports = {
    addAppointment,
    getAllAppointments,
    getSingleAppointment,
    getAppointmentsByPatientId,
    getDonedAppointments,
    removeAppointment,
    setDone
    // addToAppointment
};