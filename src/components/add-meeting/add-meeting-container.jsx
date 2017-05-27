import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as doctorsActions from "../../actions/doctors-action";
import AddMeeting from "./add-meeting";
import moment from "moment";
import config from "react-global-configuration";
import axios from "axios";
import * as _ from "lodash";
import "../../../node_modules/moment/locale/ru.js";
import "../../../node_modules/moment/locale/uk.js";

class AddMeetingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: 'static',
      choosenDate: null,
      allMeetings: [],
      availableHours: null,
      specialDays: null,
      openDates: [],
      daysShift: 29,
      currentSlots: [],
      busySlots: [],
      slotTimes: config.get('slotTimes'),
      date: null,
      newMeeting: {},
      newEvent: {},
      doctorsName: this.props.doctorsName,
      meetingSlot: null,
      myCurrentMeeting: [],
      isAlreadyAppointed: false
    };
    this.dpChange = this.dpChange.bind(this);
    this.addMeeting = this.addMeeting.bind(this);
    this.postMeeting = this.postMeeting.bind(this);
    this.toggle = this.toggle.bind(this);
    this.getAllMeetings = this.getAllMeetings.bind(this);
    this.appointedAlready = this.appointedAlready.bind(this);
  }
  
  componentWillMount() {
    this.getAllMeetings();
    // moment.locale('uk');
  }
  
  componentDidMount() {
    // take doctor schedule list
    let schedule;
    if (this.props.currentInfo.doctorData.specialDays) {
      schedule = _.concat(this.props.currentInfo.doctorData.available, this.props.currentInfo.doctorData.specialDays);
    } else if (this.props.currentInfo.doctorData.available) {
      schedule = this.props.currentInfo.doctorData.available;
    } else {
      schedule = [];
    }
    this.setState({
      availableHours: schedule,
      specialDays: this.props.currentInfo.doctorData.specialDays
    }, function () {
      // check if exists schedule or spec days
      if (schedule[0] || schedule[1]) {
        this.findAvailableDates();
      }
    });
  }
  
  componentWillUnmount() {
    this.props.setAllMeetingsStore([]);
    this.props.setCurrentDoctor(this.props.currentDoctor);
  }
  
  // if datapicker changed
  renderChoosenDay(day) {
    this.setState({
      currentSlots: [],
      busySlots: [],
      date: day
    }, () => {
      _.filter(this.state.availableHours, (o) => {
        if (!o) {
          o = {};
        }
        if (o.day === day.weekday() || (moment(o.date).format('DD-MM-YYYY')) === (moment(day).format('DD-MM-YYYY'))) {
          let newBusySlot = [];
          _.filter(this.state.allMeetings, (meeting) => {
            if ((moment(meeting.date).format('DD-MM-YYYY')) === (moment(day).format('DD-MM-YYYY'))) {
              newBusySlot.push(meeting.slot);
            }
          });
          this.setState({
            currentSlots: o.slot,
            busySlots: newBusySlot
          });
        }
      });
    });
  }
  
  // this happens when slot was clicked but dousn't yet confirmed
  addMeeting(slotNumber) {
    let newMeeting = {};
    let patient = this.props.userId;
    let patientId = this.props.userId;
    let doctor = this.props.currentInfo._id;
    let doctorId = this.props.currentInfo._id;
    let date = moment(this.state.date).format();
    let slot = slotNumber;
    this.toggle();
    newMeeting = {patient, patientId, doctor, doctorId, date, slot};
    this.setState({
      newMeeting: newMeeting,
    });
  }
  
  // this happens when choosen slot was confirmed
  postMeeting() {
    let newBusySlot = this.state.busySlots;
    let allMeetings = this.state.allMeetings;
    axios.post(config.get('api') + 'meetings/', this.state.newMeeting).then(res => {
      newBusySlot.push(this.state.newMeeting.slot);
      allMeetings.push(this.state.newMeeting);
      this.setState({
            allMeetings: allMeetings,
            busySlots: newBusySlot
          });
    })
  }
  
  // get all meetings of current doctor and all meetings with current doctor and current user
  getAllMeetings() {
    let myMeetings;
    let userId = this.props.userId;
    axios.get(config.get('api') + 'meetings' + '?doctorId=' + this.props.currentDoctor)
         .then(res => {
           if (userId !== null) {
             myMeetings = _.filter(res.data, function (o) {
               if (o.patientId === userId._id) {
                 return o;
               }
             });
             this.setState({
               myMeetings: myMeetings,
               allMeetings: res.data
             });
           } else {
             this.setState({
               myMeetings: [],
               allMeetings: res.data
             });
           }
         });
  }
  
  // get meetings that user already appointed to this doctor
  appointedAlready() {
    let myCurrentMeeting = [];
    let flag = false;
    let myCurrentMeetingDate = null;
    _.filter(this.state.myMeetings, (o) => {
      if (moment().diff(o.date) < 0) {
        myCurrentMeeting.push(o);
        flag = true;
        return flag;
      }
    });
    if (myCurrentMeeting.length) {
      myCurrentMeetingDate = moment(myCurrentMeeting[0].date).format('DD MMM YYYY, dddd');
    }
    this.setState({
      isAlreadyAppointed: flag,
      myCurrentMeeting: myCurrentMeetingDate
    });
  }
  
  // find available dates and slots
  findAvailableDates() {
    this.setState({
      openDates: []
    }, () => {
      let openDates = [];
      this.state.availableHours.map((day) => {
        if (day.day) {
          let week = 0;
          while (week < this.state.daysShift) {
            let diff = (day.day - moment().weekday()) + week;
            let date = moment().add((diff), 'days');
            week += 7;
            date = moment(date._d).format();
            openDates.push(date);
          }
        }
        else if (day.date) {
          openDates.push(day.date);
        }
      });
      this.setState({
        openDates: openDates.map(function (date) {
          return moment(date)
        })
      });
    });
  }
  
  dpChange(date) {
    this.setState({
      choosenDate: date
    }, () => {
      this.appointedAlready();
      this.renderChoosenDay(date);
    });
  }
  
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  
  render() {
    return (
        <div>
          <hr/>
          <AddMeeting toggleMeeting={this.props.toggleMeeting}
                      startDate={this.state.choosenDate}
                      dpChange={this.dpChange}
                      allMeetings={this.state.allMeetings}
                      currentSlots={this.state.currentSlots}
                      slotTimes={this.state.slotTimes}
                      busySlots={this.state.busySlots}
                      openDates={this.state.openDates}
                      addMeeting={this.addMeeting}
                      toggle={this.toggle}
                      modal={this.state.modal}
                      backdrop={this.state.backdrop}
                      postMeeting={this.postMeeting}
                      doctorsName={this.props.doctorsName}
                      day={moment(this.state.date).format('DD MMM YYYY, dddd')}
                      meetingSlot={this.state.newMeeting.slot}
                      appointedAlready={this.state.appointedAlready}
                      isAlreadyAppointed={this.state.isAlreadyAppointed}
                      myCurrentMeeting={this.state.myCurrentMeeting}
          />
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentDoctor: state.doctors.currentDoctor,
    listEmpty: state.doctors.listEmpty,
    allMeetingsStore: state.doctors.allMeetings,
    role: state.activeUser.role,
    userId: state.activeUser.info
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setListEmpty: bindActionCreators(doctorsActions.listEmpty, dispatch),
    setAllMeetingsStore: bindActionCreators(doctorsActions.setAllMeetings, dispatch),
    setCurrentDoctor: bindActionCreators(doctorsActions.setCurrentDoctor, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMeetingContainer);