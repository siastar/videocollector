import React from "react";
//import Card from "react-bootstrap/Card";
//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { VideoPreview } from "./VideoPreview.jsx";
//import {NumberFormatter} from '../methods/NumberFormatter.js'

//import dummyThumbnail from "../../img/transparentThumb.png";
//import { EventCatcher } from "../methods/EventCatcher.js";

export const VideoCard = props => {
  const componentName = "VideoCard";
  let spinnerStatus = props.singleCardProps.cardData.spinnerStatus;
  let videoUrl = props.singleCardProps.cardData.url;
  //let cardId = props.singleCardProps.cardData.cardId;
  let cardIndex = props.singleCardProps.cardIndex;
  let handlers = props.singleCardProps.cardHandlers;
  //let saveSessionData = props.singleCardProps.saveSessionData;
  let headTo = props.singleCardProps.headTo;
  let vcardHeader = false;
  //console.log('test 31001 vcard views' , props.singleCardProps.cardData.views)

  //console.log(numberFormatter)

  function vcardSwitcher() {
    //change css class
    let itemStyle = {};
    let header;
    switch (headTo) {
      case "search-results":
        itemStyle.cardType = "vcard-body vcard-result";
        itemStyle.header = "vcard-header result-header";
        itemStyle.footer = "vcard-footer result-footer";
        vcardHeader = true;
        break;
      // case "suggested-content":
      //   itemStyle.cardType = "vcard-body vcard-suggested";
      //   itemStyle.header = "vcard-header suggested-header";
      //   itemStyle.footer = "vcard-footer suggested-footer";
      //   break;
      case "most-clicked":
        itemStyle.cardType = "vcard-body vcard-most-clicked";
        //itemStyle.header = "vcard-header most-clicked-header";
        itemStyle.footer = "vcard-footer most-clicked-footer";
        vcardHeader = false;
        break;
      case "most-interesting":
        itemStyle.cardType = "vcard-body vcard-most-interesting";
        //itemStyle.header = "vcard-header most-interesting-header";
        itemStyle.footer = "vcard-footer most-interesting-footer";
        vcardHeader = false;
        break;
      case "most-requested":
        itemStyle.cardType = "vcard-body vcard-most-requested";
        //itemStyle.header = "vcard-header most-requested-header";
        itemStyle.footer = "vcard-footer most-requested-footer";
        vcardHeader = false;
        break;
      default:
        console.log("error in css subStyleSwitcher");
    }
    return itemStyle;
  }

  function showVideoCard() {
    //*** launch component only if data is received
    let videoCard;
    if (props.singleCardProps.cardData) {
      videoCard = singleCardBody();
    } else {
      videoCard = null;
    }
    return videoCard;
  }

  function showVideoInfo() {
    let videoInfo;
    switch (vcardHeader) {
      case true:
        videoInfo = (
          <div className="vcard-info">
            <p>views: {props.singleCardProps.cardData.views}</p>

            <p>rate: {props.singleCardProps.cardData.rate}</p>
          </div>
        );
        break;
      case false:
        videoInfo = null;
        break;
      default:
        break;
    }
    return videoInfo;
  }

  function singleCardBody() {
    //*** setup of single card
    const singleCard = (
      // <div className="video-card">
      <div
        className={vcardSwitcher().cardType}
        //***card-body + card-result || card-suggested
        onMouseEnter={clickAndHoverHandler}
        onMouseLeave={clickAndHoverHandler}
        onClick={clickAndHoverHandler}
      >
        <div className={vcardSwitcher().header}>
          {showVideoInfo()}
          {/* card-header + result-header || suggested-header*/}
        </div>
        <div className="vcard-static-preview">{showStaticPreview()}</div>
        <div className="vcard-video-preview">{showVideoPreview()}</div>
        <div className={vcardSwitcher().footer}>
          {/* card-footer + result-footer || suggested-footer*/}
          <div className="vcard-title-preview">{showVideoTitle()}</div>
          <div className="vcard-full-title">{showFullVideoTitle()}</div>
        </div>
        <div className="vcard-spinner">{showSpinner()}</div>
      </div>
      //     {/* <div className="card-spinner">{test_showSpinner()}</div> */}
      //     </div>
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

  function showVideoTitle() {
    const videoTitle = <p>{props.singleCardProps.cardData.title}</p>;
    return videoTitle;
  }

  function showFullVideoTitle() {
    const fullTitle = (
      // <p /* className="card-full-title" */>
      //   {/* */}
      <p>{props.singleCardProps.cardData.title}</p>
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

    let spinner;
    switch (spinnerStatus) {
      case true:
        spinner = <Spinner animation="border" />;
        break;
      case false:
        //spinner = <Spinner animation="border" />;
        spinner = null;
        break;
      default:
      //console.log("spinner switch");
    }
    return spinner;
  }

  // *** EVENT HANDLERS (onLoad, onMouseEnter onMouleLeave onClick)

  function trackerArgsSetup() {
    //*** handles tracker actions according to the module parent
    let actions = {
      click: "",
      mouseenter: "",
      mouseleave: "",
      default: ""
    };
    //set card according to its parent
    switch (headTo) {
      case "search-results":
        actions.click = "card-click";
        actions.mouseenter = "card-hover-in";
        actions.mouseleave = "card-hover-out";
        actions.default = "default result action error";
        break;
      case "suggested-content":
        actions.click = "suggested-click";
        actions.mouseenter = "suggested-hover-in";
        actions.mouseleave = "suggested-hover-out";
        actions.default = "default suggested action error";
        break;
      case "most-clicked":
        actions.click = "most-clicked-click";
        actions.mouseenter = "most-clicked-hover-in";
        actions.mouseleave = "most-clicked-hover-out";
        actions.default = "default most-clicked action error";
        break;
      case "most-interesting":
        actions.click = "most-interesting-click";
        actions.mouseenter = "most-interesting-hover-in";
        actions.mouseleave = "most-interesting-hover-out";
        actions.default = "default most-interesting action error";
        break;
      case "most-requested":
        actions.click = "most-requested-click";
        actions.mouseenter = "most-requested-hover-in";
        actions.mouseleave = "most-requested-hover-out";
        actions.default = "default most-requested action error";
        break;
      default:
        console.log("unknown action for ", headTo);
        break;
    }

    let trackerArgs = { actions: actions };

    return trackerArgs;
  }

  function clickAndHoverHandler(event) {
    //catch events from click and hover and build single object with all the info
    //needed by eventTracker
    //let action;

    let eventInfo = {
      //action: "",
      eventType: event.type,
      timeStamp: event.timeStamp,
      componentName: componentName,
      index: props.singleCardProps.cardIndex,
      cardIndex: props.singleCardProps.cardIndex, //showcase index
      rank: props.singleCardProps.cardData.rank, //rank in allResults
      url: props.singleCardProps.cardData.url,
      title: props.singleCardProps.cardData.title,
      service: props.singleCardProps.cardData.service,
      videoId: props.singleCardProps.cardData.id,
      videoKeywords: props.singleCardProps.cardData.keywords,
      views: props.singleCardProps.cardData.views,
      rate: props.singleCardProps.cardData.rate
    };

    let trackerArgs = trackerArgsSetup();
    switch (eventInfo.eventType) {
      case "click":
        event.preventDefault();
        eventInfo.action = trackerArgs.actions.click;
        handlers.eventTracker(eventInfo);
        openVideo();
        break;
      case "mouseenter":
        event.preventDefault();
        eventInfo.action = trackerArgs.actions.mouseenter;
        handlers.eventTracker(eventInfo);

        break;
      case "mouseleave":
        event.preventDefault();
        eventInfo.action = trackerArgs.actions.mouseleave;
        handlers.eventTracker(eventInfo);

        break;
      default:
        console.log("trackerArgs", trackerArgs.actions.default);
        break;
    }

    //handlers.eventTracker(eventInfo);

    return;
  }

  function imagesLoadHandler() {
    return new Promise((resolve, reject) => {
      const loadEventData = {
        cardIndex: cardIndex,
        headTo: headTo
      };
      //console.log('test56001 load handling' , loadEventData)
      handlers.previewLoadHandler(loadEventData);

      //handlers.previewLoadHandler(cardIndex);
      const error = false; //TODO catch the error
      switch (!error) {
        // *** TODO handle reject/timeout
        case true:
          resolve(`vcard ${cardIndex} loaded`);
          break;
        case false:
          reject(`vcard ${cardIndex} error`);
          break;
        default:
          console.log("imagesLoadHandler switch error");
          break;
      }
    });
  }

  function openVideo() {
    //console.log("openVideo locked in component:", componentName , 'videoUrl:' , videoUrl);
    //await props.singleCardProps.cardHandlers.saveSessionData()
    console.log("videoUrl", videoUrl);
    //alert("unlock in suggestedCard.jsx");
    window.location.assign(videoUrl); //***<----unblock!!!!
    return;
  }

  return showVideoCard();
};
