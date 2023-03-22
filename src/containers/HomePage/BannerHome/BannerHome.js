import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './BannerHome.scss';

function BannerHome() {
    return (
        <div className="banner-home-container">
            <div className="banner-home-content">
                <div className="content-up">
                    <div className="title">
                        <FormattedMessage id="banner.title1" />{' '}
                        <b>
                            <FormattedMessage id="banner.title2" />
                        </b>
                    </div>
                    <div className="search">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Tìm kiếm chuyên khoa" />
                    </div>
                </div>
                <div className="content-down">
                    <div className="options">
                        <div className="option-item">
                            <div className="option-img">
                                <i className="far fa-hospital"></i>
                            </div>
                            <div className="option-text">
                                <span>
                                    <FormattedMessage id="banner.option1" />
                                </span>
                            </div>
                        </div>
                        <div className="option-item">
                            <div className="option-img">
                                <i className="fas fa-mobile-alt"></i>
                            </div>
                            <div className="option-text">
                                <span>
                                    <FormattedMessage id="banner.option2" />
                                </span>
                            </div>
                        </div>
                        <div className="option-item">
                            <div className="option-img">
                                <i className="fas fa-dolly-flatbed"></i>
                            </div>
                            <div className="option-text">
                                <span>
                                    <FormattedMessage id="banner.option3" />
                                </span>
                            </div>
                        </div>
                        <div className="option-item">
                            <div className="option-img">
                                <i className="fas fa-procedures"></i>
                            </div>
                            <div className="option-text">
                                <span>
                                    <FormattedMessage id="banner.option4" />
                                </span>
                            </div>
                        </div>
                        <div className="option-item">
                            <div className="option-img">
                                <i className="fas fa-tty"></i>
                            </div>
                            <div className="option-text">
                                <span>
                                    <FormattedMessage id="banner.option5" />
                                </span>
                            </div>
                        </div>
                        <div className="option-item">
                            <div className="option-img">
                                <i className="fas fa-vial"></i>
                            </div>
                            <div className="option-text">
                                <span>
                                    <FormattedMessage id="banner.option6" />
                                </span>
                            </div>
                        </div>
                        <div className="option-item">
                            <div className="option-img">
                                <i className="far fa-hospital"></i>
                            </div>
                            <div className="option-text">
                                <span>
                                    <FormattedMessage id="banner.option7" />
                                </span>
                            </div>
                        </div>
                        <div className="option-item">
                            <div className="option-img">
                                <i className="fas fa-ambulance"></i>
                            </div>
                            <div className="option-text">
                                <span>
                                    <FormattedMessage id="banner.option8" />
                                </span>
                            </div>
                        </div>
                        <div className="option-item">
                            <div className="option-img">
                                <i className="far fa-hospital"></i>
                            </div>
                            <div className="option-text">
                                <span>
                                    <FormattedMessage id="banner.option9" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BannerHome);
