
import React from "react";

export default class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testState: "state reached!",
    };
  }

  componentDidMount() {
  }

  render() {
    return (
        <div className="teststyle">
          <h4>Hello Template</h4>
      </div>
    );
  }
}
