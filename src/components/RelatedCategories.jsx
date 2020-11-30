import React from "react";
//import Button from "react-bootstrap/Button";
//import DropdownButton from "react-bootstrap/DropdownButton";
//import Dropdown from "react-bootstrap/Dropdown";

import { AppIcons } from "./AppIcons.jsx";
//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";
//import TestComponent from "./TestComponent.jsx";

export const RelatedCategories = props => {
  //console.log("test2223 rc props", props);
  const componentName = "RelatedCategories";
  let categories = props.relatedCategoriesProps.categories;
  //console.log('test456' , categories)
  let handlers = props.relatedCategoriesProps.handlers;
  //let categorySearchHandler = props.relatedCategoriesProps.handlers.onSearchRelatedCategories;
  let eventTracker = props.relatedCategoriesProps.handlers.evenTracker;
  let keywords = ""; // stores keywords when item list is clicked
  const threeLinesButton = AppIcons().threeLinesMenu;
  const xButton = AppIcons().xButton;

  function showDropMenus() {
    //initiate drop menus button only if categories exist
    let dropMenus;

    switch (true) {
      case categories.length == 0:
        dropMenus = null;
        break;

      case categories.length > 0:
        dropMenus = dropMenusGenerator();
        break;

      default:
        break;
    }

    return dropMenus;
  }

  function mobileToggleButton() {
    let mobileToggleStyle;
    let buttonIcon;

    //console.log('propszzzz',props)

    switch (props.mobileMenuArgs) {
      case true:
        mobileToggleStyle = "toggle-on";
        //buttonIcon = xButton;
        break;
      case false:
        mobileToggleStyle = "toggle-off";
        //buttonIcon = threeLinesButton;
        break;
      default:
        break;
    }

    return (
      <div className="mobile-toggle-button">
        <button //
          className={mobileToggleStyle}
          //variant="info"
          onClick={event =>
            props.mobileMenuHandler({
              headTo: "categories-box"
            })
          }
        >
          {threeLinesButton}
        </button>
      </div>
    );
  }

  function desktopCategoriesBox() {
    return <div className="desktop-categories-box">{showDropMenus()}</div>;
  }

  function mobileCategoriesBox() {
    //state controlled css class
    let categoriesBox;
    switch (props.mobileMenuArgs) {
      case true:
        categoriesBox = (
          <div className="mobile-popup-box">
            <button //x button to close mobile searchbar
              className="mobile-menu-quit"
              //variant="danger"
              onClick={event =>
                props.mobileMenuHandler({
                  //originalEvent: event,
                  headTo: "categories-box"
                })
              }
            >
              {xButton}
            </button>
            {showDropMenus()}
          </div>
        );
        break;
      case false:
        categoriesBox = null;
        break;
      default:
        break;
    }
    return categoriesBox;
  }

  //*** dynamically generate dropdown menus according to the incoming categories
  function dropMenusGenerator() {
    //create dropdown menu with categories

    let dropMenus = categories.map(categoryPad => {
      return (
        <div
          className="dropper-knob"
          key={categories.indexOf(categoryPad)}
          onMouseEnter={event => {
            onDropDownHover({
              //pack event info
              //original: event,
              type: event.type,
              category: categoryPad.displayName,
              componentName: componentName,
              timeStamp: event.timeStamp,
              action: ""
            });
          }}
          onMouseLeave={event => {
            onDropDownHover({
              //pack event info
              //original: event,
              type: event.type,
              category: categoryPad.displayName,
              componentName: componentName,
              timeStamp: event.timeStamp,
              action: ""
            });
          }}
        >
          {/* <div className="three-lines-menu"> */}
          {/*   {/\* hamburger icon shows only on mobile *\/} */}
          {/*   {/\* {AppIcons().threeLinesMenu} *\/} */}
          {/* </div> */}

          <div className="dropper-title">
            {categoryPad.displayName /*category label*/}
          </div>

          <div className="dropper-list">
            <ul>{listGenerator(categoryPad.data)}</ul>
          </div>
        </div>
      );
    });

    return <div className="droppers-box">{dropMenus}</div>;
  }

  //*** generate content description for each generated dropdown,

  function listGenerator(items) {
    //create list of links for existing categories
    const itemList = items.map(item => {
      let itemKeywords = items[items.indexOf(item)].value; //category search keywords

      return (
        <li
          key={items.indexOf(item)}
          onClick={event => {
            handlers.eventTracker({
              //***pack event info
              //original: event,
              type: event.type,
              keywords: itemKeywords,
              action: "category-click",
              componentName: componentName,
              timeStamp: event.timeStamp
            });
            handlers.onSearchRelatedCategories(itemKeywords);
          }}
        >
          {item.description /* category content */}
        </li>
      );
    });

    return itemList;
  }

  //*** EVENT HANDLERS AND TRACKER

  function onDropDownHover(eventInfo) {
    //console.log("test5555+ eventInfo", eventInfo.original.type);
    let action;

    switch (eventInfo.type) {
      case "mouseenter":
        //TODO ONE CUSTOM ACTION-> categoyr-hover
        action = "category-dropdown-hover-in";
        break;
      case "mouseleave":
        action = "category-dropdown-hover-out";
        break;
      default:
        console.log("bad action argument");
        break;
    }

    eventInfo.action = action;

    handlers.eventTracker(eventInfo);
    return;
  }

  function onCategoryClick(eventInfo) {
    //eventInfo.action = "search-by-category";
    handlers.eventTracker(eventInfo);
    handlers.onSearchRelatedCategories(eventInfo.keywords);
    //console.log("test5555 action: ", eventInfo.action,' keywords: ', eventInfo.keywords);

    return;
  }

  //return showDropMenus();
  return (
    <div className="categories-container">
      {mobileToggleButton()}
      {mobileCategoriesBox()}
      {desktopCategoriesBox()}
    </div>
  );
};
