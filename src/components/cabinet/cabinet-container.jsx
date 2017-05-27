import React from 'react';
import {Container} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as activeUserActions from '../../actions/active-user-action';
import {browserHistory} from "react-router";
import Cabinet from './cabinet';
import AddScheduleContainer from '../add-schedule/add-schedule-container';
import AuthoriationService from '../authorization';
import axios from 'axios';
import config from 'react-global-configuration';

class CabinetContainer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
            
    };
    this.savePhoto = this.savePhoto.bind(this);
    this.apply = this.apply.bind(this);
    this.uploadRequest=this.uploadRequest.bind(this);
  }
  
  toggleUploader() {
    this.setState({uploaderDispalay: !this.state.uploaderDispalay});
  }
  
  redirect() {
    browserHistory.replace('/');
  }
  
  savePhoto(photoUrl){
        axios.put(config.get('api') + 'doctors/' + this.props.user._id, { photoUrl: photoUrl })
            .then(res => {
                let user = this.props.user;
                user.photoUrl = res.data.photoUrl;
                this.props.setInfo(user);
                this.forceUpdate()
            });
    }

    apply(file) {
        let formData = new FormData();
        formData.append('file', file, "imageCropped.jpg");
        let xhr = this.uploadRequest(formData);
        axios.post("https://theclinic-server.herokuapp.com/upload-photo", formData)
            .then(res => {
                this.savePhoto(res.data.fileName);
            });
    }

    uploadRequest(formData) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', "https://theclinic-server.herokuapp.com/upload-photo", true);
        xhr.setRequestHeader("enctype", "multipart/form-data");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Cache-Control", "no-store");
        xhr.setRequestHeader("Pragma", "no-cache");
        xhr.send(formData);
        return xhr;
    }
  
  render() {
    return (
        <Container>
          <AuthoriationService/>
          {(this.props.user && (typeof this.props.user.doctorData.available == 'undefined' || this.props.user.doctorData.available === null)) &&
          <div>
            <h5>You didn't specify your schedule. Do it for patients can make meeting with you.</h5>
            <AddScheduleContainer />
          </div>
          }
          {(this.props.role === 'guest' || this.props.role === 'patient' || this.props.role === 'admin') && this.redirect()}
          {(this.props.role === 'doctor') &&
          <Cabinet
              toggleUploader={this.toggleUploader}
              uploaderDispalay={this.state.uploaderDispalay}
              user={this.props.user}
              savePhoto={this.savePhoto}/>}
        </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(CabinetContainer);