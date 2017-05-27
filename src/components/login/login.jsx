import React from 'react';
import { Container, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link, browserHistory } from "react-router";

class Login extends React.Component {

  render() {
    return (
      <Container>
        <div className="login">
          <h3>Login to clinic</h3>
          <Form onSubmit={this.props.handleSubmit} className="login-form">
            <FormGroup>
              <Label for="username">Username</Label>
              <Input type="text" name="username" id="username" placeholder="username" onChange={this.props.checkUsername} />
              <span className="fa fa fa-user-circle-o fa-lg input-icon"></span>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" name="password" id="password" placeholder="password" onChange={this.props.checkPassword} />
              <span className="fa fa-unlock-alt fa-lg input-icon"></span>
            </FormGroup>
            <Link to="registration">registration</Link>
            <Button className="submit-btn pull-right" color="info" disabled={!(this.props.usernameValid && this.props.passwordValid)}>Login</Button>
          </Form>
          {this.props.loginError &&
            <div className="alert alert-danger">
              {this.props.loginErrorMessage}
            </div>
          }
        </div>
      </Container>
    );
  }
}

export default Login;