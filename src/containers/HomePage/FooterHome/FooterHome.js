import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

function FooterHome() {
    return (
        <div className="footer-home-container">
            <p>
                &#169; ALo 1234 bla bla bla &#8594; <a href="/">More Information</a> &#8592;{' '}
            </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(FooterHome);
