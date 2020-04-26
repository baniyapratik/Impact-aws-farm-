
import React, { Component } from 'react'
import CanvasJSReact from '../common/charts/canvasjs.react';
//const CanvasJSReact = require('./canvasjs.react');
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;


class PieChartTest extends Component {
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
            exportEnabled: true,
            animationEnabled: true,
            height: 250,
            width: 250,
            title: {
                text: "Test Results"
            },


            data: [{
                type: "pie",
                startAngle: 75,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 10,
                indexLabel: "{label} - {y}%",
                dataPoints: [
                    { y: 18, label: "PENDING" },
                    { y: 39, label: "PASSED" },
                    { y: 9, label: "WARNED" },
                    { y: 5, label: "FAILED" },
                    { y: 10, label: "SKIPPED" },
                    { y: 15, label: "ERRORED" },
                    { y: 4, label: "STOPPED" },
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

export default PieChartTest;