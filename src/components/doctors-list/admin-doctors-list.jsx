import React from 'react';
import { Link } from "react-router";
import { browserHistory } from "react-router";
import { Button, Container, Row, Col } from 'reactstrap';
import config from 'react-global-configuration';

function renderDoctors(info) {
    if (info.length > 0) {
        return info.map((doctor, index) => (
            <Doctor key={index} doctor={doctor} />
        ));
    }
    else return [];
}

const Doctor = ({doctor}) => {
    const doctorTypes = renderDoctorTypes(doctor);
    const doctorBio = doctor.doctorData.bio.substring(0, 100) + '...';
    return (
        <Col xs="12" sm="12" md="12" lg="6" className="doctors-list">
            <Col xs="12" className="doctor-item">
                <doctor key={doctor._id}>
                    <Link to={"/doctor-add-edit/" + doctor._id} activeClassName="active">
                        <Row>
                            <Col xs="4" sm="3" md="2" lg="4">
                                {(doctor.photoUrl === null || typeof doctor.photoUrl == 'undefined') &&
                                    <img src={config.get('defaultAvatarUrl')} className="avatar-photo" />
                                }
                                {(doctor.photoUrl !== null && typeof doctor.photoUrl != 'undefined') &&
                                    <img src={config.get('api') + doctor.photoUrl} className="avatar-photo" />
                                }
                            </Col>
                            <Col xs="8" sm="9" md="10" lg="8">
                                <Row>
                                    <Col xs="12">
                                        <h4>{doctor.name.first}{' '}{doctor.name.last}</h4>
                                    </Col>
                                    <Col xs="12">
                                        <ul className="doctor-types">
                                            {doctorTypes}
                                        </ul>
                                    </Col>
                                    <Col xs="12">
                                        <p>{doctorBio}</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Link>
                </doctor>
            </Col>
        </Col>
    );
};

function renderDoctorTypes(doctor) {
    const dType = doctor.doctorData.doctorType;
    return dType.map((type, index) => (
        <Type key={index} type={type} />
    ));
}

const Type = ({type}) => {
    return (
        <li>
            {type.name}{'. '}{type.description}
        </li>
    )
};

class AdminDoctorsList extends React.Component {

    render() {
        const doctors = renderDoctors(this.props.info);
        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <Link to={"/doctor-add-edit/add"} activeClassName="active">
                            <Button color="success" style={{ cursor: 'pointer', marginBottom: '40px' }}><i className="fa fa-3x fa-plus-circle" aria-hidden="true"></i></Button>
                        </Link>
                    </Col>
                    <Row className="equal">
                        {doctors}
                    </Row>
                </Row>
            </Container>
        )
    }
}

export default AdminDoctorsList;