
import React, { Component } from 'react'
import CanvasJSReact from '../common/charts/canvasjs.react';
//const CanvasJSReact = require('./canvasjs.react');
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;


class CostReportChart extends Component {
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
            animationEnabled: true,
            exportEnabled: true,
            height: 250,
            width: 300,
            title: {
                text: "Cost per day"
            },
            axisY: {
                title: "Cost per tester",
                includeZero: false,
                interval: 2
            },
            axisX: {
                title: "Week of Year",
                interval: 4
            },
            data: [{
                type: "line",
                toolTipContent: "Week {x}: {y}$%",
                dataPoints: [
                    { x: 1, y: 64 },
                    { x: 2, y: 61 },
                    { x: 3, y: 64 },
                    { x: 4, y: 62 },
                    { x: 5, y: 64 },
                    { x: 6, y: 60 },
                    { x: 7, y: 58 },
                    { x: 8, y: 59 },
                    { x: 9, y: 53 },
                    { x: 10, y: 54 },
                    { x: 11, y: 61 },
                    { x: 12, y: 60 },
                    { x: 13, y: 55 },
                    { x: 14, y: 60 },
                    { x: 15, y: 56 },
                    { x: 16, y: 60 },
                    { x: 17, y: 59.5 },
                    { x: 18, y: 63 },
                    { x: 19, y: 58 },
                    { x: 20, y: 54 },
                    { x: 21, y: 59 },
                    { x: 22, y: 64 },
                    { x: 23, y: 59 }
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

export default CostReportChart;