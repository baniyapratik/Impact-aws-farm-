import React, { Component } from 'react';
import axios from 'axios';
import * as routes from '../authentication/constants/routes';
import { Table, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faWindowClose } from '@fortawesome/free-solid-svg-icons'

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});


class ProjectTesters extends Component {
    constructor(props) {
        super(props)
        this.state = {
            project: this.props,
            user: JSON.parse(localStorage.getItem('user')),
            error: null,
            completeDetails: []
        }

    }

    componentDidMount() {
        const project = this.state.project;
        const testers = project.testers;
        const completeTesterDetails = [];
        const requests = testers.map(tester => {

            return axios.get(`${routes.BACKEND_SERVER}testers/${tester.tester}`).then(res => {
                const details = {};
                const testerData = res.data.data.tester;
                details.status = tester.status;
                details.id = tester.tester;
                details.name = testerData.name;
                details.address = testerData.address;
                details.state = testerData.state;
                details.city = testerData.city;
                details.zip = testerData.zip;
                details.technology = testerData.technology;
                completeTesterDetails.push(details);

            }).catch(err => {
                console.log(err);
                this.state.error = `Error generated while getting details of tester with ID ending in ${tester.tester.substring(tester.tester.length - 4)}`;
            })

        });
        Promise.all(requests).then(() => {
            this.setState({ completeDetails: completeTesterDetails });
        });

    }

    enrollTester = (id, event) => {
        const testerid = id;
        const projecUpdateRequest = this.state.project;
        const index = projecUpdateRequest.testers.findIndex((tester) => {
            if (tester.tester === testerid) {
                return tester;
            }
        })
        const newTester = projecUpdateRequest.testers[index];
        newTester.status = 'Accepted';
        projecUpdateRequest.testers[index] = newTester;
        const url = `${routes.BACKEND_SERVER}projects/${projecUpdateRequest.id}`;
        axios
            .patch(url, projecUpdateRequest)
            .then((res) => {
                console.log(res);
                this.setState({ project: res.data.data.project })
            })
            .catch((err) => {
                console.log(err);
                const error = {
                    message: err.message,
                };
                this.setState(byPropKey('error', error));
            });
        console.log(projecUpdateRequest);


    }

    getTable = () => {
        const completeDetails = this.state.completeDetails;
        let rowData;
        if (completeDetails.length > 0) {
            rowData = completeDetails.map((element => {
                const actionDisabled = element.status === 'Accepted' || element.status === 'Denied';
                return (
                    <tr>
                        <td>{element.name}</td>
                        <td>{element.address}</td>
                        <td>{element.city}</td>
                        <td>{element.state}</td>
                        <td>{element.technology}</td>
                        <td>{element.status}</td>
                        <td><Button onClick={(event) => this.enrollTester(element.id, event)} variant="light" id={element.id} disabled={actionDisabled}  ><FontAwesomeIcon icon={faCheckSquare} style={{ color: 'green' }} /></Button></td>
                        <td><Button onClick={(event) => this.enrollTester(element.id, event)} variant="light" id={element.id} disabled={actionDisabled}  ><FontAwesomeIcon icon={faWindowClose} style={{ color: 'red' }} /></Button></td>
                    </tr>

                );
            }))
        } else {
            rowData = <tr><td colSpan="7">No testers have applied at the moment</td></tr>
        }
        return (<>
            <h4>Testers</h4>
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
                        <th>Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Technology</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rowData}
                </tbody>
            </Table>
        </>)
    }

    render() {
        return (
            <>
                <hr></hr>
                {this.getTable()}
            </>
        )
    }

}


export default ProjectTesters