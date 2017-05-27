import React from 'react';
import { Container, Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import { Link, browserHistory } from "react-router";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Validation from 'react-validation';

class Registration extends React.Component {

  render() {
    return (
      <Container>
        <div className="registration">
          <h3>Registration in clinic</h3>
          {this.props.success &&
            <div className="alert alert-success">
              registration success! Your username {this.props.username} <Link to="/">login</Link>
            </div>
          }
          {!this.props.success &&

            <Validation.components.Form onSubmit={this.props.handleSubmit}>
              <FormGroup row tag="fieldset">
                <legend className="col-form-legend">Personal data</legend>
                <FormGroup row>
                  <Label for="firstName" md={3}>First name:</Label>
                  <Col md={9}>
                    <Validation.components.Input type="text" errorClassName='is-invalid-input'
                      value='' className="form-control" name="firstName"
                      id="firstName" placeholder="first name" validations={['required', 'onlyLetters']} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="lastName" md={3}>Last name:</Label>
                  <Col md={9}>
                    <Validation.components.Input className="form-control" type="text"
                      value='' name="lastName" id="lastName" placeholder="last name"
                      errorClassName='is-invalid-input' validations={['required', 'onlyLetters']} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="patronymic" md={3}>Patronymic:</Label>
                  <Col md={9}>
                    <Validation.components.Input className="form-control" type="text"
                      value='' name="patronymic" id="patronymic" placeholder="patronymic"
                      errorClassName='is-invalid-input' validations={['required', 'onlyLetters']} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="dateOfBirth" md={3}>Date of birth:</Label>
                  <Col md={9}>
                    <DatePicker showMonthDropdown showYearDropdown selected={this.props.dateOB}
                      onChange={this.props.handleDateChange} dropdownMode="select" />
                  </Col>
                </FormGroup>
              </FormGroup>

              <FormGroup row tag="fieldset">
                <legend className="col-form-legend">Address</legend>
                <FormGroup row>
                  <Col md={{ size: 6, offset: 0 }} xs={{ size: 12, offset: 0 }}>
                    <Validation.components.Input value='' className="form-control"
                      type="text" name="street" id="street" placeholder="street name"
                      errorClassName='is-invalid-input' validations={['required']} />
                  </Col>
                  <Col md={{ size: 3, offset: 0 }} xs={{ size: 6, offset: 0 }}>
                    <Validation.components.Input value='' className="form-control"
                      type="text" name="building" id="building" placeholder="building"
                      errorClassName='is-invalid-input' validations={['required']} />
                  </Col>
                  <Col md={{ size: 3, offset: 0 }} xs={{ size: 6, offset: 0 }}>
                    <Validation.components.Input value='' className="form-control"
                      type="text" name="appartment" id="appartment" placeholder="appartment"
                      errorClassName='is-invalid-input' validations={['required', 'number']} />
                  </Col>
                </FormGroup>
              </FormGroup>

              <FormGroup row tag="fieldset">
                <legend className="col-form-legend">Contacts</legend>
                <FormGroup row>
                  <Col md={{ size: 6, offset: 0 }} xs={{ size: 12, offset: 0 }}>
                    <Validation.components.Input className="form-control" value="" type="text" errorClassName='is-invalid-input'
                      name="email" id="email" placeholder="email" validations={['required', 'email']} />
                  </Col>
                  <Col md={{ size: 6, offset: 0 }} xs={{ size: 12, offset: 0 }}>
                    <Validation.components.Input className="form-control" value="" type="text" errorClassName='is-invalid-input'
                      name="phone" id="phone" placeholder="phone number" validations={['required', 'number']} />
                  </Col>
                </FormGroup>
              </FormGroup>

              <FormGroup row tag="fieldset">
                <legend className="col-form-legend">Login data</legend>
                <FormGroup row>
                  <Label for="username" md={3}>Username:</Label>
                  <Col md={9}>
                    <Validation.components.Input className="form-control" value="" onKeyUp={this.props.cleanError}
                      type="text" name="username" id="username" placeholder="username"
                      errorClassName='is-invalid-input' validations={['required', 'minThree']} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="password" md={3}>Password:</Label>
                  <Col md={9}>
                    <Validation.components.Input className="form-control" value=""
                      type="password" name="password" id="password" placeholder="password"
                      errorClassName='is-invalid-input' validations={['required', 'minThree']} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="passwordConfirm" md={3}>Confirm password:</Label>
                  <Col md={9}>
                    <Validation.components.Input className="form-control" value=""
                      type="password" name="passwordConfirm" id="passwordConfirm" placeholder="confirm password"
                      errorClassName='is-invalid-input' validations={['required', 'password', 'minThree']} />
                  </Col>
                </FormGroup>
              </FormGroup>
              <Validation.components.Button className="submit-btn pull-right btn btn-primary">Submit</Validation.components.Button>
            </Validation.components.Form>
          }
          {this.props.error &&
            <div className="alert alert-danger" style={{ width: '70%', float: 'left' }}>
              {this.props.errorMessage}
            </div>
          }
        </div>
      </Container>
    );
  }
}

export default Registration;