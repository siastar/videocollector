import React from "react";
import Carousel from "react-bootstrap/Carousel";
//import { ContentCard } from "./ContentCard.jsx";
//import { SuggestedCard } from "./SuggestedCard.jsx";
import { VideoCard } from "./VideoCard.jsx";
import { PrevNextButtons } from "./PrevNextButtons.jsx";
import { AppIcons } from "./AppIcons.jsx";

export const SideContentVideoBox = props => {
  //console.log("test444 sideContentCase", props);

  const caseData = props.sideCaseProps.caseData;
  const cardHandlers = props.sideCaseProps.cardHandlers;
  const headTo = props.sideCaseProps.headTo;

  let title;
  let caseStyle;
  let boxStyle;

  switch (headTo) {
    case "most-clicked":
      title = "Most Clicked";
      caseStyle = "side-case most-clicked-case";
      boxStyle = "side-box most-clicked-box";

      break;
    case "most-interesting":
      title = "Most Interesting";
      caseStyle = "side-case most-interesting-case";
      boxStyle = "side-box most-interesting-box";

      break;
    case "most-requested":
      title = "Most Requested";
      caseStyle = "side-case most-requested-case";
      boxStyle = "side-box most-requested-box";

    default:
      //console.log()
      break;
  }

  function videoCase() {
    let cards = caseData.videosToDisplay.map(singleCard => {
      let cardIndex = caseData.videosToDisplay.indexOf(singleCard);

      const singleCardProps = {
        headTo: props.sideCaseProps.headTo,
        cardIndex: cardIndex,
        cardData: caseData.videosToDisplay[cardIndex],
        cardHandlers: props.sideCaseProps.cardHandlers
      };

      return <VideoCard singleCardProps={singleCardProps} key={cardIndex} />;
    });

    return <div className={caseStyle}>{cards}</div>;
  }

  function videoCaseTitle() {
    return <div className="sidebox-main-title">{title}</div>;
  }

  function prevButton() {
    const button = (
      <PrevNextButtons
        buttonType="prev-button"
        buttonLabel="previous" /* {AppIcons().leftArrow} */
        currentSlot={caseData.currentSlot}
        totalSlots={caseData.totalSlots}
        clickHandler={cardHandlers.onPrevNext}
        trackerHandler={cardHandlers.eventTracker}
        headTo={headTo}
      />
    );
    return button;
  }

  function nextButton() {
    const button = (
      <PrevNextButtons
        buttonType="next-button"
        buttonLabel="next" /* {AppIcons().rightArrow} */
        currentSlot={caseData.currentSlot}
        totalSlots={caseData.totalSlots}
        clickHandler={cardHandlers.onPrevNext}
        trackerHandler={cardHandlers.eventTracker}
        headTo={headTo}
      />
    );
    return button;
  }

  function showSideCase() {
    let sideCase;
    //console.log('caseData vtd' , headTo, caseData)
    if (caseData && caseData.videosToDisplay.length > 0) {
      sideCase = (
          <div className={boxStyle}>
          <div className="sidebox-banner">test</div>
          <div className='sidebox-header'>
            {prevButton()}
            {videoCaseTitle()}
            {nextButton()}
          </div>
          {videoCase()}
        </div>
      );
    } else {
      sideCase = null;
    }
    return sideCase;
  }

  return showSideCase();
};
