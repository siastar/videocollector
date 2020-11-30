import React from "react";


import TestComponent from "./TestComponent.jsx";

export const MidPanel = props => {
  return (
    <div fluid className="midpanel">
      <TestComponent />
      <div
        id="testId"
        className="testdiv"
        /* onMouseOver={this.mOver} */
        /* onMouseOut={this.mOut} */
      >
        ...
      </div>
      <h1>{props.myTest.val}</h1>

      <button onClick={props.randomVal}>random val</button>
    </div>
  );
};
