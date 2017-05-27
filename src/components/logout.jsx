import React from 'react';
import {Link, browserHistory} from "react-router";
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import * as activeUserActions from '../actions/active-user-action';

class Logout extends React.Component {

    logout(){
        localStorage.removeItem('username');
        localStorage.removeItem('id');
        browserHistory.push('/');
        this.props.setRole(null);
        this.props.setInfo(null);
    }

    render() {
        return (
            <a className="nav-link" onClick={this.logout.bind(this)} style={{cursor: 'pointer'}}>Log out</a>
        );
    }
}

function mapStateToProps (state) {
  return {
    role: state.activeUser.role,
    info: state.activeUser.info
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setInfo: bindActionCreators(activeUserActions.setUserInfo, dispatch),
    setRole: bindActionCreators(activeUserActions.setRole, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);