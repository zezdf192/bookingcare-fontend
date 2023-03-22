import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';

function ModalUser({
    edit = false,
    className,
    isOpen,
    handleOpenModal,
    handleOpenEditModal,
    saveDataEditUser,
    handleCreateNewUser,
    editUser = {},
}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');

    const toggle = () => {
        handleOpenModal && handleOpenModal();
        handleOpenEditModal && handleOpenEditModal();
    };

    let data = {
        email,
        password,
        firstName,
        lastName,
        address,
    };

    useEffect(() => {
        if (editUser && !_.isEmpty(editUser)) {
            setEmail(editUser.email);
            setPassword('hard-code');
            setFirstName(editUser.firstName);
            setLastName(editUser.lastName);
            setAddress(editUser.address);
        }
    }, [editUser]);

    const handleCreateUser = async () => {
        await handleCreateNewUser(data);
        if (email && password && firstName && lastName && address) {
            setAddress('');
            setEmail('');
            setFirstName('');
            setLastName('');
            setPassword('');
        }
    };

    const handleEditUser = async () => {
        let copyData = data;
        copyData = {
            id: editUser.id,
            ...copyData,
        };
        await saveDataEditUser(copyData);
    };

    return (
        <div>
            <Modal size="lg" isOpen={isOpen} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Create new user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-container row">
                        <div className="input-container col-6">
                            <label>Email:</label>
                            <input disabled={edit} value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-container col-6 ">
                            <label>Password:</label>
                            <input
                                disabled={edit}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="input-container col-6 mt-3">
                            <label>First Name:</label>
                            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="input-container col-6 mt-3">
                            <label>Last Name:</label>
                            <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className="input-container col-12 mt-3">
                            <label>Address:</label>
                            <input value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary px-3"
                        onClick={() => {
                            edit ? handleEditUser() : handleCreateUser();
                        }}
                    >
                        Add user
                    </Button>{' '}
                    <Button color="secondary px-3" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalUser;
