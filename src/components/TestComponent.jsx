import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testState: "state reached!"
    };
  }

  componentDidMount() {}

  render() {
    return (
      <Row>
        <Col>
          <Jumbotron>
            <h1>Jumbotron 1</h1>
            <Button variant="primary">does nothing</Button>
          </Jumbotron>
        </Col>
        <Col>
          <Jumbotron>
            <h1>Jumbotron 2</h1>
            <Button variant="primary">does nothing</Button>
          </Jumbotron>
        </Col>
        <Col>
          <Jumbotron>
            <h1>Jumbotron 3</h1>
            <Button variant="primary">does nothing</Button>
          </Jumbotron>
        </Col>
                <Col>
          <Jumbotron>
            <h1>Jumbotron 4</h1>
            <Button variant="primary">does nothing</Button>
          </Jumbotron>
        </Col>
      </Row>
    );
  }
}
