import React, { Component } from 'react';
import { CardDeck, Card } from 'react-bootstrap';
import BarChart from './projecttesterbarchart';
import PieChart from './piechartfiles';
import DateTestChart from './splinecharttestreport';
import CostReportChart from './costreportlinechart'
import PieChartTest from './piecharttestresults'

class ProjectAnalytics extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <hr></hr>
        <h1>Project Analytics</h1>
        <CardDeck>
          <Card>
            <Card.Body >
              <BarChart></BarChart>
            </Card.Body>
          </Card>


          <Card>
            <Card.Body>
              <PieChart></PieChart>
            </Card.Body>
          </Card>
        </CardDeck>

        <CardDeck>
          <Card>
            <Card.Body>
              <DateTestChart></DateTestChart>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <CostReportChart></CostReportChart>
            </Card.Body>
          </Card>
        </CardDeck>

        <CardDeck>
          <Card>
            <Card.Body>
              <PieChartTest></PieChartTest>
            </Card.Body>
          </Card>
        </CardDeck>

      </>
    );
  }
}

export default ProjectAnalytics;
