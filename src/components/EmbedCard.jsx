import React from "react";
import ReactPlayer from "react-player";

export const EmbedCard = props => {
  //console.log("test33001 props embed", props);

  const componentName = "EmbedCard";
  const handlers = props.singleCardProps.cardHandlers;
  const embedData = props.singleCardProps.embedData;
  const cardIndex = props.singleCardProps.cardIndex;
  const headTo = props.singleCardProps.headTo;

  function showEmbedCard() {
    let singleCard;
    if (embedData.code) {
      singleCard = embedCardBody();
    } else {
      singleCard = null;
    }
    return singleCard;
  }

  function embedCardBody() {
    const embedCard = (
      <div
        className="embed-card"
        onMouseEnter={clickAndHoverHandler}
        onMouseLeave={clickAndHoverHandler}
        //onClick={clickAndHoverHandler}//TODO CAN'T INTERCEPT CLICK ON iFRAME
      >
        <div className="embed-video">
          {/* <iframe src={props.embedData.code} width="300" height="300"></iframe> */}
          {showVideo()}
        </div>

        <div className="embed-title">{showTitle()}</div>
      </div>
    );

    return embedCard;
  }

  function showVideo() {
    return (
        <iframe
          className='embed-frame'
        src={embedData.code}
        //onClick={()=>clickAndHoverHandler()}
        onLoad={imagesLoadHandler}
        //width="300"
        //height="300"
        //
      />
    );
  }

  function showTitle() {
    let title;
    if (embedData.title) {
      title = embedData.title;
    } else {
      title = null;
    }
    return title;
  }

  function clickAndHoverHandler(event) {
    //console.log("embed action");
    let eventInfo = {
      type: event.type,
      timeStamp: event.timeStamp,
      componentName: componentName,
      url: embedData.code,
      service: embedData.service,
      title: embedData.title,
      cardIndex: cardIndex,
      action: ""
    };

    switch (event.type) {
      case "click":
        event.preventDefault();
        eventInfo.action = "embed-click";
        handlers.eventTracker(eventInfo);
        break;
      case "mouseenter":
        event.preventDefault();
        eventInfo.action = "embed-hover-in";
        handlers.eventTracker(eventInfo);
        break;
      case "mouseleave":
        event.preventDefault();
        eventInfo.action = "embed-hover-out";
        handlers.eventTracker(eventInfo);
        break;
    }

    return;
  }

    function testClick(){
        console.log('click frame')
    }
    
  function imagesLoadHandler() {
      //console.log("test56003 load handling", cardIndex, headTo);
    return new Promise((resolve, reject) => {

        const loadEventData = {
        cardIndex: cardIndex,
        headTo: headTo
      };

     //console.log("test56004 load handling", loadEventData);
         
     handlers.previewLoadHandler(loadEventData);

      //handlers.previewLoadHandler(cardIndex);
      const error = false; //TODO catch the error
      switch (!error) {
        // *** TODO handle reject/timeout
        case true:
          resolve(`card ${cardIndex} loaded`);
          break;
        case false:
          reject(`card ${cardIndex} error`);
          break;
        default:
          console.log("imagesLoadHandler switch error");
          break;
      }
    });
  }

  return showEmbedCard();
};
