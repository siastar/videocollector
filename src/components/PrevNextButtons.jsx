import React from "react";
//import Button from "react-bootstrap/Button";
import { AppIcons } from "./AppIcons.jsx";

export const PrevNextButtons = props => {
  //console.log("test1201 prevNextButtons props.headTo:", props.headTo);
  //console.log("test1201 prevNextButtons props:", props);

  // let styles = {
  //   default: "prev-next-button",
  //   disabled: "prev-next-button"
  // };

  function buttonStatus(buttonType) {
    let disabledStatus;
    //let buttonStyle;
    //let clickHandler;
    switch (buttonType) {
      case "prev":
        if (props.currentSlot > 0) {
          disabledStatus = false;
          //buttonStyle = styles.default;
          //clickHandler = props.clickHandler;
        } else {
          disabledStatus = true;
          //buttonStyle = styles.disabled;
          //clickHandler = console.log;
        }
        break;
      case "next":
        if (props.currentSlot < props.totalSlots - 1) {
          //currentSlot starts from 0
          disabledStatus = false;
          //buttonStyle = styles.default;
          //clickHandler = props.clickHandler;
        } else {
          disabledStatus = true;
          //buttonStyle = styles.disabled;
          //clickHandler = console.log;
        }
        break;
      default:
        console.log("error", buttonType);
        break;
    }
    // let statusData = {
    //   disabledStatus: disabledStatus,
    //     buttonStyle: buttonStyle,
    //     clickHandler: clickHandler
    // };
    return disabledStatus;
  }

  function prevButton() {
    //let args = props.bottomPanelProps.embedArgs;
    //let disabledStatus = true;
    let prevButton;
    let buttonStyle;

      let disabledStatus= buttonStatus('prev')
      //console.log('statusData',statusData)
    // if (props.currentSlot > 0) {
    //   disabledStatus = false;
    //   buttonStyle = styles.default;
    // } else {
    //   disabledStatus = true;
    //   buttonStyle = styles.disabled;
    // }

    // if (disabledStatus == false) {
    prevButton = (
      <button
        //onClick={props.onClickPrev}
        className='prev-next-button' //react-bootstrap
        onClick={props.clickHandler}
        disabled={disabledStatus}
        btn_type={"prev"}
        head_to={props.headTo}
      >
        {/* {AppIcons().leftArrow} */}
        {/* {props.buttonLabel} */}«
      </button>

      // <Button
      //   //onClick={props.onClickPrev}
      //   className="btn btn-info" //react-bootstrap
      //   onClick={props.clickHandler}
      //   disabled={disabledStatus}
      //   btn_type={"prev"}
      //   head_to={props.headTo}
      // >
      //   {/* {AppIcons().leftArrow} */}
      //   {/* {props.buttonLabel} */}«
      // </Button>
    );
    // } else {
    //   prevButton = prevButton; //null to remove disabled button
    // }
    return prevButton;
  }

  function nextButton() {
    //let args = props.bottomPanelProps.embedArgs;
    //let disabledStatus = true;

    let prevButton;
    let buttonStyle;
      let disabledStatus= buttonStatus('next')
      
    // if (props.currentSlot < props.totalSlots - 1) {
    //   //currentSlot starts from 0
    //   disabledStatus = false;
    // } else {
    //   disabledStatus = true;
    // }

    //let button;
    const nextButton = (
      <button
        //onClick={props.onClickNext}
        className="prev-next-button" //react-bootstrap
        onClick={props.clickHandler}
        disabled={disabledStatus}
        btn_type={"next"}
        head_to={props.headTo}
      >
        {/* {AppIcons().rightArrow} */}»{/* {props.buttonLabel} */}
      </button>
      // <Button
      //   //onClick={props.onClickNext}
      //   className="btn btn-info" //react-bootstrap
      //   onClick={props.clickHandler}
      //   disabled={disabledStatus}
      //   btn_type={"next"}
      //   head_to={props.headTo}
      // >
      //   {/* {AppIcons().rightArrow} */}»{/* {props.buttonLabel} */}
      // </Button>
    );

    // switch (disabledStatus) {
    //   case true:
    //     button = nextButton; //null to remove disabled button
    //     break;
    //   case false:
    //     button = nextButton;
    // }

    return nextButton;
  }

  function showButton() {
    let button;

    switch (props.buttonType) {
      case "next-button":
        button = nextButton();
        break;
      case "prev-button":
        button = prevButton();
        break;
      default:
        button = null;
        console.log("error button type default");
        break;
    }
    return button;
  }

  return showButton();
};
