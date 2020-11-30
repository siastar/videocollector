// // // // // // // // // // // // //
// // //      SEARCH TYPE SELECTORS
// // // // // // // // // // // // //
//generate type selectors for any type defined in main app's state

import React from "react";
import ToggleButton from "react-bootstrap/ToggleButton";

export const TypeSelectors = props => {
  const searchBarProps = props.searchBarProps;

  const searchTypes = Object.values(searchBarProps.types);
  // // *** returns array of object values ["video" , "pics" , "webcam" , "etc etc"]
  const selectors = searchTypes.map(searchType => {
    let selected;
    let buttonStyle;
    if (searchType == searchBarProps.currentType) {
      selected = true;
      buttonStyle = "dark"; //bootstrap
    } else {
      selected = false;
      buttonStyle = "warning"; //bootstrap
    }
    //console.log("return typeSelectors");
      return (
          
      <ToggleButton
        //className="searchtypeselectors"
        variant={buttonStyle}
        //size="sm"
        key={searchTypes.indexOf(searchType)}
        type="radio"
        name="radio"
        value={searchType}
        onChange={searchBarProps.handlers.onSearchSetType}
        defaultChecked={selected}
      >
        {searchType}
      </ToggleButton>
    );
  });
    
  return selectors;
};
