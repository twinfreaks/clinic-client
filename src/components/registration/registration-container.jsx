import React from 'react';
import { Link, browserHistory } from "react-router";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
import Registration from './registration';
import config from 'react-global-configuration';

class RegistrationContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      dateOB: moment(),
      success: false,
      error: false,
      errorMessage: '',
      username: ''
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cleanError = this.cleanError.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem('username') !== null && localStorage.getItem('id') !== null) {
      browserHistory.push('/home');
    }
  }

  handleDateChange(date) {
    this.setState({
      dateOB: date
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var t = this;
    axios.post(config.get('api') + 'registration', {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      patronymic: e.target.patronymic.value,
      dateOfBirth: this.state.dateOB,
      street: e.target.street.value,
      building: e.target.building.value,
      appartment: e.target.appartment.value,
      email: e.target.email.value,
      phoneNumber: e.target.phone.value,
      username: e.target.username.value,
      password: e.target.password.value
    })
      .then(function (response) {
        if (typeof response.data.error == 'undefined') {
          t.setState({ success: true, error: false, username: response.data.username });
        } else {
          t.setState({ error: true, errorMessage: response.data.error });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  cleanError() {
    this.setState({ error: false });
  }

  render() {
    return (
      <Registration handleSubmit={this.handleSubmit}
        cleanError={this.cleanError}
        handleDateChange={this.handleDateChange}
        dateOB={this.state.dateOB}
        success={this.state.success}
        error={this.state.error}
        errorMessage={this.state.errorMessage}
        username={this.state.username}>
      </Registration>
    );
  }
}

export default RegistrationContainer;