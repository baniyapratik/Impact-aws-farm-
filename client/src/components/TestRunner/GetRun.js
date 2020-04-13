import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class GetRun extends Component {
    constructor(props) {
        super(props);
        this.state = {
            run: []
        }
    }

    componentDidMount() {
        let arn = this.props.match.params.id + "/" + this.props.match.params.id2;
        axios.get('/aws-testrunner/getrun/' + arn)
            .then(res => {
                console.log(res.data);
                this.setState({ run: res.data });
            }).catch((err) => {
                console.log(err);
            });
    }

    renderRuns() {
        return Object.keys(this.state.run).map((i, index) => {
            return (
                <div key={index}>
                    <table id="runs">
                        <tr>
                            <th>Run</th>
                            <th>STOPPED</th>
                            <th>SKIPPED</th>
                            <th>PASSED</th>
                            <th>Total minutes</th>
                        </tr>
                        <tr>
                            <td>{this.state.run[i].name}</td>
                            <td>{this.state.run[i].counters.stopped}</td>
                            <td>{this.state.run[i].counters.skipped}</td>
                            <td>{this.state.run[i].counters.passed}</td>
                            <td>{this.state.run[i].deviceMinutes.total}</td>
                        </tr>
                    </table>
                </div>
            )
        });
    }

    render() {
        return (
            <div>
                {this.renderRuns()}
            </div>
        )
    }
}

export default GetRun;