import React from 'react';
import HomeContainer from './components/home/home-container';
import Wrapper from './components/wrapper';
import DoctorInfoContainer from './components/doctor-info/doctor-info-container';
import DoctorAddEditContainer from './components/doctor-add-edit/doctor-add-edit-container';
import DoctorsListContainer from './components/doctors-list/doctors-list-container';
import NotFound from './components/not-found';
import CabinetContainer from './components/cabinet/cabinet-container';
import StartPageContainer from './components/startpage/startpage-container';
import {Router, Route, IndexRoute, browserHistory, hashHistory} from "react-router";
import {connect} from 'react-redux';
import LoginContainer from './components/login/login-container';
import RegistrationContainer from './components/registration/registration-container';
import FormValidation from './form-validation';
import Config from './config';

export default class Index extends React.Component {
  
  render() {
    return (
        <Router history={browserHistory}>
          <Route path="login" component={LoginContainer}/>
          <Route path="registration" component={RegistrationContainer}/>
          
          <Route component={Wrapper}>
            <Route path="/" component={StartPageContainer}/>
            <Route path="cabinet" component={CabinetContainer}/>
            <Route path="patient-cabinet" component={HomeContainer}/>
            <Route path="doctor/:doctorId" component={DoctorInfoContainer}/>
            <Route path="doctor-add-edit/:doctorId" component={DoctorAddEditContainer}/>
            <Route path="doctors-list" component={DoctorsListContainer}/>
          </Route>
          
          <Route path="*" component={NotFound}/>
        </Router>
    )
  }
}