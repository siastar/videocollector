import React from "react";


export const TopInfoBox = props => {
  //console.log('test98001 infobox props', props)
  let message;

  let boxProps = props.topInfoBoxProps;
  switch (boxProps.showKeywords) {
    case false:
      message = boxProps.message;
      break;
    case true:
      message = (
        <div className="top-info-box">
          showing results for: <strong>{boxProps.keywords}</strong>
        </div>
      );
      break;
    default:
      message = null;
      break;
  }

  return message;
};
