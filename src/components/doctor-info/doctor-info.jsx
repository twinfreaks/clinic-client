import React from "react";
import {Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import config from 'react-global-configuration';

class DoctorInfo extends React.Component {
  
  renderDoctorTypes(doctorType) {
    const Type = ({type}) => {
      return (
          <li>
            <span>{'\n'}{type.name}{'.\n'}</span>
            <span>{type.description}</span>
          </li>
      )
    };
    return doctorType.map((type, index) => (
        <Type key={index} type={type}/>
    ));
  }
  
  render() {
    return (
        <Container>
          <Row>
            <Col md={{size: 8, offset: 1}} xs={{size: 10, offset: 1}}>
              <button type="button" className="btn btn-link mr-1 mb-4" onClick={this.props.toDoctorList}><i className="fa fa-chevron-left"></i> back</button>
            </Col>
          </Row>
          <Row>
            <Col md={{size: 8, offset: 1}} xs={{size: 10, offset: 1}}>
              {(this.props.info.photoUrl === null || typeof this.props.info.photoUrl == 'undefined') &&
              <img src={'../' + config.get('defaultAvatarUrl')} className="avatar-photo-info" />
              }
              {(this.props.info.photoUrl !== null && typeof this.props.info.photoUrl != 'undefined') &&
              <img src={'../' + config.get('api') + this.props.info.photoUrl} className="avatar-photo-info" />
              }
              <h4 className="doctor-inf-header">doctor{' '}
                {this.props.name.first}{' '}{this.props.name.last}
              </h4>
              <div className="float-none mt-2 mb-2"></div>
  
              <div>
                <ul>{this.renderDoctorTypes(this.props.doctorType)}</ul>
                <p><i>{this.props.info.doctorData.bio}</i></p>
              </div>
              { !this.props.meeting && <Button className="mt-4" color="warning" onClick={this.props.toggleMeeting}>Make meeting</Button>}
            </Col>
          </Row>
        </Container>
    );
  }
}

// DoctorInfo.propTypes = {
//   setYear: PropTypes.func.isRequired
// };

export default DoctorInfo;