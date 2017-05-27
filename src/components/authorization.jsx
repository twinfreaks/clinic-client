import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as activeUserActions from '../actions/active-user-action';
import config from 'react-global-configuration';
import { browserHistory } from "react-router";

class AuthoriationService extends React.Component {
    render() {
        return null;
    }

    getUser(id) {
        var t = this;
        axios.get(config.get('api') + 'users/' + localStorage.getItem('id'))
            .then(res => {
                if (res.data.adminData) {
                    this.props.setRole('admin');
                    this.props.setInfo(res.data);
                } else if (res.data.patientData) {
                    this.props.setRole('patient');
                    this.props.setInfo(res.data);
                } else if (res.data.doctorData) {
                    this.props.setRole('doctor');
                    this.props.setInfo(res.data);
                    browserHistory.replace('/cabinet');
                } else {
                    this.props.setRole('guest');
                    this.props.setInfo(res.data);
                }
            });
    }

    componentWillMount() {
        if (!localStorage.getItem('id')) {
            this.props.setRole('guest');
        } else if (!(this.props.info && this.props.role)) {
            this.getUser(localStorage.getItem('id'));
        }
    }
}


function mapStateToProps(state) {
    return {
        role: state.activeUser.role,
        info: state.activeUser.info
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setInfo: bindActionCreators(activeUserActions.setUserInfo, dispatch),
        setRole: bindActionCreators(activeUserActions.setRole, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthoriationService);

