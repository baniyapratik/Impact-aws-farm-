
import React, { Component } from 'react'
import CanvasJSReact from './../common/charts/canvasjs.react';
//const CanvasJSReact = require('./canvasjs.react');
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;


class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false
        }
    }

    componentDidUpdate() {
        if (!this.state.render) {
            this.setState({ render: true });
        }
    }

    render() {
        const options = {
            exportEnabled: true,
            animationEnabled: true,
            height: 200,
            width: 250,
            creditText: "",
            creditHref: "",
            colorSet: "greenShades",
            title: {
                text: "Testers in the project",
                fontSize: 15
            },
            axisX: {
                title: "Types of Tester",
                titleFontSize: 10,
            },
            axisY: {
                title: "Number of testers",
                titleFontSize: 10,
                interval: 5

            },
            data: [{
                type: "bar",
                dataPoints: [
                    { label: "Pending", y: 10 },
                    { label: "Denied", y: 15 },
                    { label: "Accepted", y: 28 }
                ]
            }]
        }

        return (
            <div style={{ marginLeft: "30px" }}>
                <center>
                    <CanvasJSChart options={options} ></CanvasJSChart>
                </center>
            </div>
        );
    }
}

export default BarChart;