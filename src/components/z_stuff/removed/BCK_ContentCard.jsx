import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { VideoPreview } from "./VideoPreview.jsx";
import dummyThumbnail from "../../img/transparentThumb.png";
//import { EventCatcher } from "../methods/EventCatcher.js";

export const ContentCard = props => {
  //console.log("test1116 single contentCard props", props.singleCardProps);
  const componentName = "ContentCard";


    
  let spinnerStatus = props.singleCardProps.cardStatus.spinner;
  let hoverStatus = props.singleCardProps.cardStatus.hovered;
  let visibleStatus = props.singleCardProps.cardStatus.visible;
  let videoUrl = props.singleCardProps.cardData.url;

  let handlers = props.singleCardProps.cardHandlers;

    //console.log('testzzzz' , props.singleCardProps)
    
  function renderContentCard() {
    let cardBody;
    switch (visibleStatus) {
      case true:
        cardBody = singleCardBody();
        break;
      case false:
        cardBody = null;
    }
    // *** evaluate if card visibility is true or false
    // *** if false return null, if true return cardBody

    return cardBody;
  }

  function singleCardBody() {
    const singleCard = (
      // *** grid css *** //
      <div className="card-body">
        <div
          className="card-wrapper"
          // onMouseEnter={console.log('enter')}
          //onMouseLeave={console.log('leave')}
          //onClick={openVideo}
          onMouseEnter={hoverHandler}
          onMouseLeave={hoverHandler}
          onClick={clickHandler}
        >
          <div className="card-header">{showVideoInfo()}</div>
          <div className="card-content-background">{showBackground()}</div>
          <div className="card-content-overlap1">{showStaticPreview()}</div>
          <div className="card-content-overlap2">{showVideoPreview()}</div>
          <div className="card-content-overlap3">{showSpinner()}</div>

          <div className="card-footer">{showVideoTitle()}</div>
        </div>
      </div>
    );
    return singleCard;
  }

  function showBackground() {
    const background = (
      <img
        src={dummyThumbnail}
        onLoad={loadHandler}
        //onError={""}
      />
    );
    return background;
  }

  function showStaticPreview() {
    const mainThumbnail = (
      <img //enable disable preview
        //src={dummyThumbnail}
        //*** preview disabled
        src={props.singleCardProps.cardData.default_thumb.src}
        onLoad={loadHandler}
        //onError={console.log("error")}
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
      <div>
        <p>{props.singleCardProps.cardData.title}</p>
      </div>
    );
    return videoTitle;
  }

  function showVideoPreview() {
    let previewItem;
    const videoPreview = (
      <VideoPreview
        //className="contentcard-preview-background"
        thumbs={props.singleCardProps.cardData.thumbs}
        default_thumb={props.singleCardProps.cardData.default_thumb.src}
        cardIndex={props.singleCardProps.cardIndex}
        cardStatus={props.singleCardProps.cardStatus}
        previewWhileLoading={props.singleCardProps.cardData.default_thumb.src}
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

  // *** EVENT HANDLERS (onLoad, onMouseEnter onMouleLeave onClick)

  function eventInfoPackager(event) {
    //catch events from click and hover and build single object with all the info
    //
        let action;

    switch (event.type) {
      case "click":
        action = "card-opening-click";
        break;
      case "mouseenter":
        action = "card-hover-in";
        break;
      case "mouseleave":
        action = "card-hover-out";
        break;
    default:
        console.log('bad action argument')
        break;
    }

    let eventInfo = {
      type: event.type,
      timeStamp: event.timeStamp,
      componentName: componentName,
      id: props.singleCardProps.cardData.id,
      cardIndex: props.singleCardProps.cardIndex, //showcase index
      url: props.singleCardProps.cardData.url,
      title: props.singleCardProps.cardData.title,
      action: action
    };

    handlers.eventTracker(eventInfo);
    return;
  }

  function loadHandler() {
    // *** handles images loading, is triggered when image is loaded (onLoad)
    let cardId = props.singleCardProps.cardIndex;
    return new Promise((resolve, reject) => {
      handlers.cardPreviewLoadHandler(cardId);
      const error = false;
      switch (!error) {
        // *** TODO handle reject/timeout
        case true:
          resolve();
          break;
        case false:
          reject();
          break;
        default:
          console.log("loadHandler switch error");
          break;
      }
    });
  }

  function hoverHandler(event) {
    event.preventDefault();
    eventInfoPackager(event);
    //console.log("test1115 rest of the process...");
    //continuing the process
  }

  function clickHandler(event) {
    event.preventDefault();
    eventInfoPackager(event);
    //async
    alert("to redirect unblock in contentCard");
    //openVideo();//***<----!!!!
  }

  function openVideo() {
    window.location.assign(videoUrl);
  }

  return <div>{renderContentCard()}</div>;
};
