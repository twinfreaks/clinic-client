import React from 'react';
import {browserHistory} from "react-router";
import axios from 'axios';
import StartPage from './startpage';
import {connect} from 'react-redux';
import config from "react-global-configuration";
import {bindActionCreators} from "redux";
import AuthoriationService from '../authorization';
import * as activeUserActions from '../../actions/active-user-action';
import moment from "moment";
import * as _ from "lodash";

class StartPageContainer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modal2: false
    };
    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
  }
  
  componentWillMount() {
  }
  
  redirectToLogin() {
    browserHistory.push('/login');
  }
  
  redirectToRegistration() {
    browserHistory.push('/registration');
  }
  
  redirectToCabinet() {
    browserHistory.push('/patient-cabinet');
  }
  
  redirectToContuctUs() {
    browserHistory.push('/contact-us');
  }
  
  redirectToDoctorsList() {
    browserHistory.push('/doctors-list');
  }
  
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  
  toggle2() {
    this.setState({
      modal2: !this.state.modal2
    });
  }
  
  render() {
    return (
        <div>
          <AuthoriationService/>
          <StartPage
              redirectToLogin={this.redirectToLogin}
              redirectToRegistration={this.redirectToRegistration}
              redirectToCabinet={this.redirectToCabinet}
              redirectToContuctUs={this.redirectToContuctUs}
              redirectToDoctorsList={this.redirectToDoctorsList}
              role={this.props.role}
              info={this.props.info}
              toggle={this.toggle}
              modal={this.state.modal}
              toggle2={this.toggle2}
              modal2={this.state.modal2}
          />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(StartPageContainer);