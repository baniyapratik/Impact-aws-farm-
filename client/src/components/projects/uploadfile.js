import React, { Component } from 'react';
import axios from 'axios';
import * as routes from '../authentication/constants/routes';
import { Form, Button, Alert, Row } from 'react-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';

class UploadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      url: '',
      project: this.props,
      user: JSON.parse(localStorage.getItem('user')),
      error: false,
    };
  }

  componentDidMount() {
    bsCustomFileInput.init();
  }

  handleChange = (ev) => {
    this.setState({ success: false, url: '', error: false });
  };

  handleUpload = (ev) => {
    const file = this.uploadInput.files[0];
    if (!file) {
      this.setState({ error: true });
      return;
    }
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
              owner: this.state.user._id,
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
    const SuccessMessage = () => (
      <>
        <Alert variant="success" dismissible={true}>
          <Alert.Heading>File Uploaded Succesfully</Alert.Heading>
          <p>
            The file has been saved in the cloud.
            <a target="_blank" href={this.state.url}>
              Access the file here{' '}
            </a>
          </p>
        </Alert>
      </>
    );
    return (
      <div className="fileform">
        <hr></hr>
        <center>
          <Form>
            <h4></h4>
            {this.state.success ? <SuccessMessage /> : null}
            <Form.File
              id="custom-file"
              label="Custom file input"
              custom
              onChange={this.handleChange}
              ref={(ref) => {
                this.uploadInput = ref;
              }}
            ></Form.File>
            <Button onClick={this.handleUpload} style={{ marginTop: '15px' }}>
              Upload
            </Button>
            <Alert
              show={this.state.error}
              dismissible={true}
              variant="danger"
              style={{ marginTop: '15px' }}
            >
              Please select a file to continue
            </Alert>
          </Form>
        </center>
      </div>
    );
  }
}
export default UploadFile;
