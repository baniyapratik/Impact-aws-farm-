import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./testrunner.css";
import * as routes from "./../authentication/constants/routes";
import { Table, Button, Alert } from "react-bootstrap";

class ListRuns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      runs: [],
      pendingStatus: false,
      project: this.props,
    };
  }

  componentDidMount() {
    axios
      .get(`/api/aws-testrunner/listruns/${this.state.project.projectarn}`)
      .then((res) => {
        if (res.data.runs[0].status !== "COMPLETED") {
          this.state.pendingStatus = true;
        } else {
          this.state.pendingStatus = false;
        }
        this.setState({ runs: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderRuns() {
    let buttonRender = (
      <button type="button" class="btn btn-lg btn-primary" enabled>
        View
      </button>
    );
    if (this.state.pendingStatus) {
      buttonRender = (
        <button type="button" class="btn btn-lg btn-primary" disabled>
          View
        </button>
      );
    }
    return Object.keys(this.state.runs).map((i, index) => {
      return (
        <div key={index}>
          <Table
            striped
            bordered
            hover
            responsive
            variant="dark"
            style={{ marginTop: "15px", textAlign: "center" }}
          >
            <thead>
              <tr>
                <th>Run Details</th>
                <th>Status</th>
                <th>Result</th>
                <th>View Run</th>
              </tr>
            </thead>
            <tbody>
              {this.state.runs[i].map((run, index2) => (
                <tr key={index2} data-value={run.arn}>
                  <td>
                    Name : {run.name} {"\n"}
                    Type : {run.type} {"\n"}
                    Platform : {run.platform} {"\n"}
                    Created on : {run.created} {"\n"}
                  </td>
                  <td>{run.status} </td>
                  <td>{run.result} </td>
                  <td>
                    <Link to={"/run/" + run.arn}>{buttonRender}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <table id="runs">
            <tr>
              <th>Run</th>
              <th>Type</th>
              <th>Platform</th>
              <th>Status</th>
              <th>Result</th>
              <th>Created</th>
              <th>View Run</th>
            </tr>
            {this.state.runs[i].map((run, index2) => (
              <tr key={index2} data-value={run.arn}>
                <td>{run.name} </td>
                <td>{run.type} </td>
                <td>{run.platform} </td>
                <td>{run.status} </td>
                <td>{run.result} </td>
                <td>{run.created} </td>
                <td>
                  <Link to={"/run/" + run.arn}>{buttonRender}</Link>
                </td>
              </tr>
            ))}
          </table>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderRuns()}</div>;
  }
}

export default ListRuns;
