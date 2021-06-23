const express = require('express');
const router = express.Router();
const {
    getAllPatients,
    getSinglePatient,
    addPatient
} = require('../controllers/patients_controller');

const {
    getAllAppointments,
    getSingleAppointment,
    getAppointmentsByPatientId,
    addAppointment,
    getDonedAppointments,
    removeAppointment,
    setDone
    // addToAppointment
} = require('../controllers/appointments_controller');

router.post('/appointments/add', addAppointment);
// router.post('/appointments/add-to-appointment', addToAppointment);
router.get('/appointments', getAllAppointments);
router.get('/appointments/doned', getDonedAppointments);
router.get('/appointments/appointment/:id', getSingleAppointment);
router.get('/appointments/by-patient/:id', getAppointmentsByPatientId);
router.get('/appointments/remove/:id', removeAppointment);
router.post('/appointments/set-done/:id', setDone);

router.post('/patients/add', addPatient);
router.get('/patients', getAllPatients);
router.get('/patients/patient/:id', getSinglePatient);

module.exports = router;
