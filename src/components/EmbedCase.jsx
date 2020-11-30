import React from "react";
import ReactPlayer from "react-player";
import { PrevNextButtons } from "./PrevNextButtons.jsx";
import { EmbedCard } from "./EmbedCard.jsx";

//import { EmbedPlayer } from "../components/EmbedPlayer.jsx";

export const EmbedCase = props => {
  //console.log("test77001 embedCase props: ", props);

  //let videoList = props.embedCaseProps.videoToDisplay;
  //console.log('test6667 videoList' , videoList)

  const caseData = props.embedCaseProps.caseData;
  const cardHandlers = props.embedCaseProps.cardHandlers;
  //const videos = props.embedCaseProps.caseData.videosToDisplay;
  const headTo = props.embedCaseProps.headTo;
  //console.log('test44001 headTo' , headTo)

  function showEmbedCase() {
    let videoCase;
    if (caseData.videosToDisplay) {
      videoCase = embedVideoCase();
    } else {
      videoCase = null;
    }
    return videoCase;
  }

  // function showPrevNextButtons() {
  //   let buttons;
  //   if (caseData) {
  //     buttons = prevNextButtons();
  //   } else {
  //     buttons = null;
  //   }
  //   return buttons;
  // }

  function embedVideoCase() {
    let cards = caseData.videosToDisplay.map(video => {
      let cardIndex = caseData.videosToDisplay.indexOf(video);
      const singleCardProps = {
        headTo: headTo,
        cardIndex: cardIndex,
        cardHandlers: cardHandlers,
        embedData: video
      };

      return (
        <EmbedCard
          singleCardProps={singleCardProps}
          embedData={video}
          cardHandlers={cardHandlers}
          key={cardIndex}
        />
      );
    });
    return cards;
  }

  // function prevNextButtons() {
  //   //console.log('test1200 sv_caseData' , caseData)
  //   const buttons = (
  //     <PrevNextButtons
  //       currentSlot={caseData.currentSlot}
  //       totalSlots={caseData.totalSlots}
  //       clickHandler={cardHandlers.onPrevNext}
  //       headTo={headTo}
  //     />
  //   );
  //   return buttons;
  // }

  function prevButton() {
    let button;

    if (caseData.videosToDisplay.length > 0) {
      button = (
        <PrevNextButtons
          buttonType="prev-button"
          buttonLabel="previous"
          currentSlot={caseData.currentSlot}
          totalSlots={caseData.totalSlots}
          clickHandler={cardHandlers.onPrevNext}
          //trackerHandler={cardHandlers.eventTracker}
          headTo={headTo}
        />
      );
    } else {
      button = null;
    }
    return button;
  }

  function nextButton() {
    let button;
    if (caseData.videosToDisplay.length > 0) {
      button = (
        <PrevNextButtons
          buttonType="next-button"
          buttonLabel="next"
          currentSlot={caseData.currentSlot}
          totalSlots={caseData.totalSlots}
          clickHandler={cardHandlers.onPrevNext}
          //trackerHandler={cardHandlers.eventTracker}
          headTo={headTo}
        />
      );
    } else {
      button = null;
    }
    return button;
  }

  return (
    <div className="embed-box">
      {/* <div className="prev-next-buttons">{showPrevNextButtons()}</div> */}
      {prevButton()}
      <div className="embed-case"> {showEmbedCase()}</div>
      {nextButton()}
    </div>
  );
};
