import React, { Component } from 'react';
import * as routes from './../authentication/constants/routes';
import axios from 'axios';
import Project from './project';

class ViewProjects extends Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(localStorage.getItem('user'));
    this.state.projects = [];
    this.state.getAllProjects = true;
  }
  componentDidMount() {
    this.getProjectsForUser();
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    this.getProjectsForUser();
  }
  getProjectsForUser = () => {
    if (this.state.getAllProjects) {
      const resource = `${this.state.usertype.toLowerCase()}s`;
      let url;
      if (resource === 'testers') {
        url = `${routes.BACKEND_SERVER}${resource}/projects`;
      } else {
        url = `${routes.BACKEND_SERVER}${resource}/${this.state._id}/projects`;
      }

      axios
        .get(url)
        .then((res) => {
          console.log(res);
          this.state.getAllProjects = false;
          const projectArray = res.data.data.projects;
          const projects = projectArray.map((element) => {
            return {
              name: element.name,
              id: element._id,
              start_date: element.start_date,
              end_date: element.end_date,
              description: element.description,
              testers: element.testers,
              artifacts: element.artifacts,
            };
          });
          this.setState({
            projects: projects,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  getProjects = () => {
    this.setState({ getAllProjects: true });
  };

  render() {
    const projects = this.state.projects;
    return (
      <div>
        <h1>View Projects</h1>
        <div>
          {projects.map((project) => {
            return (
              <div id={project.id}>
                {project.name}{' '}
                <Project {...project} action={this.getProjects}></Project>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ViewProjects;
