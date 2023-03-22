import axios from '../axios';

const getTopDoctorService = (limit) => {
    return axios.get(`/api/get-top-doctors?limit=${limit}`);
};

const getAllDoctorService = () => {
    return axios.get(`/api/get-all-doctors`);
};

const saveInfoDoctorService = (data) => {
    return axios.post(`/api/post-detail-doctors`, data);
};

const getDetailInfoDoctorService = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

const getMarkdownService = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

const editMarkdownService = (data) => {
    return axios.put(`/api/put/markdown-doctor`, data);
};

const createBulkScheduleDoctor = (data) => {
    return axios.post(`/api/create-bulk-schedule`, data);
};

const getScheduleByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`);
};

const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

const getAllPatientForDoctor = (doctorId, date) => {
    return axios.get(`/api/get-list-patient?doctorId=${doctorId}&date=${date}`);
};

const postSendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data);
};

export {
    getTopDoctorService,
    getAllDoctorService,
    saveInfoDoctorService,
    getDetailInfoDoctorService,
    getMarkdownService,
    editMarkdownService,
    createBulkScheduleDoctor,
    getScheduleByDate,
    getExtraInforDoctorById,
    getAllPatientForDoctor,
    postSendRemedy,
};
