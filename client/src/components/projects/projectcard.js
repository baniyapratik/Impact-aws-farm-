import React, { Component } from 'react';
import * as routes from './../authentication/constants/routes';
import axios from 'axios';
import { Card, Button, CardDeck } from 'react-bootstrap';
import style from './../authentication/styles/projectcard.css';
import ProjectModal from './projectmodal';
class ProjectCard extends Component {
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
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(this.state.project)) {
      this.setState({ project: this.props });
    }
  }

  getDaysFromCreation = (start_date) => {
    const start = new Date(start_date);
    const now = new Date();
    const difference = now.getTime() - start.getTime();
    const days = Math.floor(difference / (1000 * 3600 * 24));
    return `${days} day${days === 0 || days === 1 ? '' : 's'} ago`;
  };

  handleProjectUpdated = () => {
    this.props.action();
  };
  getPartialDescription = (string) => {
    if (string.length > 100) {
      return `${string.substring(0, 100)} ...`;
    }
    return string;
  };

  render() {
    const project = this.state.project;
    return (
      <div id="projectcardwrapper" style={{ marginTop: '20px' }}>
        <Card style={{ width: '15rem' }} bg="dark" text="white">
          <Card.Header style={{ backgroundColor: '#414f47' }}>
            Project
          </Card.Header>
          <Card.Body>
            <Card.Title>{project.name}</Card.Title>
            <Card.Text>
              {this.getPartialDescription(project.description)}
            </Card.Text>
            <ProjectModal
              {...project}
              action={this.handleProjectUpdated}
            ></ProjectModal>
          </Card.Body>
          <Card.Footer style={{ backgroundColor: '#414f47' }}>
            {this.getDaysFromCreation(project.start_date)}
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default ProjectCard;
