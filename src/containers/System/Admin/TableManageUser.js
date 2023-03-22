import React, { Component, useEffect, useState } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

function TableManageUser(props) {
    const [listUsers, setListUsers] = useState([]);
    useEffect(() => {
        props.getAllUsersRedux();
    }, []);

    if (listUsers !== props.users) {
        setListUsers(props.users);
    }

    const handleDeleteUser = (user) => {
        props.deleteUserRedux(user.id);
    };

    const handleEditUser = (user) => {
        props.handleEdituserFromParent(user);
    };

    return (
        <React.Fragment>
            <div className="users-container mb-5">
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
                        {listUsers &&
                            listUsers.length > 0 &&
                            listUsers.map((user) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.email}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.address}</td>
                                        <td>
                                            <button className="edit-user" onClick={() => handleEditUser(user)}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button className="delete-user" onClick={() => handleDeleteUser(user)}>
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
            <MdEditor
                style={{ height: '500px' }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
            />
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        users: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUsersRedux: () => dispatch(actions.fetchGetAllUser()),
        deleteUserRedux: (userId) => dispatch(actions.deleteUser(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
