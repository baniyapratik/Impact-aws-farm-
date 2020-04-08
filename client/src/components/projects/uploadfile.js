import React, { Component } from 'react';
import axios from 'axios';
import * as routes from '../authentication/constants/routes';

class UploadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      url: '',
      project: this.props,
    };
  }

  handleChange = (ev) => {
    this.setState({ success: false, url: '' });
  };

  handleUpload = (ev) => {
    const file = this.uploadInput.files[0];
    const fileParts = this.uploadInput.files[0].name.split('.');
    const fileName = fileParts[0];
    const fileType = fileParts[1];
    const id = this.state.project.id;
    console.log('Preparing the upload');
    axios
      .post(`${routes.BACKEND_SERVER}projects/${id}/artifacts/`, {
        fileName: fileName,
        fileType: fileType,
      })
      .then((response) => {
        var returnData = response.data.data.returnData;
        var signedRequest = returnData.signedRequest;
        var url = returnData.url;
        this.setState({ url: url });
        console.log('Recieved a signed request ' + signedRequest);

        var options = {
          headers: {
            'Content-Type': fileType,
          },
        };
        axios
          .put(signedRequest, file, options)
          .then((result) => {
            console.log(`Response from s3 : ${JSON.stringify(result)}`);
            const artifactRequest = this.state.project;
            artifactRequest.artifacts.push({
              name: fileName,
              s3Id: this.state.url,
            });
            axios
              .patch(
                `${routes.BACKEND_SERVER}projects/${artifactRequest.id}`,
                artifactRequest
              )
              .then((res) => {
                console.log(res);
                this.setState({ success: true });
              })
              .catch((err) => {
                console.log(err);
                this.setState({ success: false });
              });
          })
          .catch((error) => {
            alert('ERROR ' + JSON.stringify(error));
          });
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };

  render() {
    const Success_message = () => (
      <div style={{ padding: 50 }}>
        <h3 style={{ color: 'green' }}>SUCCESSFUL UPLOAD</h3>
        <a href={this.state.url}>Access the file here</a>
        <br />
      </div>
    );
    return (
      <div className="App">
        <center>
          <h1>UPLOAD A FILE</h1>
          {this.state.success ? <Success_message /> : null}
          <input
            onChange={this.handleChange}
            ref={(ref) => {
              this.uploadInput = ref;
            }}
            type="file"
          />
          <br />
          <button onClick={this.handleUpload}>UPLOAD</button>
        </center>
      </div>
    );
  }
}
export default UploadFile;
