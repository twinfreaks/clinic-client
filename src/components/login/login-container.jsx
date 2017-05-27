import React from 'react';
import { Link, browserHistory } from "react-router";
import axios from 'axios';
import Login from './login';
import config from 'react-global-configuration';
import { bindActionCreators } from "redux";
import * as activeUserActions from '../../actions/active-user-action';
import {connect} from 'react-redux';

class LoginContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      usernameValid: false,
      passwordValid: false,
      loginError: false,
      loginErrorMessage: ''
    };
    this.checkUsername = this.checkUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem('username') !== null && localStorage.getItem('id') !== null) {
      browserHistory.push('/');
    }
  }

  checkUsername(e) {
    if (e.target.value.trim().length > 0) {
      this.setState({ usernameValid: true });
    } else {
      this.setState({ usernameValid: false });
    }
  }

  checkPassword(e) {
    if (e.target.value.trim().length > 0) {
      this.setState({ passwordValid: true });
    } else {
      this.setState({ passwordValid: false });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    var t = this;
    axios.post(config.get('api') + 'login', {
      username: e.target.username.value,
      password: e.target.password.value
    })
      .then((response) => {
        if (typeof response.data.error == 'undefined') {
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("id", response.data._id);
          if (response.data.adminData) {
            this.props.setRole('admin');
            this.props.setInfo(response.data);
          } else if (response.data.patientData) {
            this.props.setRole('patient');
            this.props.setInfo(response.data);
          } else if (response.data.doctorData) {
            this.props.setRole('doctor');
            this.props.setInfo(response.data);
          } else {
            this.props.setRole('guest');
            this.props.setInfo(response.data);
          }
          if(response.data.doctorData !== null){
            browserHistory.replace('/cabinet');
          } else {
            browserHistory.replace('/');
          }
          
        } else {
          t.setState({ loginError: true, loginErrorMessage: response.data.error });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Login handleSubmit={this.handleSubmit}
        checkPassword={this.checkPassword}
        checkUsername={this.checkUsername}
        usernameValid={this.state.usernameValid}
        passwordValid={this.state.passwordValid}
        loginError={this.state.loginError}
        loginErrorMessage={this.state.loginErrorMessage}>
      </Login>
    );
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

export default connect(mapStateToProps, mapDispatchToProps) (LoginContainer);