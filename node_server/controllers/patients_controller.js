const Patients = require('../patients/patients');

const patients = new Patients();

const addPatient = (req, res) => {
    const id = patients.createId();
    try {
        patients.add(req.body, id).then(result => {
            res.json({ success: true, message: 'Patient added successfully.' });
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
        console.log('Error while adding patient', error.message);
    }
};

const getAllPatients = async (req, res) => {
    console.log("patients_controller");
    try
    {
        const data = await patients.getAll();
        res.json({ success: true, patients: data });
    }
    catch (error)
    {
        res.json({
            success: false,
            message: 'Something went wrong, server error!',
        });
        console.log('Error while getting all patients', error.message);
    }
};

const getSinglePatient = async (req, res) => {
    try
    {
        const data = await patients.getSingle(req.params.id);
        if (!data)
        {
            return res.json({
            success: false,
            message: 'Patient not found!',
            });
        }

        res.json({
            success: true,
            patient: data,
        });
    }
    catch (error)
    {
        res.json({
            success: false,
            message: 'Something went wrong, server error!',
        });
        console.log('Error while getting patient', error.message);
    }
};

module.exports = {
    addPatient,
    getAllPatients,
    getSinglePatient
};