import React from 'react';
import AddSchedule from './add-schedule';
import config from 'react-global-configuration';
import * as _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as activeUserActions from '../../actions/active-user-action';


class AddScheduleContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            slotTimes: config.get('slotTimes'),
            days: [
                {
                    day: 'mo',
                    dayNumber: 0,
                    available: false,
                    slots: [],
                    slotValue: [{from: -1, to: -1}]
                },
                {
                    day: 'tu',
                    dayNumber: 1,
                    available: false,
                    slots: [],
                    slotValue: [{from: -1, to: -1}]
                },
                {
                    day: 'we',
                    dayNumber: 2,
                    available: false,
                    slots: [],
                    slotValue: [{from: -1, to: -1}]
                },
                {
                    day: 'th',
                    dayNumber: 3,
                    available: false,
                    slots: [],
                    slotValue: [{from: -1, to: -1}]
                },
                {
                    day: 'fr',
                    dayNumber: 4,
                    available: false,
                    slots: [],
                    slotValue: [{from: -1, to: -1}]
                },
                {
                    day: 'sa',
                    dayNumber: 5,
                    available: false,
                    slots: [],
                    slotValue: [{from: -1, to: -1}]
                },
                {
                    day: 'su',
                    dayNumber: 6,
                    available: false,
                    slots: [],
                    slotValue: [{from: -1, to: -1}]
                }
            ],
        };
        this.changeDay = this.changeDay.bind(this);
        this.newRange = this.newRange.bind(this);
        this.removeRange = this.removeRange.bind(this);
        this.changeSlotValue = this.changeSlotValue.bind(this);
        this.invalidForm = this.invalidForm.bind(this);
        this.saveSchedule = this.saveSchedule.bind(this);
    }

    changeDay(index){
        let d = this.state.days;
        d[index].available = !d[index].available;
        this.setState({days: d });
    }

    newRange(index){
        let d = this.state.days;
        d[index].slotValue.push({from: -1, to: -1});
        this.setState({days: d });
    }

    removeRange(index){
        let d = this.state.days;
        d[index].slotValue.pop();
        this.setState({days: d });
    }

    changeSlotValue(day, index, key, value){
        let d = this.state.days;
        d[day].slotValue[index][key] = value;
        this.setState({days: d });
    }

    invalidForm(){
        let invalid = true;
        _.forEach(this.state.days, (day)=>{
            if(day.available){
                invalid = false;
                _.forEach(day.slotValue, (slot)=>{
                    if(slot.from == -1 || slot.to == -1){
                        invalid = true;
                    }
                });
            }
        });
        return invalid;
    }

    saveSchedule(){
        let data = {available: []};
        _.forEach(this.state.days, (day)=>{
            if(day.available){
                let slots = [];
                let n = day.dayNumber;
                _.forEach(day.slotValue, (slot)=>{
                    for(let i = slot.from; i < slot.to; i++){
                        slots.push(parseInt(i));
                    }
                });
                data.available.push({day: n, slot: slots});
            }
        });
        axios.put(config.get('api') + 'doctors/' + this.props.user._id, data)
            .then(res => {
                let user = res.data;
                this.props.setInfo(user); 
            });
    }

    render() {
        return (           
            <AddSchedule slotTimes={this.state.slotTimes}
                         days={this.state.days}
                         changeDay={this.changeDay}
                         newRange={this.newRange}
                         removeRange={this.removeRange}
                         changeSlotValue={this.changeSlotValue}
                         focus={this.state.focus}
                         setFocus={this.setFocus}
                         invalidForm={this.invalidForm}
                         saveSchedule={this.saveSchedule} />   
        );
    }
}

function mapStateToProps(state) {
    return {
        role: state.activeUser.role,
        user: state.activeUser.info
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setInfo: bindActionCreators(activeUserActions.setUserInfo, dispatch),
        setRole: bindActionCreators(activeUserActions.setRole, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddScheduleContainer);