import React from "react";
import Carousel from "react-bootstrap/Carousel";
//import { ContentCard } from "./ContentCard.jsx";
//import { SuggestedCard } from "./SuggestedCard.jsx";
import { VideoCard } from "./VideoCard.jsx";

import { PrevNextButtons } from "./PrevNextButtons.jsx";
export const SuggestedVideoCase = props => {
  //console.log("test444 suggestedVideocase", props);

  const caseData = props.suggestedCaseProps.caseData;
  const cardHandlers = props.suggestedCaseProps.cardHandlers;
  const headTo = props.suggestedCaseProps.headTo;

  function suggestedCase() {
    let cards = caseData.videosToDisplay.map(singleCard => {
      let cardIndex = caseData.videosToDisplay.indexOf(singleCard);

      const singleCardProps = {
        headTo: props.suggestedCaseProps.headTo,
        cardIndex: cardIndex,
        cardData: caseData.videosToDisplay[cardIndex],
        cardHandlers: props.suggestedCaseProps.cardHandlers
      };

      return <VideoCard singleCardProps={singleCardProps} key={cardIndex} />;
    });

    return <div className="suggested-case">{cards}</div>;
  }

  function prevNextButtons() {
    //console.log('test1200 sv_caseData' , caseData)
    const buttons = (
      <PrevNextButtons
        //buttonType="prev"
        currentSlot={caseData.currentSlot}
        totalSlots={caseData.totalSlots}
        clickHandler={cardHandlers.onPrevNext}
        trackerHandler={cardHandlers.eventTracker}
        headTo={headTo}
      />
    );
    return buttons;
  }

  function mainTitle() {
    let mainTitle = "Puttyrubbers choices";
    return <div className="suggested-main-title">{mainTitle}</div>;
  }


    function prevButton(){
        const button = (
      <PrevNextButtons
        buttonType="prev-button"
        buttonLabel='previous'
        currentSlot={caseData.currentSlot}
        totalSlots={caseData.totalSlots}
        clickHandler={cardHandlers.onPrevNext}
        trackerHandler={cardHandlers.eventTracker}
        headTo={headTo}
      />            
        )
        return button;
    }
    
    function nextButton(){
        const button = (
      <PrevNextButtons
        buttonType="next-button"
        buttonLabel='next'
        currentSlot={caseData.currentSlot}
        totalSlots={caseData.totalSlots}
        clickHandler={cardHandlers.onPrevNext}
        trackerHandler={cardHandlers.eventTracker}
        headTo={headTo}
      />            
        )
        return button;
    }
    
  function showSuggestedPanel() {
    let suggestedPanel;
      //console.log('caseData vtd' , headTo, caseData)
      if (caseData.videosToDisplay.length > 0) {

       suggestedPanel = (
           <div className="suggested-box">
             {mainTitle()}
             {prevButton()}
             {suggestedCase()}
             {nextButton()}
        </div>
      );
    } else {
      suggestedPanel = null;
    }
    return suggestedPanel;
  }

  return showSuggestedPanel()
};
