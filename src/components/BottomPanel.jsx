import React from "react";
//import Button from "react-bootstrap/Button";
import { PrevNextButtons } from "../components/PrevNextButtons.jsx";
//import { EmbedPlayer } from "../components/EmbedPlayer.jsx";
import { EmbedCase } from "../components/EmbedCase.jsx";

export const BottomPanel = props => {
  //console.log("test 7777 bottomPanel props.embedArgs:", props);

  const componentName = "BottomPanel";

  function embedCase() {
    return (
        <EmbedCase embedCaseProps={props.embedCaseProps} />
    );
  }

  return <div className="bottom-panel">{embedCase()}</div>;
};
