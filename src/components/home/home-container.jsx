import React from 'react';
import axios from 'axios';
import Home from './home';
import {connect} from 'react-redux';
import config from "react-global-configuration";
import {bindActionCreators} from "redux";
import {browserHistory} from "react-router";
import AuthoriationService from '../authorization';
import * as activeUserActions from '../../actions/active-user-action';
import moment from "moment";
import * as _ from "lodash";

class HomeContainer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentMeetings: [],
      allMeetings: [],
      meetingsInPast: [],
      togglerPast: false,
      togglerCurrent: true
    };
    this.togglePast = this.togglePast.bind(this);
    this.toggleCurrent = this.toggleCurrent.bind(this);
  }
  
  componentWillMount() {
    this.getPatientMeetings();
  }
  
  redirect() {
    browserHistory.replace('/');
  }
  
  getPatientMeetings() {
    let currentMeetings = [];
    let meetingsInPast = [];
    let userId = localStorage.getItem('id');
    axios.get(config.get('api') + 'meetings' + '?patientId=' + userId)
         .then(res => {
           _.filter(res.data, function (o) {
             if (moment().diff(o.date) < 0) {
               currentMeetings.push(o);
             } else {
               meetingsInPast.push(o);
             }
           });
           this.setState({
             allMeetings: res.data,
             currentMeetings: currentMeetings,
             meetingsInPast: meetingsInPast
           }, () => {
             // console.log(this.state.allMeetings, this.state.currentMeetings, this.state.meetingsInPast);
           });
         });
  }
  
  togglePast() {
    this.setState({
      togglerPast: true,
      togglerCurrent: false
    })
  }
  
  toggleCurrent() {
    this.setState({
      togglerPast: false,
      togglerCurrent: true
    })
  }
  
  render() {
    return (
        <div>
          <AuthoriationService/>
          {(this.props.role === 'guest') && this.redirect()}
          {(this.props.role === 'doctor' || this.props.role === 'patient' || this.props.role === 'admin') &&
          <Home currentMeetings={this.state.currentMeetings}
                meetingsInPast={this.state.meetingsInPast}
                togglePast={this.togglePast}
                toggleCurrent={this.toggleCurrent}
                togglerPast={this.state.togglerPast}
                togglerCurrent={this.state.togglerCurrent}
                role={this.props.role}/>}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);