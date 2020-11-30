import React from "react";
import searchingGif from "../../img/searchingGif.gif";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import TestComponent from "./TestComponent.jsx";

export const PleaseWaitPanel = props => {
  //console.log("test78003 PleaseWaitPanel props", props);
  //switch (true) {
  //props.pleaseWaitProps.show = true
//switch (props.pleaseWaitProps.show) {

    //switch (true) {
   
    switch (props.pleaseWaitPanelProps.showPanel) {
    case true:
      return (
        <div className="wait-panel-body">
          {/* <div>{props.pleaseWaitProps.message}</div> */}
          <div>searching for <strong>{props.pleaseWaitPanelProps.keywords}</strong> videos</div>
          <img alt="searching Gif" src={searchingGif} />
        </div>
      );
      break;
    case false:
      return null;
      break;

    default:
      return null;
  }
};

