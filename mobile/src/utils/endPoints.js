const server = 'http://192.168.43.70:3000/api'; // if you start app in localhost - type your local machine ip
// export const photo_path='../../.././node_server/data/images/';

export const addPatient = `${server}/patients/add`;
export const editPatient = `${server}/patients/edit`;
export const getPatients = `${server}/patients`;
export const getPatient = `${server}/patients/patient/`;

export const addAppointment = `${server}/appointments/add`;
export const removeAppointment = `${server}/appointments/remove/`;
export const editAppointment = `${server}/appointments/edit`;
export const getAppointments = `${server}/appointments`;
export const setDone = `${server}/appointments/set-done/`;
// export const getDonedAppointments = `${server}/appointments/doned`;
export const getAppointment = `${server}/appointments/appointment/`;
export const getAppointmentsByPatientId = `${server}/appointments/by-patient/`;