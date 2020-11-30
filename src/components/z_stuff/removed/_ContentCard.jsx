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
  let saveSessionData = props.singleCardProps.saveSessionData;

  let headTo = props.headTo;
  //let cssClass;
  //console.log("contentCardProps", props.singleCardProps);
  //console.log("card dataSource", props.dataSource);

  //   function trackerSwitcher(){
  //   //handles props coming from different components    
    
  // switch (headTo) {
  //   case "results-showcase":
  //     //cssClass = "";
  //     break;
  //   case "suggested-case":
  //     //cssClass = "";
  //     break;
  //   default:
  //     console.log("trackerSwitcher default");
  //     break;
  // }

  //   }
    
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
      <div className="content-card">
        <div
          className="card-box"
          // onMouseEnter={console!.log('enter')}
          //onMouseLeave={console.log('leave')}
          //onClick={openVideo}
          onMouseEnter={clickAndHoverHandler}
          onMouseLeave={clickAndHoverHandler}
          onClick={clickAndHoverHandler}
        >
          <div className="card-header">{showVideoInfo()}</div>
          {/* grid overlap */}
          {/* <div className="card-preview"> */}
          {/* </div> */}
          {/* <div className="card-content-background">{showBackground()}</div> */}
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

  function showBackground() {
    const background = (
      <img
        src={dummyThumbnail}
        onLoad={imagesLoadHandler}
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
        /* src={props.singleCardProps.cardData.thumbs[0].src} */
        onLoad={imagesLoadHandler}
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
      id: props.singleCardProps.cardData.id,
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
          eventInfo.action = "card-click";
          handlers.eventTracker(eventInfo);
          saveSessionData();
          openVideo();
        } else {
          console.log("default result click");
        }
        break;

      case "mouseenter":
        event.preventDefault();
        eventInfo.action = "card-hover-in";
        handlers.eventTracker(eventInfo);

        break;
      case "mouseleave":
        event.preventDefault();
        eventInfo.action = "card-hover-out";
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
          console.log("imagesLoadHandler switch error");
          break;
      }
    });
  }

  function openVideo() {
    console.log("video locked in component", componentName);
    alert("unlock in contentCard.jsx");
    //window.location.assign(videoUrl); //***<----unblock!!!!
    return;
  }

  return renderContentCard();
};
