// // // // // // // // // // // // //
// // //      PAGINATION
// // // // // // // // // // // // //

import React from "react";
import Pagination from "react-bootstrap/Pagination";

export const PaginationBrowser = props => {
  //console.log("test555 pagination props", props);
  const componentName = "PaginationBrowser";

  //alert('test')

  const paginationProps = props.paginationProps;
  let handlers = props.paginationProps.handlers;
  //let active = props.paginationProps.paginationArgs.currentPage;

    let args = props.paginationProps.paginationArgs;
  let slots = props.paginationProps.paginationArgs.numberOfPageSlots;

  //console.log("test555 args.resultsPerPage", args.resultsPerPage);
  //console.log("test555 args.totalNumberOfResults", args.totalNumberOfResults);

  function pageButtonsList() {
    let list;

    switch (true) {
      case args.resultsPerPage < args.totalNumberOfResults:
        list = buildPageList();
        break;
      case args.totalNumberOfResults == 0:
        list = null;
        break;
      default:
        list = null;
        break;
      //default:
    }

    return list;
  }

  function buildPageList() {
    let pageButtons = [];
    let pagesListStart = args.pagesListStart;
    let pagesListEnd = args.pagesListStart + args.pagesToList;
    let active = args.currentPage;
    let disabled = args.currentPage

      
    if (pagesListEnd > args.totalNumberOfPages) {
      pagesListEnd = args.totalNumberOfPages + 1;
      }
      
    for (
      let numberToShow = pagesListStart;
      numberToShow < pagesListEnd;
      numberToShow++
    ) {
        //console.log('test93001 args' , args)
      pageButtons.push(
        <Pagination.Item
          key={numberToShow}
          value={numberToShow} // *** page number -> event.target.text
          active={numberToShow === active} // set the current page button style
          disabled={numberToShow === disabled} //disable current page buttons (cannot eb clicked)
          onClick={event => {
            handlers.eventTracker({
              //track event
              //type_: event.type,
              page: numberToShow,
              componentName: componentName,
              action: "change-page-paginator",
              timeStamp: event.timeStamp
            });
            //follow up event after tracking
            handlers.onNavigatePagination({
              original: event,
              pageNumber: numberToShow
            });
          }}
        >
          {numberToShow}
        </Pagination.Item>
      );
    }
    return pageButtons;
  }

  function goToPreviousPagesButton() {
    let previous = null;
    //console.log("test81", args);
    switch (true) {
      case args.currentPage > args.pagesToList:
        previous = (
          <Pagination.Prev
            //onClick={searchBarProps.handlers.onSkipPagination}
            //onClick={handlers.onSkipToPreviousSlot}
            onClick={event => {
              handlers.eventTracker({
                //track event
                type: event.type,
                //page: numberToShow,
                componentName: componentName,
                action: "previous-slot-paginator"
              });
              //follow up event after tracking
              //handlers.onSkipToPreviousSlot(event);
              handlers.onSkipPaginator({ action: "previous-slot-paginator" });
            }}
          />
        )
        break;

      case args.resultsPerPage >= args.totalNumberOfResults:
        //console.log("test555 less results");
        previous = null;
        break;

      default:
        previous = null;
        break;
    }
    return previous;
  }

  function goToNextPagesButton() {
    let next;
    switch (true) {
      case args.currentPagesSlot < args.numberOfPageSlots:
        next = (
          <Pagination.Next
            //  onClick={handlers.onSkipToNextSlot}
            onClick={event => {
              handlers.eventTracker({
                //track event
                type: event.type,
                //page: numberToShow,
                componentName: componentName,
                action: "next-slot-paginator"
              });
              //follow up event after tracking
              //handlers.onSkipToNextSlot();
              handlers.onSkipPaginator({
                action: "next-slot-paginator"
              });
            }}
          />
        );
        break;
      case args.currentPagesSlot == args.numberOfPageSlots:
        next = null;
        break;
      default:
        next = null;
        break;
    }
    return next;
  }

  function goToFirstPageButton() {
    let firstButton = null;

    function click(event) {}

    switch (true) {
      case args.pagesListStart > 2 * args.pagesToList:
        firstButton = (
          <Pagination.First
            //onClick={handlers.onReturnToFirstPage}
            onClick={event => {
              handlers.eventTracker({
                //track event
                type: event.type,
                //page: numberToShow,
                componentName: componentName,
                action: "first-page-paginator"
              });
              //follow up event after tracking
              handlers.onReturnToFirstPage(event);
            }}
          />
        );
        break;
      default:
        firstButton = null;
        break;
    }
    return firstButton;
  }

    function showPaginator() {

//show paginator ONLY IF the number of results is greater than 0
        
    let paginator;
    if (args.totalNumberOfResults > 0) {
      paginator = (
        <Pagination size="sm">
          {goToFirstPageButton()}
          {goToPreviousPagesButton()}
          {pageButtonsList()}
          {goToNextPagesButton()}
        </Pagination>
      );
    } else {
      paginator = null;
    }

    return paginator;
  }

  return showPaginator();
  
  // <Pagination size="sm">
  //   {goToFirstPageButton()}
  //   {goToPreviousPagesButton()}
  //   {pageButtonsList()}
  //   {goToNextPagesButton()}
  // </Pagination>
};
