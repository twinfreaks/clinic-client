import React from 'react';
import {Container} from 'reactstrap';
import {Link} from "react-router";
import moment from "moment";

function renderMeetings(currentMeetings) {
  return currentMeetings.map((meeting, index) => (
      <Meetings key={index} meeting={meeting}/>
  ));
}

const Meetings = ({meeting}) => {
  return (
      <tr>
        <td>
          {moment(meeting.date).format('DD MMM YYYY, dddd, hh:mm')}
        </td>
        <td>
          {meeting.doctor.name.first}{' '}
          {meeting.doctor.name.last}{' '}
        </td>
      </tr>
  )
};

class Home extends React.Component {
  
  render() {
    const meetings = renderMeetings(this.props.currentMeetings);
    const pastMeetings = renderMeetings(this.props.meetingsInPast);
    return (
        <Container>
            <div className="homepage col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              {(this.props.role == 'patient' || this.props.role == 'admin') &&
              <Link to="doctors-list"><i className="fa fa-mail-forward"></i> to doctors list</Link>}
              <h4 className="mb-4 mt-3">Your appointments</h4>
              {(this.props.currentMeetings.length || this.props.meetingsInPast.length) && <div>
                <button className={"mr-2 btn btn-secondary current-meetings-btn " + (this.props.togglerCurrent ? 'active' : '')}
                        onClick={this.props.toggleCurrent}>
                  Current appointments
                </button>
                <button className={"btn btn-secondary past-meetings-btn " + (this.props.togglerPast ? 'active' : '')}
                        onClick={this.props.togglePast}>
                  Past appointments
                </button>
                <table className="table table-striped mt-4">
                  <thead>
                  <tr>
                    <th>date</th>
                    <th>doctor</th>
                  </tr>
                  </thead>
                  {this.props.togglerCurrent && <tbody>{meetings}</tbody>}
                  {this.props.togglerPast && <tbody>{pastMeetings}</tbody>}
                </table>
              </div>}
            </div>
        </Container>
    );
  }
}

export default Home;