import React from "react";
import { VideoCard } from "./VideoCard.jsx";

export const ResultsVideoCase = props => {
  //console.log("test444 resultsVideocase", props);

  const caseData = props.resultsCaseProps.caseData;
  const cardHandlers = props.resultsCaseProps.cardHandlers;
//const headTo = props.resultsCaseProps.headTo
  function showVideoCase() {
    let test;
    let videoCase;

    if (caseData.videosToDisplay) {
      videoCase = resultsVideoCase();
    } else {
      videoCase = null;
    }
    return videoCase;
  }

  function resultsVideoCase() {
    let cards = caseData.videosToDisplay.map(singleCard => {
      let cardIndex = caseData.videosToDisplay.indexOf(singleCard);

      const singleCardProps = {
        headTo: props.resultsCaseProps.headTo,
        cardIndex: cardIndex,
        cardData: caseData.videosToDisplay[cardIndex],
        cardHandlers: props.resultsCaseProps.cardHandlers
      };

      return (

        <VideoCard
          singleCardProps={singleCardProps}
          key={cardIndex}
          //dataSource={"suggestedVideoCase"}
        />
      );
    });
    return cards;
  }

  return (// TODO change className to results
    // <div className="results-case-container">
      <div className="results-case">{showVideoCase()}</div>
    // </div>
  );
};
