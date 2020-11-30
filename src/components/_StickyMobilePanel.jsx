import React from "react";
//import TestComponent from "./TestComponent.jsx";

import logoDark from "../../img/logodark.png";
import logoLight from "../../img/logolight.png";

import { SearchBar } from "./SearchBar.jsx";
import { RelatedCategories } from "./RelatedCategories.jsx";

export const StickyMobilePanel = props => {
  //console.log('test 2221 stickyprops_rel cat ',props.relatedCategoriesProps)

  function mobilePanel() {
    const panel = (
     //<Logo>
        <div className="sticky-mobile-panel">
        <div className="logo-mobile-box">
          {" "}
          <img alt="logo" src={logoLight} />
        </div>

        <RelatedCategories
          relatedCategoriesProps={props.relatedCategoriesProps}
        />

        <SearchBar
          /* className="search-bar" */
          searchBarProps={props.searchBarProps}
        ></SearchBar>
      </div>
    );

return panel
      
  }

    return mobilePanel()

};
