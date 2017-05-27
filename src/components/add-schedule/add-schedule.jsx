import React from 'react';
import { Container, Input, Button } from 'reactstrap';
import * as _ from 'lodash';
import InputMask from 'react-input-mask';


class AddSchedule extends React.Component {

    renderAvailableDays(){
        const Day = ({day, ranges, index, checked, slotValue}) => {
            return (
                <div className="day-item row" style={{padding: "15px 0", borderBottom: "1px solid #d1d3d4"}}>
                    <div className="col-3 col-md-2 col-lg-1">
                        <div className="available-day-item">
                            <input type="checkbox" id={day} name={day} checked={checked} onChange={()=>{this.props.changeDay(index)}}/>
                            <label className={day} htmlFor={day}></label>
                        </div>
                        <div>
                            {checked && ranges < 6 && 
                                <Button style={{marginLeft: "6px", marginBottom: "2px"}} onClick={()=>{this.props.newRange(index)}} type="button" color="success" 
                                    disabled={slotValue[slotValue.length -1].to == -1 || slotValue[slotValue.length -1].from == -1}>
                                    <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                </Button>
                            }
                            {checked && ranges > 1 && 
                                <Button style={{marginLeft: "6px"}} onClick={() => { this.props.removeRange(index) }} type="button" color="danger" >
                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                </Button>
                            }
                        </div>
                    </div>
                    <div className="col-9 col-md-10 col-lg-11 row">
                        {checked && this.renderTimeRange(day, ranges, index, slotValue)}
                    </div>
                </div>
            );
        };
        return this.props.days.map((day, index) => (
            <Day key={index} index={index} day={day.day} ranges={day.slotValue.length} checked={day.available} slotValue={day.slotValue}/>
        ));
    }

    renderTimeRange(day, times, dayIndex, slotValue){
        const Range = ({index}) => {
            return (
                <div className="available-hours-item col-12 col-sm-12 col-md-9 col-lg-6 col-xl-4  row">
                    <div className="col-12 col-sm-5">
                        <Input type="select" id={"from-" + day + "-" + index} name={"from-" + day + "-" + index} 
                            onChange={(e)=>{this.props.changeSlotValue(dayIndex, index, 'from', e.target.value)}}
                            defaultValue={slotValue[index].from} disabled={times > index+1}>
                            {this.renderOptions(slotValue, index, 'from')}
                        </Input>
                    </div>
                    <div className="col-12 col-sm-5">
                        <span className="schedule-separator">-</span>
                        <Input type="select" id={"to-" + day + "-" + index} name={"to-" + day + "-" + index}
                            onChange={(e)=>{this.props.changeSlotValue(dayIndex, index, 'to', e.target.value)}}
                            defaultValue={slotValue[index].to} disabled={times > index+1}>
                            {this.renderOptions(slotValue, index, 'to')}
                        </Input>
                    </div>
                    <div className="col-12 col-sm-2" style={{textAlign: 'center'}}>
                        
                    </div>
                </div>
            );
        };
        return Array.from(Array(times)).map((slot, index) => (
            <Range key={index} index={index}/>
        ));
    }

    renderOptions(slotValue, indexRange, period){
        const Slot = ({slot}) => {
            return (
                    <option disabled={(slot == -1)} value={slot}>{(slot == -1)?period:this.props.slotTimes[slot].substr(0, 5)}</option>
            );
        };
        let available = [-1];
        if((slotValue[indexRange].to == -1 && period == 'from')) {
            Array.from(Array(48)).forEach((x, i) => {
                let push = true;
                _.forEach(slotValue, (slotRange, index) => {
                    if(index != indexRange && i >= parseInt(slotRange.from) - 1 && i <= parseInt(slotRange.to)){
                        push = false;
                    }
                });
                if(push){
                    available.push(i);
                }
            });
        } else if((slotValue[indexRange].from == -1 && period == 'to')) {
            Array.from(Array(48)).forEach((x, i) => {
                let push = true;
                _.forEach(slotValue, (slotRange, index) => {
                    if(index != indexRange && i <= parseInt(slotRange.to) + 1 && i >= parseInt(slotRange.from)){
                        push = false;
                    }
                });
                if(push){
                    available.push(i);
                }
            });
        } else if((slotValue[indexRange].from != -1 && period == 'to')) {
            Array.from(Array(48)).forEach((x, i) => {
                let push = true;
                _.forEach(slotValue, (slotRange, index) => {
                    if((index < indexRange && i >= parseInt(slotRange.from) && parseInt(slotValue[indexRange].from) < parseInt(slotRange.from)) || (index == indexRange && i <= parseInt(slotValue[indexRange].from))){
                        push = false;
                    }
                });
                if(push){
                    available.push(i);
                }
            });
        } else if((slotValue[indexRange].to != -1 && period == 'from')) {
            Array.from(Array(48)).forEach((x, i) => {
                let push = true;
                _.forEach(slotValue, (slotRange, index) => {
                    if((index < indexRange && i <= parseInt(slotRange.to) && parseInt(slotValue[indexRange].to) > parseInt(slotRange.to)) || (index == indexRange && i >= parseInt(slotValue[indexRange].to))){
                        push = false;
                    }
                });
                if(push){
                    available.push(i);
                }
            });
        }
        return available.map((slot, index) => (
            <Slot key={index} slot={slot}/>
        ));
    }

    render() {
        return (           
            <Container>             
                <div className="add-schedule">
                    {this.renderAvailableDays()}
                    <Button color="success" disabled={this.props.invalidForm()} onClick={this.props.saveSchedule} style={{marginTop: "10px"}}>Save</Button>
                </div>
            </Container>   
        );
    }
}

export default AddSchedule;