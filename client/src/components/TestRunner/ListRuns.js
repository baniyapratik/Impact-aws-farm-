import React, { Component } from 'react';
import axios from 'axios';

class ListRuns extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runs: []
        }
    }

    componentDidMount() {
        axios.get('/aws-testrunner/listruns')
            .then(res => {
                this.setState({ runs: res.data });
            }).catch((err) => {
                console.log(err);
            });
    }

    renderRuns() {
        return Object.keys(this.state.runs).map((i, index) => {
            return (
                <div key={index}>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Platform</th>
                            <th>Status</th>
                            <th>Result</th>
                        </tr>
                        {this.state.runs[i].map((run, index2) =>
                            <tr key={index2}>
                                <td>{run.name}</td>
                                <td>{run.type}</td>
                                <td>{run.platform}</td>
                                <td>{run.status}</td>
                                <td>{run.result}</td>
                            </tr>
                        )}
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

export default ListRuns;