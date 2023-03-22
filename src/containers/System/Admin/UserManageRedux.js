import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import CommonUtils from '../../../utils/CommonUtils';
import {
    fetchGenderStart,
    fetchPositionStart,
    fetchRoleStart,
    createNewUser,
    editUser,
} from '../../../store/actions/adminActions';

import './Admin.scss';
import TableManageUser from './TableManageUser';

function UserManageRedux(props) {
    const [genderArr, setGenderArr] = useState([]);
    const [positionArr, setPositionArr] = useState([]);
    const [roleArr, setRoleArr] = useState([]);
    const [urlUploadFile, setUrlUploadFile] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [address, setAddress] = useState('');
    const [genderInput, setGenderInput] = useState('');
    const [positionInput, setPositionInput] = useState('');
    const [roleInput, setRoleInput] = useState('');
    const [avatar, setAvatar] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [userEditID, setUserEditID] = useState();

    const gender = props.gender;
    const position = props.position;
    const role = props.role;

    useEffect(async () => {
        await props.getGenderRedux();
        await props.getPositionRedux();
        await props.getRoleRedux();
    }, []);

    if (genderArr !== gender) {
        setGenderArr(gender);

        gender && gender.length > 0 && setGenderInput(gender[0].keyMap);
    }

    if (positionArr !== position) {
        setPositionArr(position);
        position && position.length > 0 && setPositionInput(position[0].keyMap);
    }

    if (roleArr !== role) {
        setRoleArr(role);
        role && role.length > 0 && setRoleInput(role[0].keyMap);
    }

    const handleUploadFile = async (e) => {
        const [file] = e.target.files;

        if (file) {
            let url = URL.createObjectURL(file);
            let base64 = await CommonUtils.getBase64(file);

            setUrlUploadFile(url);
            setAvatar(base64);
        }
    };

    const handleOpenLightBox = () => {
        if (!urlUploadFile) return;

        setIsOpen(true);
    };

    let data = {
        email,
        password,
        firstName,
        lastName,
        address,
        phonenumber,
        genderInput,
        positionInput,
        roleInput,
        avatar,
    };

    const checkValidate = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phonenumber', 'address'];

        for (let i = 0; i < arrCheck.length; i++) {
            if (!data[arrCheck[i]]) {
                isValid = false;
                alert(`Missing required field ${arrCheck[i]}`);
                break;
            }
        }
        return isValid;
    };

    const handleCreateNewUser = () => {
        let isCheck = checkValidate();
        console.log('check gender', genderInput);
        if (!isCheck) return;
        if (isEdit) {
            //redux call api edit user
            props.editUserRedux({
                id: userEditID,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.genderInput,
                positionId: data.positionInput,
                roleId: data.roleInput,
                image: data.avatar,
            });
        } else {
            //redux call api create new user
            props.createNewUser({
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.genderInput,
                roleId: data.roleInput,
                phonenumber: data.phonenumber,
                image: data.avatar,
                positionId: data.positionInput,
            });
        }

        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setAddress('');
        setPhonenumber('');
        setAvatar('');
        gender && gender.length > 0 && setGenderInput(gender[0].keyMap);
        position && position.length > 0 && setPositionInput(position[0].keyMap);
        role && role.length > 0 && setRoleInput(role[0].keyMap);
        setIsEdit(false);
        setUserEditID();
        setAvatar('');
        setUrlUploadFile('');
    };

    const handleEdituserFromParent = (user) => {
        let buffer = new Buffer(user.image, 'base64').toString('binary');

        setUrlUploadFile(buffer);
        setEmail(user.email);
        setPassword('HARDCODE');
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setAddress(user.lastName);
        setPhonenumber(user.phonenumber);
        setGenderInput(user.gender);
        setPositionInput(user.positionId);
        setRoleInput(user.roleId);
        setIsEdit(true);
        setUserEditID(user.id);
        setAvatar(user.image);
    };

    return (
        <div className="manage-redux-container">
            <div className="title">Manage redux user</div>
            <div className="manage-redux-body">
                <div className="container">
                    <div className="row">
                        <div className="col-12 my-3">
                            <FormattedMessage id="manage-user.add" />
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.email" />
                            </label>
                            <input
                                disabled={isEdit}
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.password" />
                            </label>
                            <input
                                disabled={isEdit}
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.first-name" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.last-name" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.phone-number" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={phonenumber}
                                onChange={(e) => setPhonenumber(e.target.value)}
                            />
                        </div>
                        <div className="col-9">
                            <label>
                                <FormattedMessage id="manage-user.address" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.gender" />
                            </label>
                            <select
                                className="form-control"
                                value={genderInput}
                                onChange={(e) => setGenderInput(e.target.value)}
                            >
                                {genderArr &&
                                    genderArr.length > 0 &&
                                    genderArr.map((item) => (
                                        <option key={item.id} value={item.keyMap}>
                                            {props.language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.position" />
                            </label>
                            <select
                                className="form-control"
                                value={positionInput}
                                onChange={(e) => setPositionInput(e.target.value)}
                            >
                                {positionArr &&
                                    positionArr.length > 0 &&
                                    positionArr.map((item) => (
                                        <option key={item.id} value={item.keyMap}>
                                            {props.language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.role" />
                            </label>
                            <select
                                className="form-control"
                                value={roleInput}
                                onChange={(e) => setRoleInput(e.target.value)}
                            >
                                {roleArr &&
                                    roleArr.length > 0 &&
                                    roleArr.map((item) => (
                                        <option key={item.id} value={item.keyMap}>
                                            {props.language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="col-3">
                            <label>
                                <FormattedMessage id="manage-user.image" />
                            </label>
                            <div className="file-upload-container">
                                <label className="file-upload-btn" htmlFor="preview-img">
                                    <FormattedMessage id="manage-user.upload-img" />
                                    <i className="fas fa-upload"></i>
                                </label>
                                <input id="preview-img" type="file" hidden onChange={(e) => handleUploadFile(e)} />
                                <div
                                    className="file-upload-img"
                                    style={{ backgroundImage: `url(${urlUploadFile})` }}
                                    onClick={handleOpenLightBox}
                                ></div>
                            </div>
                        </div>
                        <div className="col-12 my-3">
                            <div
                                className={isEdit ? 'btn btn-warning px-3' : 'btn btn-primary px-3'}
                                onClick={handleCreateNewUser}
                            >
                                {!isEdit ? (
                                    <FormattedMessage id="manage-user.save" />
                                ) : (
                                    <FormattedMessage id="manage-user.edit" />
                                )}
                            </div>
                        </div>
                        <div className="col-12">
                            <TableManageUser handleEdituserFromParent={handleEdituserFromParent} />
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && <Lightbox mainSrc={urlUploadFile} onCloseRequest={() => setIsOpen(false)} />}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        gender: state.admin.gender,
        position: state.admin.position,
        role: state.admin.role,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderRedux: () => dispatch(fetchGenderStart()),
        getPositionRedux: () => dispatch(fetchPositionStart()),
        getRoleRedux: () => dispatch(fetchRoleStart()),
        createNewUser: (data) => dispatch(createNewUser(data)),
        editUserRedux: (data) => dispatch(editUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManageRedux);
