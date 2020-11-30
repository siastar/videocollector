import React from "react";
import TestAdsData from "../methods/TestAdsData.js";

import { AdsCarousel } from "./AdsCarousel.jsx";
//import { SuggestedVideoCase } from "./SuggestedVideoCase.jsx";
import { SideContentVideoBox } from "./SideContentVideoBox.jsx";

export const SidePanel = props => {
  //console.log("sidePanel props", props);

  // function suggestedCase() {
  //   return <SuggestedVideoCase suggestedCaseProps={props.suggestedCaseProps} />;
  // }

  function mostClickedCase() {
    return <SideContentVideoBox sideCaseProps={props.mostClickedProps} />;
  }

  function mostInterestingCase() {
    return (
      <SideContentVideoBox sideCaseProps={props.mostInterestingProps} />
    );
  }

  function mostRequestedCase() {
    return (
      <SideContentVideoBox sideCaseProps={props.mostRequestedProps} />
    );
  }

  function adsBox() {
    let adsData = props.sidePanelProps.adsData;
    //not showed at the moment
    let ads = adsData.map(singleCarousel => {
      let carouselIndex = adsData.indexOf(singleCarousel);

      const carouselProps = {
        carouselIndex: carouselIndex,
        carouselData: adsData[carouselIndex]
      };

      return (
        <AdsCarousel
          carouselData={carouselProps.carouselData}
          key={carouselIndex}
        />
      );
    });
    return ads;
  }

  return (
    <div className="sidepanel">
      {/* {suggestedCase()} */}
      {mostClickedCase()}
      {mostInterestingCase()}
      {mostRequestedCase()}
    </div>
  );
};
