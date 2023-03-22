import axios from '../axios';

const postCreatePatient = (data) => {
    return axios.post(`/api/create-patient`, data);
};

const postVerifyPatientByEmail = (data) => {
    return axios.post(`/api/verify-patient`, data);
};

const createSpecialty = (data) => {
    return axios.post(`/api/create-specialty`, data);
};

const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`);
};

const getDetailSpecialty = (data) => {
    return axios.get(`/api/get-detail-specialty?id=${data.id}&location=${data.location}`);
};
//clinic
const postCreateClinic = (data) => {
    return axios.post(`/api/create-clinic`, data);
};

const getAllClinic = () => {
    return axios.get(`/api/get-all-clinic`);
};

const getDetailClinic = (data) => {
    return axios.get(`/api/get-detail-clinic?id=${data.id}`);
};

export {
    postCreatePatient,
    postVerifyPatientByEmail,
    createSpecialty,
    getAllSpecialty,
    getDetailSpecialty,
    postCreateClinic,
    getAllClinic,
    getDetailClinic,
};
