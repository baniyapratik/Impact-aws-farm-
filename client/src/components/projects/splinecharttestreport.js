
import React, { Component } from 'react'
import CanvasJSReact from '../common/charts/canvasjs.react';
//const CanvasJSReact = require('./canvasjs.react');
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;


class DateTestChart extends Component {
    constructor(props) {
        super(props);
        CanvasJS.addColorSet("greenShades",
            [

                "#2F4F4F",
                "#008080",
                "#2E8B57",
                "#3CB371",
                "#90EE90"
            ]);
    }

    render() {
        const options = {
            height: 250,
            width: 300,
            animationEnabled: true,
            title: {
                text: "Scripts Run"
            },
            axisY: {
                title: "Number of tests",
                includeZero: true,
                interval: 8
            },
            data: [{
                type: "splineArea",
                xValueFormatString: "DD-MM-YY",
                showInLegend: true,
                legendText: " = Tests Run",
                dataPoints: [
                    { x: new Date(2020, 3, 10), y: 15 },
                    { x: new Date(2020, 3, 12), y: 22 },
                    { x: new Date(2020, 3, 13), y: 9 },
                    { x: new Date(2020, 3, 14), y: 40 },
                    { x: new Date(2020, 3, 15), y: 18 },
                    { x: new Date(2020, 3, 16), y: 25 },
                    { x: new Date(2020, 3, 17), y: 29 },
                    { x: new Date(2020, 3, 18), y: 28 },
                    { x: new Date(2020, 3, 19), y: 15 },
                    { x: new Date(2020, 3, 20), y: 8 }
                ]
            }]
        }
        return (
            <div style={{ marginLeft: "15px" }}>
                <center>
                    <CanvasJSChart options={options} ></CanvasJSChart>
                </center>
            </div>
        );
    }
}

export default DateTestChart;