import React from 'react';
import DoctorInfo from './doctor-info';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as doctorsActions from '../../actions/doctors-action';
import * as _ from 'lodash';
import AddMeetingContainer from '../add-meeting/add-meeting-container';
import { Link, browserHistory } from "react-router";

class DoctorInfoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backdrop: "static",
      info: {},
      name: {},
      doctorType: {},
      currentInfo: {},
      meeting: false,
      availableHours: []
    };
    this.toggleMeeting = this.toggleMeeting.bind(this);
    this.toDoctorList = this.toDoctorList.bind(this);
  };
  
  componentWillMount() {
    this.takeDoctorInfo(this.props.info);
    this.props.setCurrentDoctor(this.props.params.doctorId);
  }
  
  takeDoctorInfo(info) {
    _.filter(info, (o) => {
      if (o._id === this.props.params.doctorId) {
        let currentInfo = o;
        let doctorType = o.doctorData.doctorType;
        let name = o.name;
        let availableHours = o.doctorData.available;
        this.setState({
          availableHours: availableHours,
          currentInfo: currentInfo,
          doctorType: doctorType,
          name: name
        });
        return o;
      }
    });
  }
 
  
  toggleMeeting() {
    this.setState({
      meeting: !this.state.meeting
    });
  }
  
  toDoctorList() {
    browserHistory.replace('/doctors-list');
  }
  
  render() {
    return (
        <div>
          <DoctorInfo info={this.state.currentInfo}
                      name={this.state.name}
                      doctorType={this.state.doctorType}
                      doctorId={this.props.params.doctorId}
                      currentDoctor={this.props.currentDoctor}
                      listEmpty={this.props.listEmpty}
                      toggleMeeting={this.toggleMeeting}
                      meeting={this.state.meeting}
                      toDoctorList={this.toDoctorList}
          />
          { this.state.meeting && <AddMeetingContainer
              toggleMeeting={this.toggleMeeting}
              meeting={this.state.meeting}
              availableHours={this.state.availableHours}
              currentInfo={this.state.currentInfo}
              doctorsName={this.state.name}
          />}
        </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    info: state.doctors.info,
    listEmpty: state.doctors.listEmpty,
    currentDoctor: state.doctors.currentDoctor
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentDoctor: bindActionCreators(doctorsActions.setCurrentDoctor, dispatch),
    setListEmpty: bindActionCreators(doctorsActions.listEmpty, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfoContainer);