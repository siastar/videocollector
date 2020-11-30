import React from "react";
//import Card from "react-bootstrap/Card";
//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { VideoPreview } from "./VideoPreview.jsx";
import dummyThumbnail from "../../img/transparentThumb.png";
//import { EventCatcher } from "../methods/EventCatcher.js";

export const SuggestedCard = props => {
  //console.log("test7770 suggestedCard props", props.singleCardProps);
  const componentName = "SuggestedCard";
  let spinnerStatus = props.singleCardProps.cardData.spinnerStatus;
  let videoUrl = props.singleCardProps.cardData.url;
  //let cardId = props.singleCardProps.cardData.cardId;
    let cardIndex=props.singleCardProps.cardIndex;
    //console.log('cardIndexxx' , cardIndex)
    let handlers = props.singleCardProps.cardHandlers;
  let saveSessionData = props.singleCardProps.saveSessionData;

  function renderContentCard() {
    //*** launch component only if data is received
    let suggestedCard;

    if (props.singleCardProps.cardData) {
      suggestedCard = singleCardBody();
    } else {
      suggestedCard = null;
    }

    return suggestedCard;
  }

  function singleCardBody() {
    //*** setup of single card
    const singleCard = (
      <div className="suggested-card">
        <div
          className="card-box"
          onMouseEnter={clickAndHoverHandler}
          onMouseLeave={clickAndHoverHandler}
          onClick={clickAndHoverHandler}
        >
          <div className="card-header">{showVideoInfo()}</div>
          <div className="card-static-preview">{showStaticPreview()}</div>
          <div className="card-video-preview">{showVideoPreview()}</div>
          <div className="card-footer">
            {showVideoTitle()}
            {/* {showFullVideoTitle()} */}
          </div>
        </div>
        <div className="card-spinner">{showSpinner()}</div>
        {/* <div className="card-spinner">{test_showSpinner()}</div> */}
      </div>
    );

    return singleCard;
  }

  function showStaticPreview() {
    const mainThumbnail = (
      <img //enable disable preview
        //src={dummyThumbnail}
        //*** preview disabled
        src={props.singleCardProps.cardData.default_thumb.src}
        onLoad={imagesLoadHandler}
      />
    );
    return mainThumbnail;
  }

  function showVideoInfo() {
    const videoInfo = (
      <div>
        <p className="float-left card-text">
          views: {props.singleCardProps.cardData.views}
        </p>
        <p className="float-right card-text">
          rate: {props.singleCardProps.cardData.rate}
        </p>
      </div>
    );
    return videoInfo;
  }

  function showVideoTitle() {
    const videoTitle = (
      <p className="card-title-preview">
        {props.singleCardProps.cardData.title}
      </p>
    );
    return videoTitle;
  }

  function showFullVideoTitle() {
    const fullTitle = (
      <p className="card-full-title">{props.singleCardProps.cardData.title}</p>
    );
    return fullTitle;
  }

  function showVideoPreview() {
    let previewItem;
    const videoPreview = (
      <VideoPreview
        //className="contentcard-preview-background"
        thumbs={props.singleCardProps.cardData.thumbs}
        default_thumb={props.singleCardProps.cardData.default_thumb.src}
        //cardIndex={props.singleCardProps.cardIndex}
        //cardStatus={props.singleCardProps.cardStatus}
        //previewWhileLoading={props.singleCardProps.cardData.default_thumb.src}
      />
    );

    return videoPreview;
  }

  function showSpinner() {
    // *** returns actual spinner or null
    const spinner = <Spinner animation="border" />;

    let spinnerShow;
    switch (spinnerStatus) {
      case true:
        spinnerShow = spinner;

        //console.log("running spinner");
        break;
      case false:
        spinnerShow = null;
        break;
      default:
      //console.log("spinner switch");
    }
    return spinnerShow;
  }

  function test_showSpinner() {
    const spinner = <Spinner animation="border" />;
    return spinner;
  }

  // *** EVENT HANDLERS (onLoad, onMouseEnter onMouleLeave onClick)

  function clickAndHoverHandler(event) {
    //catch events from click and hover and build single object with all the info
    //needed by eventTracker
    //let action;

    let eventInfo = {
      type: event.type,
      timeStamp: event.timeStamp,
      componentName: componentName,
      id: props.singleCardProps.cardIndex,
      cardIndex: props.singleCardProps.cardIndex, //showcase index
      rank: props.singleCardProps.cardData.rank, //rank in allResults
      url: props.singleCardProps.cardData.url,
      title: props.singleCardProps.cardData.title,
      service: props.singleCardProps.cardData.service,
      action: ""
    };

    switch (event.type) {
      case "click":
        if (eventInfo.id) {
          event.preventDefault();
          eventInfo.action = "suggested-click";
          handlers.eventTracker(eventInfo);
          saveSessionData();
          openVideo();
        } else {
          console.log("default result click");
        }
        break;

      case "mouseenter":
        event.preventDefault();
        eventInfo.action = "suggested-hover-in";
        handlers.eventTracker(eventInfo);

        break;
      case "mouseleave":
        event.preventDefault();
        eventInfo.action = "suggested-hover-out";
        handlers.eventTracker(eventInfo);

        break;
      default:
        console.log("bad action argument");
        break;
    }

    //handlers.eventTracker(eventInfo);

    return;
  }

  function imagesLoadHandler() {
    // *** handles images loading, is triggered when image is loaded (onLoad)
    //console.log('test55551 handlers' , handlers)
    //console.log("test5501 loaded", cardIndex);
    return new Promise((resolve, reject) => {
      handlers.previewLoadHandler(cardIndex);
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

  function openVideo() {
    console.log("video locked in component", componentName);
    alert("unlock in suggestedCard.jsx");
    //window.location.assign(videoUrl); //***<----unblock!!!!
    return;
  }

  return renderContentCard();
};
