import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import Validation from 'react-validation';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Link } from "react-router";


function renderDoctorTypes() {
  let t = this;
  let length = t.props.doctorType.length;
  return t.props.doctorType.map((type, index) => (
    <Type key={index} length={length} index={index} type={type} t={t} />
  ));
}

const Type = ({length, index, type, t}) => {
  return (
    <Container>
      <h4>Type {index + 1}</h4>
      <FormGroup row>
        <Label for={'typeName' + index} md={3}>Type name:</Label>
        <Col md={8}>
          <Validation.components.Input className="form-control" type="text" errorClassName='is-invalid-input'
            onChange={(e) => t.props.setDoctorType(e.target.value, index, 'name')}
            value={t.props.doctorType[index]['name']} name={'typeName' + index} id={'typeName' + index} placeholder="type name" validations={['required']} />
        </Col>
        <Col md={1}>
          {index !== 0 && <Button onClick={() => { t.props.removeDoctorType(index) }} type="button" color="danger">x</Button>}
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for={"typeDesc" + index} md={3}>Type description:</Label>
        <Col md={9}>
          <Validation.components.Textarea className="form-control" errorClassName='is-invalid-input' rows="2"
            onChange={(e) => t.props.setDoctorType(e.target.value, index, 'description')} style={{ resize: 'none' }}
            value={t.props.doctorType[index]['description']} name={"typeDesc" + index} id={"typeDesc" + index} placeholder="type description" validations={[]} />
        </Col>
      </FormGroup>
      {(index + 1 === length && length < 6) && <Button onClick={t.props.newDoctorType} type="button" color="success">+</Button>}
    </Container>
  )
};

class DoctorAddEdit extends React.Component {

  render() {
    return (
      <div>
        <Col md={{ size: 8, offset: 2 }} xs={{ size: 10, offset: 1 }} style={{ marginBottom: '50px' }}>
          <h2>
            {this.props.doctorId === 'add' && 'Add new doctor'}
            {this.props.doctorId !== 'add' && "Doctor's info"}
          </h2>
          <Validation.components.Form onSubmit={this.props.saveDoctor}>
            <FormGroup row tag="fieldset">
              <legend className="col-form-legend">Personal data</legend>
              <FormGroup row>
                <Label for="firstName" md={3}>First name:</Label>
                <Col md={9}>
                  <Validation.components.Input type="text" errorClassName='is-invalid-input'
                    value={this.props.name.first} className="form-control" name="firstName"
                    id="firstName" placeholder="first name" validations={['required', 'onlyLetters']} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="lastName" md={3}>Last name:</Label>
                <Col md={9}>
                  <Validation.components.Input className="form-control" type="text"
                    value={this.props.name.last} name="lastName" id="lastName" placeholder="last name"
                    errorClassName='is-invalid-input' validations={['required', 'onlyLetters']} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="patronymic" md={3}>Patronymic:</Label>
                <Col md={9}>
                  <Validation.components.Input className="form-control" type="text"
                    value={this.props.name.patronymic} name="patronymic" id="patronymic" placeholder="patronymic"
                    errorClassName='is-invalid-input' validations={['required', 'onlyLetters']} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="dateOfBirth" md={3}>Date of birth:</Label>
                <Col md={9}>
                  <DatePicker showMonthDropdown showYearDropdown selected={this.props.info.dateOfBirth}
                    onChange={this.props.handleDateChange} dropdownMode="select" />
                </Col>
              </FormGroup>
            </FormGroup>
            <FormGroup row tag="fieldset">
              <legend className="col-form-legend">Biography</legend>
              <Col md={12}>
                <Validation.components.Textarea className="form-control" rows="5" style={{ resize: 'none' }}
                  value={this.props.bio} name="biography" id="biography" placeholder="biography"
                  errorClassName='is-invalid-input' validations={['required']} />
              </Col>
            </FormGroup>
            <FormGroup row tag="fieldset">
              <legend className="col-form-legend">Doctor Type</legend>
              {renderDoctorTypes.call(this)}
            </FormGroup>
            <FormGroup row tag="fieldset">
              <legend className="col-form-legend">Login data</legend>
              <FormGroup row>
                <Label for="username" md={3}>Username:</Label>
                <Col md={9}>
                  <Validation.components.Input className="form-control"
                    value={this.props.info.username} name="username" id="username" placeholder="username"
                    errorClassName='is-invalid-input' validations={['required', 'minThree']} />
                </Col>
              </FormGroup>
              {(this.props.doctorId !== 'add' && !this.props.newPassword) &&
                <div>
                  <span>password set </span>
                  <Button type="button" onClick={this.props.toggleNewPassword}>new password</Button>
                </div>}
              {(this.props.doctorId == 'add' || this.props.newPassword) &&
                <FormGroup row>

                  <Label for="password" md={3}>Password:</Label>
                  <Col md={9}>
                    <Validation.components.Input className="form-control"
                      value="" name="password" id="password" placeholder="password"
                      errorClassName='is-invalid-input' validations={['required', 'minThree']} />
                  </Col>
                </FormGroup>
              }
              {(this.props.doctorId !== 'add' && this.props.newPassword) && <Button type="button" onClick={this.props.toggleNewPassword}>cancel password</Button>}
            </FormGroup>
            <Validation.components.Button className="pull-right btn btn-success">Save</Validation.components.Button>
            {this.props.doctorId !== 'add' && <Button color="danger" style={{ marginRight: '10px' }} className="pull-right" onClick={this.props.toggle}>Remove</Button>}
          </Validation.components.Form>
          <span className="back-link" onClick={this.props.toDoctorList}>Doctors list</span>
        </Col>

        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className="modal-sm" backdrop={this.props.backdrop}>
          <ModalHeader toggle={this.props.toggle}>Remove doctor</ModalHeader>
          <ModalBody>
            Are your sure you want to remove this doctor from clinic?
            </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.deleteDoctor}>Yes</Button>{' '}
            <Button color="secondary" onClick={this.props.toggle}>No</Button>
          </ModalFooter>
        </Modal>

      </div>
    );
  }
}

export default DoctorAddEdit;