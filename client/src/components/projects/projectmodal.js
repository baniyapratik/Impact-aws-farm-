import React, { Component } from 'react';
import { Button, Modal, Tabs, Tab } from 'react-bootstrap';
import Moment from 'react-moment';
import UpdateProject from './updateproject';
import Enroll from './projectenroll';
import UploadFile from './uploadfile';
import ProjectTesters from './projecttesters';
import ProjectAnalytics from './projectanalytics';
import RunTests from './runtests';

class ProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      project: this.props,
      user: JSON.parse(localStorage.getItem('user')),
      tabKey: 'Analytics',
      isEnrolled: false,
    };
  }
  setShow = (bool) => {
    this.setState({ show: bool });
  };
  handleClose = () => this.setShow(false);
  handleShow = () => this.setShow(true);

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(this.state.project)) {
      this.setState({ project: this.props });
    }
  }
  setKey = (key) => {
    this.setState({ tabKey: key });
  };

  getTabs = () => {
    const user = this.state.user;
    const project = this.state.project;
    const tabKey = this.state.tabKey;
    if (user.usertype === 'Manager') {
      return (
        <>
          <Tabs
            id="controlled-tab-example"
            activeKey={tabKey}
            onSelect={(k) => this.setKey(k)}
          >
            <Tab eventKey="View" title="View">
              {this.getView()}
            </Tab>
            <Tab eventKey="Update" title="Update">
              <UpdateProject
                {...this.state.project}
                action={this.handleProjectUpdated}
              ></UpdateProject>
            </Tab>
            <Tab eventKey="Devices" title="Devices"></Tab>
            <Tab eventKey="Testers" title="Testers">
              <ProjectTesters {...this.state.project}> </ProjectTesters>
            </Tab>
            <Tab eventKey="Files" title="Files">
              <UploadFile {...this.state.project}></UploadFile>
            </Tab>
            <Tab eventKey="Analytics" title="Analytics">
              <ProjectAnalytics></ProjectAnalytics>
            </Tab>
          </Tabs>
        </>
      );
    } else if (user.usertype === 'Tester') {
      const checkEnrollment = (element) => {
        return element.tester === user._id && element.status === 'Accepted';
      };
      const project = this.state.project;
      const isEnrolled = project.testers.findIndex(checkEnrollment) !== -1;
      return (
        <>
          <Tabs
            id="controlled-tab-example"
            activeKey={tabKey}
            onSelect={(k) => this.setKey(k)}
          >
            <Tab eventKey="View" title="View">
              {this.getView()}
            </Tab>
            <Tab eventKey="Enroll" title="Enroll">
              <Enroll {...this.state.project}></Enroll>
            </Tab>
            <Tab eventKey="Files" title="Files" disabled={!isEnrolled}>
              <UploadFile {...this.state.project}></UploadFile>
            </Tab>
            <Tab eventKey="Tests" title="Tests" disabled={!isEnrolled}>
              <RunTests {...this.state.project}></RunTests>
            </Tab>
            <Tab
              eventKey="TestStatus"
              title="TestStatus"
              disabled={!isEnrolled}
            >
              <ListRuns {...this.state.project}></ListRuns>
            </Tab>
          </Tabs>
        </>
      );
    }
    return <></>;
  };

  getView = () => {
    const project = this.state.project;
    return (
      <center>
        <Tab.Content>
          <hr></hr>
          <div class="container">
            <div class="row">
              <div class="col-sm">
                <label>
                  <b>Id : </b>
                </label>
              </div>
              <div class="col-sm-8">{project.id}</div>
            </div>
            <div class="row">
              <div class="col-sm">
                <label>
                  <b>Description : </b>
                </label>
              </div>
              <div class="col-sm-8">
                <p
                  style={{
                    backgroundColor: 'lightgrey',
                    borderRadius: '5px',
                  }}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {project.description}
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-sm">
                <label>
                  <b>Start Date :</b>
                </label>
              </div>
              <div class="col-sm-8">
                <Moment format="dddd MMMM D Y">{project.start_date}</Moment>
              </div>
            </div>
            <div class="row">
              <div class="col-sm">
                <label>
                  <b>End Date :</b>
                </label>
              </div>
              <div class="col-sm-8">
                <Moment format="dddd MMMM D Y">{project.end_date}</Moment>
              </div>
            </div>
          </div>
        </Tab.Content>
      </center>
    );
  };

  handleProjectUpdated = () => {
    this.props.action();
    this.handleClose();
  };

  render() {
    const project = this.state.project;

    return (
      <>
        <Button variant="success" onClick={this.handleShow}>
          Open
        </Button>
        <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{project.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.getTabs()}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ProjectModal;
