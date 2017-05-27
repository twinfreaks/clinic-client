import React from 'react';
import { Container } from 'reactstrap';
import { Link } from "react-router";
import ImagesUploader from 'react-images-uploader';
import config from 'react-global-configuration';
import AvatarImageCropper from 'react-avatar-image-cropper';

class Cabinet extends React.Component {
    render() {
        return (
            <Container>
                <div className="cabinet">
                    <h3>This is a cabinet</h3>
                </div>
                {(this.props.user && (this.props.user.photoUrl === null || typeof this.props.user.photoUrl == 'undefined')) && 
                    <div style={{position: "relative"}}>
                        <img src={config.get('defaultAvatarUrl')} width="200"/>
                        <div className="upload-photo">
                            <AvatarImageCropper apply={this.props.apply} maxsize={5*1024*1024} />
                        </div>
                    </div>
                }
                {(this.props.user && (this.props.user.photoUrl !== null && typeof this.props.user.photoUrl != 'undefined')) && 
                    <div style={{position: "relative"}}>
                        <img src={config.get('api') + this.props.user.photoUrl} width="200"/>
                        <div className="upload-photo">
                            <AvatarImageCropper apply={this.props.apply} maxsize={5*1024*1024} />
                        </div>
                    </div>
                }          
                
            </Container>
        );
    }
}

export default Cabinet;