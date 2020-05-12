import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './testrunner.css';
import * as routes from './../authentication/constants/routes';
import { Table, Button, Alert } from 'react-bootstrap';
import GetRun from './GetRun';

class ListRuns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      runs: [],
      pendingStatus: false,
      project: this.props,
      showChart: false,
      currenttestarn: null,
    };
  }

  componentDidMount() {
    axios
      .get(`/api/aws-testrunner/listruns/${this.state.project.projectarn}`)
      .then((res) => {
        let status = null;
        if (res.data.runs[0].status !== 'COMPLETED') {
          status = true;
        } else {
          status = false;
        }
        this.setState({ runs: res.data, pendingStatus: status });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  showPieChart = (arn, event) => {
    this.setState({ showChart: true, currenttestarn: arn });
  };

  getPieChart() {
    const currenttestarn = this.state.currenttestarn;
    return (
      <div>
        <h4>Completed Status</h4>
        <GetRun {...{ arn: currenttestarn }}></GetRun>
      </div>
    );
  }

  buttonRender = (arn) => {
    const pendingStatus = this.state.pendingStatus;
    if (!pendingStatus) {
      return (
        <Button
          variant="light"
          onClick={(event) => this.showPieChart(arn, event)}
        >
          View
        </Button>
      );
    }

    return (
      <>
        <Button
          variant="light"
          onClick={(event) => this.showPieChart(arn, event)}
          disabled
        >
          View
        </Button>
      </>
    );
  };

  renderRuns() {
    const showChart = this.state.showChart;
    let buttonRender = (
      <button
        type="button"
        class="btn btn-lg btn-primary"
        disabled={false}
        onClick={this.showPieChart}
      >
        View
      </button>
    );
    if (this.state.pendingStatus) {
      buttonRender = (
        <button type="button" class="btn btn-lg btn-primary" disabled={true}>
          View
        </button>
      );
    }
    return Object.keys(this.state.runs).map((i, index) => {
      return (
        <div key={index}>
          <center>
            <hr></hr>
            <h4>Test Status</h4>
            <Table
              striped
              bordered
              hover
              responsive
              variant="dark"
              style={{ marginTop: '15px', textAlign: 'center' }}
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
                      Name : {run.name} <br />
                      Type : {run.type} <br />
                      Platform : {run.platform} <br />
                      Created on : {run.created} <br />
                    </td>
                    <td>{run.status} </td>
                    <td>{run.result} </td>
                    <td>{this.buttonRender(run.arn)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div>{showChart && this.getPieChart()}</div>
          </center>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderRuns()}</div>;
  }
}

export default ListRuns;
