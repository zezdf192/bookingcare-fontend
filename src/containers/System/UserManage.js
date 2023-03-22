import React, { Component, useEffect, useState } from 'react';
//import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';

function UserManage() {
    const [arrUsers, setArrUsers] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [callAPI, setCallAPI] = useState(true);
    const [data, setData] = useState({});

    const arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];

    useEffect(async () => {
        const dataUsers = await getAllUsers('ALL');
        if (dataUsers && dataUsers.errCode === 0) {
            setArrUsers(dataUsers.users);
        }
    }, [callAPI]);

    const handleOpenModal = () => {
        setOpenModal(!openModal);
    };

    const handleOpenEditModal = () => {
        setOpenEditModal(!openEditModal);
    };

    const checkValidate = (data) => {
        for (let input of arrInput) {
            if (!data[input]) {
                alert('Missing required ' + input);
                return false;
            }
        }
        return true;
    };

    const handleCreateNewUser = async (data) => {
        let isCheck = checkValidate(data);
        if (isCheck) {
            let respon = await createNewUserService(data);

            if (respon) {
                if (respon.errCode !== 0) {
                    alert(respon.message);
                } else {
                    setCallAPI(!callAPI);
                    setOpenModal(false);
                }
            }
        }
    };

    const handleDeleteUser = async (user) => {
        try {
            const respon = await deleteUserService(user.id);
            if (respon) {
                if (respon.errCode !== 0) {
                    alert(respon.message);
                } else {
                    setCallAPI(!callAPI);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditUser = (user) => {
        setOpenEditModal(true);
        setData(user);
    };

    const saveDataEditUser = async (data) => {
        let isCheck = checkValidate(data);
        if (isCheck) {
            try {
                let res = await editUserService(data);
                if (res && res.errCode === 0) {
                    setCallAPI(!callAPI);
                    setOpenEditModal(false);
                } else {
                    alert(res.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="users-container">
            <h1 className="users-title text-center mt-3">Tabel users list</h1>
            <div className="users-list mt-3 mx-4">
                <button className="btn btn-primary px-3 mb-3" onClick={() => setOpenModal(true)}>
                    Add new user
                </button>
                <ModalUser
                    isOpen={openModal}
                    handleOpenModal={handleOpenModal}
                    handleCreateNewUser={handleCreateNewUser}
                />
                {openEditModal && (
                    <ModalUser
                        edit
                        isOpen={openEditModal}
                        editUser={data}
                        handleOpenEditModal={handleOpenEditModal}
                        saveDataEditUser={saveDataEditUser}
                    />
                )}
                <table id="customers">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrUsers.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.email}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.address}</td>
                                    <td>
                                        <button onClick={() => handleEditUser(user)} className="edit-user">
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button onClick={() => handleDeleteUser(user)} className="delete-user">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
