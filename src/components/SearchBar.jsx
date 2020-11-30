import React from "react";
import { AppIcons } from "./AppIcons.jsx";

export const SearchBar = props => {
  //console.log("test987!! searchbar props ; ", props);
  const componentName = "SearchBar";
  const searchBarProps = props.searchBarProps;
  const handlers = props.searchBarProps.handlers;
  let searchKeywords = "";
  let searchIcon = AppIcons().search;
  let xButton = AppIcons().xButton;

  //*** HANDLERS
  function onSubmitQuery(event) {
    event.preventDefault();
    let eventInfo = {
      type: event.type,
      timeStamp: event.timeStamp,
      searchKeywords: searchKeywords, //grab the value from global variable
      action: "search-submit",
      componentName: componentName
    };

    handlers.eventTracker(eventInfo);
    //eventCatcher(eventInfo);
    //console.log('test1112' , event.target)
    handlers.onSearchSubmit(event);
    return;
  }

  function onTypeQuery(event) {
    //handle the typing
    event.preventDefault();
    handlers.onSearchField(event);
    searchKeywords = event.target.value;
  }

  function searchBar() {
    return (
      <form className="searchbar-group">
        <input
          //className='search-input'
          type="text"
          placeholder="Search.."
          onChange={onTypeQuery}
          //name="search"
        />
        <button
          //className="my-search-button"
          type="submit"
          onClick={onSubmitQuery}
        >
          {searchIcon}
        </button>
      </form>
    );
  }

  function desktopSearchBar() {
    return <div className="desktop-searchbar">{searchBar()}</div>;
  }

  function mobileToggleButton() {
    let mobileToggleStyle;
    let buttonIcon;

    //console.log('propszzzz',props)

    switch (props.mobileMenuArgs) {
      case true:
        mobileToggleStyle = "toggle-on";
        buttonIcon = xButton;
        break;
      case false:
        mobileToggleStyle = "toggle-off";
        buttonIcon = searchIcon;
        break;
      default:
        break;
    }

    //console.log('mobileToggleStyle' , mobileToggleStyle)

    return (
      // <div className="mobile-search-toggle">

      <div className="mobile-toggle-button">
        <button
          className={mobileToggleStyle}
          //variant="info" //react-bootstrap
          onClick={event =>
            props.mobileMenuHandler({
              headTo: "search-box"
            })
          }
        >
          {buttonIcon}
        </button>
        {/* <div className="mobile-search-button">{searchIcon}</div> */}
      </div>
    );
  }

  // function mobileToggleButton(){
  //     return (
  //         <label className='toggle-container'>
  //           <input type="checkbox" />
  //           <div className='toggle-button'></div>
  //         </label>
  //     )
  // }

  function mobileSearchBox() {
    let searchBox;
    switch (props.mobileMenuArgs) {
      case true:
        searchBox = (
          //
          <div className="mobile-popup-box">
            <button //x button to close mobile searchbar
              className="mobile-menu-quit"
              //variant="danger"
              onClick={event =>
                props.mobileMenuHandler({
                  //originalEvent: event,
                  headTo: "search-box"
                })
              }
            >
              {xButton}
            </button>
            {/* // TODO change x with proper icon*/}
            <div className="mobile-searchbar">{searchBar()}</div>
          </div>
        );

        break;
      case false:
        searchBox = null;
        break;
      default:
        break;
    }

    return searchBox;
  }

  return (
    <div className="search-container">
      {mobileToggleButton()}
      {mobileSearchBox()}
      {desktopSearchBar()}
    </div>
  );
};
