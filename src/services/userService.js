import axios from '../axios';

const userService = (email, password) => {
    return axios.post(`/api/v1/login`, { email, password });
};

const getAllUsers = (id) => {
    return axios.get(`/api/v1/get-all-users?id=${id}`);
};

const createNewUserService = (data) => {
    return axios.post('/api/v1/create-new-user', data);
};

const deleteUserService = (id) => {
    return axios.delete('/api/v1/delete-user', {
        data: {
            id: id,
        },
    });
};

const editUserService = (data) => {
    return axios.put('/api/v1/edit-user', data);
};

const getAllCodeService = (type) => {
    return axios.get(`/api/get-allcode?type=${type}`);
};

export { userService, getAllUsers, createNewUserService, deleteUserService, editUserService, getAllCodeService };
