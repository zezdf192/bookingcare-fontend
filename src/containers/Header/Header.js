import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';

import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils/constant';

function Header(props) {
    const { processLogout, changeLanguageRedux, language, user } = props;
    const [menuApp, setMenuApp] = useState([]);

    const handleChangeLanguage = (language) => {
        changeLanguageRedux(language);
    };

    useEffect(() => {
        let menu = [];
        if (user && user.roleId) {
            if (user.roleId === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }

            if (user.roleId === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
        }
        setMenuApp(menu);
    }, []);

    return (
        <div className="header-container">
            {/* thanh navigator */}
            <div className="header-tabs-container">
                <Navigator menus={menuApp && menuApp} />
            </div>

            {/* nút logout */}
            <div className="header-body">
                <div className="welcome">
                    <FormattedMessage id="homeHeader.welcome" />
                    {user && user.firstName ? user.firstName : ''}
                </div>
                <div className="language">
                    <span
                        onClick={() => handleChangeLanguage(LANGUAGES.VI)}
                        className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}
                    >
                        VN
                    </span>
                    <span
                        onClick={() => handleChangeLanguage(LANGUAGES.EN)}
                        className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}
                    >
                        EN
                    </span>
                </div>

                <div className="btn btn-logout" onClick={processLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageRedux: (language) => dispatch(actions.changeLanguage(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
