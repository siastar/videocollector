import React from "react";
//import TestComponent from "./TestComponent.jsx";

import logoDark from "../../img/logodark.png";
import logoLight from "../../img/logolight.png";

import { SearchBar } from "./SearchBar.jsx";
import { RelatedCategories } from "./RelatedCategories.jsx";

export const StickyPanel = props => {
  //console.log('test 2221 stickyprops_rel cat ',props)

  function stickyPanel() {
    const panel = (
      <div className="sticky-panel">
        <div className="logo-box">
          {" "}
          <img alt="logo" src={logoLight} />
        </div>

        <RelatedCategories
          relatedCategoriesProps={props.relatedCategoriesProps}
          mobileMenuArgs={props.stickyPanelProps.mobileMenuArgs.categories}
          mobileMenuHandler={props.searchBarProps.handlers.mobileMenuHandler}
        />

        <SearchBar
          /* className="search-bar" */
          searchBarProps={props.searchBarProps}
          mobileMenuArgs={props.stickyPanelProps.mobileMenuArgs.searchBar}
          mobileMenuHandler={props.searchBarProps.handlers.mobileMenuHandler}
        ></SearchBar>
      </div>
    );

    return panel;
  }

  return stickyPanel();

};
