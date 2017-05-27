import React from 'react';
import axios from 'axios';
import moment from 'moment';
import DoctorAddEdit from './doctor-add-edit';
import config from 'react-global-configuration';
import { Link, browserHistory } from "react-router";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as doctorsActions from '../../actions/doctors-action';
import * as _ from "lodash";

class DoctorAddEditContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: false,
      modal: false,
      backdrop: "static",
      info: {
        dateOfBirth: moment(),
        password: "",
        username: ""
      },
      name: {
        first: '',
        last: '',
        patronymic: ''
      },
      doctorType: [{
        name: '',
        description: ''
      }],
      bio: ""
    };
    this.toggle = this.toggle.bind(this);
    this.saveDoctor = this.saveDoctor.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.toggleNewPassword = this.toggleNewPassword.bind(this);
    this.newDoctorType = this.newDoctorType.bind(this);
    this.removeDoctorType = this.removeDoctorType.bind(this);
    this.setDoctorType = this.setDoctorType.bind(this);
    this.deleteDoctor = this.deleteDoctor.bind(this);
    this.toDoctorList = this.toDoctorList.bind(this);
  };

  componentWillMount() {
    if (this.props.routeParams.doctorId !== 'add') {
      this.takeDoctorInfo(this.props.info);
      this.props.setCurrentDoctor(this.props.params.doctorId);
    }
    /*
    if (this.props.routeParams.doctorId !== 'add') {
      let t = this;
      axios.get(config.get('api') + 'users/' + this.props.routeParams.doctorId)
        .then(res => {
          let info = res.data;
          info.dateOfBirth = moment(res.data.dateOfBirth);
          let name = res.data.name;
          let doctorType = res.data.doctorData.doctorType;
          let bio = res.data.doctorData.bio;
          this.setState({ info, name, doctorType, bio });
        });
    }
  */
  }
  
  takeDoctorInfo(info) {
    _.filter(info, (o) => {
      if (o._id === this.props.params.doctorId) {
        let info = o;
        info.dateOfBirth = moment(o.dateOfBirth);
        let name = o.name;
        let doctorType = [];
        o.doctorData.doctorType.map((type) => {
          doctorType.push(Object.assign({}, type));
        });
        let bio = o.doctorData.bio;
        this.setState({ info, name, doctorType, bio });
      }
    });
  }

  

  toDoctorList() {
    browserHistory.replace('/doctors-list');
  }

  deleteDoctor() {
    axios.put(config.get('api') + 'doctors/' + this.state.info._id, { delete: true })
      .then(res => {
        let info = this.props.info,
          t = this;
        info = _.filter(info, (doctor) => { return doctor._id != t.state.info._id; });
        this.props.setInfo(info);
        this.toggle();
        browserHistory.replace('/doctors-list');
      });
  }

  saveDoctor(e) {
    e.preventDefault();
    if (this.state.info._id) {
      let data = {};
      data.username = e.target.username.value;
      if (typeof e.target.password != 'undefined') {
        data.password = e.target.password.value;
      }
      data.firstName = e.target.firstName.value;
      data.lastName = e.target.lastName.value;
      data.patronymic = e.target.patronymic.value;
      data.bio = e.target.biography.value;
      data.dateOfBirth = this.state.info.dateOfBirth;
      data.doctorType = [];
      [0, 1, 2, 3, 4, 5].forEach((i) => {
        if (typeof e.target['typeName' + i] != 'undefined') {
          data.doctorType.push({
            name: e.target['typeName' + i]['value'],
            description: e.target['typeDesc' + i]['value']
          });
        }
      });
      axios.put(config.get('api') + 'doctors/' + this.state.info._id, data)
        .then(res => {
          let info = this.props.info,
            t = this;
          _.forEach(info, (doctor, index) => { 
            if(doctor._id === t.state.info._id){
              info[index] = res.data;
            }
          });
          this.props.setInfo(info);
          browserHistory.replace('/doctors-list');
        });
    } else {
      let data = {};
      data.username = e.target.username.value;
      data.password = e.target.password.value;
      data.firstName = e.target.firstName.value;
      data.lastName = e.target.lastName.value;
      data.patronymic = e.target.patronymic.value;
      data.bio = e.target.biography.value;
      data.dateOfBirth = this.state.info.dateOfBirth;
      data.doctorType = [];
      [0, 1, 2, 3, 4, 5].forEach((i) => {
        if (typeof e.target['typeName' + i] != 'undefined') {
          data.doctorType.push({
            name: e.target['typeName' + i]['value'],
            description: e.target['typeDesc' + i]['value']
          });
        }
      });
      axios.post(config.get('api') + 'users?doctor=true', data)
        .then(res => {
          let info = this.props.info.concat(res.data);
          this.props.setInfo(info);
          browserHistory.replace('/doctors-list');
        });
    }
  }

  handleDateChange(date) {
    let info = this.state.info;
    info.dateOfBirth = moment(date);
    this.setState({ info });
  }

  toggleNewPassword() {
    this.setState({
      newPassword: !this.state.newPassword
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  setDoctorType(value, index, key) {
    this.state.doctorType[index][key] = value;
    this.setState({ doctorType: this.state.doctorType });
  }

  removeDoctorType(index) {
    let removed = this.state.doctorType.splice(index, 1);
    this.setState({ doctorType: this.state.doctorType });
  }

  newDoctorType() {
    this.setState({
      doctorType: this.state.doctorType.concat({
        name: '',
        description: ''
      })
    });
  }

  render() {
    return (
      <DoctorAddEdit modal={this.state.modal}
        newPassword={this.state.newPassword}
        handleDateChange={this.handleDateChange}
        toggleNewPassword={this.toggleNewPassword}
        deleteDoctor={this.deleteDoctor}
        setDoctorType={this.setDoctorType}
        newDoctorType={this.newDoctorType}
        removeDoctorType={this.removeDoctorType}
        toDoctorList={this.toDoctorList}
        saveDoctor={this.saveDoctor}
        backdrop={this.state.backdrop}
        info={this.state.info}
        name={this.state.name}
        bio={this.state.bio}
        doctorType={this.state.doctorType}
        toggle={this.toggle}
        doctorId={this.props.params.doctorId} />
    )
  }
}

function mapStateToProps(state) {
  return {
    listEmpty: state.doctors.listEmpty,
    info: state.doctors.info,
    currentDoctor: state.doctors.currentDoctor
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentDoctor: bindActionCreators(doctorsActions.setCurrentDoctor, dispatch),
    setInfo: bindActionCreators(doctorsActions.setInfo, dispatch),
    setListEmpty: bindActionCreators(doctorsActions.listEmpty, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorAddEditContainer);