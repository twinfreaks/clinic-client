import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col} from 'reactstrap';
import {Link} from "react-router";
import moment from "moment";


class StartPage extends React.Component {
  
  render() {
    return (
        <div>
          {(this.props.role === 'guest' || this.props.role === null) &&
          <div className="login-links d-flex justify-content-center">
            <buton className="btn btn-link" onClick={this.props.redirectToLogin}>Log In</buton>
            <buton className="btn btn-link" onClick={this.props.redirectToRegistration}>Sign Up</buton>
          </div>}
          {this.props.role !== 'guest' && this.props.role !== null &&
          <div className="login-links d-flex justify-content-center">
            Welcome,{' '}{this.props.info && <span>{this.props.info.name.first}</span>}
          </div>}
          <div className="image-container">
            <h2 className="title">the CLINIC</h2>
            <div className="widget1"
                 onClick={ (this.props.role === 'guest' || this.props.role === null) ? this.props.toggle : this.props.redirectToCabinet}>
              <h5>Personal cabinet</h5>
              <p>If You are registered in our system, you can use our personal cabinet. In your cabinet You can view
                your next appointments to doctors either as view history of appointments.</p>
            </div>
            <div className="widget3" onClick={this.props.toggle2}>
              <h5>Contact with us</h5>
              <p>Feel free to contact us and ask questions about our clinic and doctors. Also you can make appointment
                via phone.</p>
            </div>
            <div className="widget2" onClick={this.props.redirectToDoctorsList}>
              <h5>Make appointment</h5>
              <p>Choose one of our specialists. You can find doctors in every medicine specialization. In our clinic
                work only professionals. Just choose date and time you wish.</p>
            </div>
          </div>
          <Container>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mi lorem, congue ac ligula a, pretium
              pharetra erat. Nam interdum a erat non vehicula. Morbi eu ipsum nec ligula maximus commodo nec laoreet
              odio. Integer vehicula enim turpis. Vestibulum nec lorem rutrum, faucibus erat et, sagittis tellus. Proin
              mollis, libero sed molestie mollis, felis tortor consectetur enim, id viverra dui erat et dolor. Aliquam
              tempus leo justo, eget rutrum urna euismod id. Proin purus dolor, porta at molestie in, mattis eu ipsum.
              Donec in eros lectus. Fusce nec nisi nec dui luctus varius. In ullamcorper scelerisque libero vitae
              dapibus.</p>
            <p>Duis ultricies facilisis aliquet. Pellentesque cursus nulla quis ante elementum, sed convallis arcu
              eleifend. Etiam quis aliquam quam. Phasellus tempor et ligula tempor suscipit. Vivamus quis risus
              venenatis, egestas velit ac, viverra odio. Cras massa lacus, posuere semper porttitor in, euismod quis
              magna. Ut tincidunt mi id augue dapibus, ut tempor justo aliquam. Cras sed arcu metus. Aliquam quis tortor
              at sapien imperdiet volutpat id viverra erat. Aenean eget neque eget risus euismod congue. Maecenas id est
              at quam vehicula rutrum varius at risus.</p>
            <p>Donec lobortis erat porta turpis mollis hendrerit. Nullam varius ante id molestie egestas. Ut id odio
              malesuada, eleifend dui non, sodales justo. Praesent lobortis velit purus, a malesuada lectus lobortis
              nec. Donec bibendum sagittis arcu vel volutpat. Vivamus at enim dapibus, tristique tellus in, iaculis
              risus. Quisque consequat mauris ac risus fermentum, sed pulvinar nisi venenatis. In hac habitasse platea
              dictumst. Donec eu massa at libero blandit tristique. Nulla ultricies, sem sollicitudin vulputate ornare,
              magna magna lobortis nibh, sit amet eleifend odio ipsum id elit. Nulla scelerisque iaculis ligula, quis
              dignissim risus consectetur non. Aenean euismod neque eu quam tincidunt ornare. Aliquam at porttitor
              purus, a pulvinar urna.</p>
            
            <Modal className="modal-lg"
                   isOpen={this.props.modal}
                   toggle={this.props.toggle}>
              <ModalHeader toggle={this.props.toggle}>You are not logged in</ModalHeader>
              <ModalBody>
                To use our personal cabinet and many other features, You should sign up to our system.
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                <Button color="warning" onClick={() => {
                  this.props.redirectToLogin();
                  this.props.toggle()
                }}>Log In</Button>{' '}
              </ModalFooter>
            </Modal>
  
            <Modal className="modal-lg"
                   isOpen={this.props.modal2}
                   toggle={this.props.toggle2}>
              <ModalHeader toggle={this.props.toggle2}>Contuct Us</ModalHeader>
              <ModalBody>
                telephone: 2412-535436-23
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.props.toggle2}>Close</Button>
              </ModalFooter>
            </Modal>
          
          </Container>
        </div>
    );
  }
}

export default StartPage;