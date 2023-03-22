import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import * as actions from '../../store/actions';
import { userService } from '../../services';

import './Login.scss';

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

const mapStateToProps = (state) => {
    return {
        lang: state.app.language,
    };
};

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messageError, setMessageError] = useState('');

    const handleLogin = async () => {
        try {
            setMessageError('');
            const data = await userService(email, password);
            if (data && data.errCode !== 0) {
                setMessageError(data.message);
            }

            if (data && data.errCode === 0) {
                // Call the userLoginSuccess action creator prop passed by connect
                props.userLoginSuccess(data.user);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    setMessageError(error.response.data.message);
                }
            }
        }
    };

    const handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            handleLogin();
        }
    };

    return (
        <div className="login-background">
            <div className="login-container">
                <div className="login-content row">
                    <div className="col-12 login-title">Login</div>
                    <div className="col-12 form-group login-input">
                        <label>Email:</label>
                        <input
                            value={email}
                            className="form-control"
                            type="text"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="col-12 form-group login-input">
                        <label>Password:</label>
                        <input
                            value={password}
                            className="form-control"
                            type="password"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyUp={(e) => handleKeyUp(e)}
                        />
                    </div>
                    <div className="col-12" style={{ color: 'red' }}>
                        {messageError}
                    </div>
                    <div className="col-12 ">
                        <button className="login-btn" onClick={handleLogin}>
                            Log in
                        </button>
                    </div>
                    <div className="col-12">
                        <span className="forgot-password">Forgot your password?</span>
                    </div>
                    <div className="col-12">
                        <span className="text-center d-block mt-4">Or sign in with:</span>
                    </div>
                    <div className="col-12 login-social mt-4">
                        <i className="fa-brands fa-google-plus-g"></i>
                        <i className="fa-brands fa-facebook"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
