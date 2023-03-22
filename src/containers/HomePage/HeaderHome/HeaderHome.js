import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './HeaderHome.scss';
import { LANGUAGES } from '../../../utils/constant';
import { changeLanguage } from '../../../store/actions/appActions';
import { useHistory } from 'react-router-dom';

function HeaderHome(props) {
    const handleChangeLanguage = (language) => {
        props.changeLanguageRedux(language);
    };

    const history = useHistory();

    const backToHomePage = () => {
        history.push(`/home`);
    };

    return (
        <div className="header-home-container">
            <div className="header-home-content">
                <div className="left-content">
                    <i className="fas fa-bars"></i>
                    <div className="logo-header" onClick={backToHomePage}></div>
                </div>
                <div className="center-content">
                    <div className="child-content">
                        <div>
                            <b>
                                <FormattedMessage id="homeHeader.specialist" />
                            </b>
                        </div>
                        <span>
                            <FormattedMessage id="homeHeader.searchDoctor" />
                        </span>
                    </div>
                    <div className="child-content">
                        <div>
                            <b>
                                <FormattedMessage id="homeHeader.healthFacility" />
                            </b>
                        </div>
                        <span>
                            <FormattedMessage id="homeHeader.selectClinic" />
                        </span>
                    </div>
                    <div className="child-content">
                        <div>
                            <b>
                                <FormattedMessage id="homeHeader.doctor" />
                            </b>
                        </div>
                        <span>
                            <FormattedMessage id="homeHeader.selectDoctor" />
                        </span>
                    </div>
                    <div className="child-content">
                        <div>
                            <b>
                                <FormattedMessage id="homeHeader.fee" />
                            </b>
                        </div>
                        <span>
                            <FormattedMessage id="homeHeader.generalHealth" />
                        </span>
                    </div>
                </div>
                <div className="right-content">
                    <div className="support-header">
                        <i className="fas fa-question-circle"></i>
                        <span>Hỗ trợ</span>
                    </div>
                    <div className={props.language === 'vi' ? 'language-vn active' : 'language-vn'}>
                        <span onClick={() => handleChangeLanguage(LANGUAGES.VI)}>VN</span>
                    </div>
                    <div className={props.language === 'en' ? 'language-en active' : 'language-en'}>
                        <span onClick={() => handleChangeLanguage(LANGUAGES.EN)}>EN</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageRedux: (language) => dispatch(changeLanguage(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderHome);
