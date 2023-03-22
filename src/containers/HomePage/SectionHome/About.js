import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import './SectionHome.scss';

function About() {
    return (
        <div className="section-container section-about">
            <div className="about-title">Truyền thông nói về FullStack</div>
            <div className="about-body">
                <div className="about-left">
                    <iframe
                        width="100%"
                        height="400px"
                        src="https://www.youtube.com/embed/1kehqCLudyg?list=RD1kehqCLudyg"
                        title="SHAUN feat. Conor Maynard - Way Back Home (Lyrics) Sam Feldt Edit"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </div>
                <div className="about-right">
                    <p className="about-text">
                        Redux is an open-source JavaScript library which was first introduced in 2015 by Dan Abramov and
                        Andrew Clark in 2015. Redux was inspired by Flux but it omitted the unnecessary complexity: it
                        does not have Dispatcher concept, has a single Store and the Action objects is received and
                        handled directly by Store in the Redux. Redux is used by ReactJS for building the user interface
                        and to manage the application state. The official React binding for Redux is React Redux which
                        is used to read data from a Redux Store, and dispatch Actions to the Store to update data.
                    </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
