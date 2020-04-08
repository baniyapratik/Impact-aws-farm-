import React from 'react';
import ReactModal from 'react-modal';
import UpdateProject from './updateproject';
import UploadFile from './uploadfile';
import axios from 'axios';
import * as routes from '../authentication/constants/routes';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      user: JSON.parse(localStorage.getItem('user')),
      project: props,
      viewdisplay: '',
      updatedisplay: 'none',
      uploaddisplay: 'none',
      error: null,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(this.state.project)) {
      this.setState({ project: this.props });
    }
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      viewdisplay: '',
      updatedisplay: 'none',
      uploaddisplay: 'none',
    });
  };

  handleUpdateProject = () => {
    this.setState({
      viewdisplay: 'none',
      updatedisplay: '',
      uploaddisplay: 'none',
    });
  };

  handleUploadFile = () => {
    this.setState({
      viewdisplay: 'none',
      updatedisplay: 'none',
      uploaddisplay: '',
    });
  };

  getAdditionalActions = () => {
    const user = this.state.user;
    const project = this.state.project;

    if (user.usertype === 'Manager') {
      return (
        <div>
          <button onClick={this.handleUpdateProject}> Update Project </button>
          <button> Create Device Pool </button>
          <button onClick={this.handleUploadFile}> Upload Artifact</button>
        </div>
      );
    } else if (user.usertype === 'Tester') {
      const checkEnrollment = (element) => element === user._id;
      const isEnrolled = project.testers.findIndex(checkEnrollment) !== -1;
      return (
        <div>
          <button onClick={this.enrollTester} disabled={isEnrolled}>
            Enroll
          </button>
          <button onClick={this.handleUploadFile}> Upload Artifact</button>
        </div>
      );
    }
  };

  enrollTester = () => {
    const updateProjectRequest = this.state.project;
    updateProjectRequest.testers.push(this.state.user._id);
    const url = `${routes.BACKEND_SERVER}projects/${updateProjectRequest.id}`;
    axios
      .patch(url, updateProjectRequest)
      .then((res) => {
        console.log(res);
        this.props.action();
      })
      .catch((err) => {
        console.log(err);
        const error = {
          message: err.message,
        };
        this.setState(byPropKey('error', error));
      });
    console.log(updateProjectRequest);
  };

  handleProjectUpdated = () => {
    this.props.action();
    this.handleCloseModal();
  };

  render() {
    const project = this.state.project;
    const viewdisplay = this.state.viewdisplay;
    const updatedisplay = this.state.updatedisplay;
    const uploaddisplay = this.state.uploaddisplay;
    return (
      <div>
        <button onClick={this.handleOpenModal}>Open</button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
        >
          <button onClick={this.handleCloseModal}>X</button>
          <div style={{ display: viewdisplay }}>
            <p>
              <b>{project.name}</b>
            </p>
            <p>{project.id}</p>
            <p>{project.start_date}</p>
            <p>{project.end_date}</p>
            <p>{project.description}</p>
            {this.getAdditionalActions()}
          </div>
          <div style={{ display: updatedisplay }}>
            <UpdateProject
              {...this.state.project}
              action={this.handleProjectUpdated}
            ></UpdateProject>
          </div>
          <div style={{ display: uploaddisplay }}>
            <UploadFile {...this.state.project}></UploadFile>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default Project;
