//eventInfo are the incoming props, renamed jsut for convenience

export const EventSwitcher = eventInfo => {
  let timeLimit = 2500; //hovering events will be recorded only if longer than 2500 milliseconds
  let storage = window.sessionStorage;

  switch (eventInfo.action) {
    // *** MAIN PANEL RESULTS
    case "card-click":
      console.log("test95000 actions tracker, action: ", eventInfo.action);
      eventInfo = leavePageClickTracker(eventInfo);
      break;
    case "card-hover-in":
      //console.log('test95000 actions tracker, action: ',eventInfo.action)
      eventInfo.timeStampSetter(eventInfo.timeStamp);
      eventInfo = {};
      break;
    case "card-hover-out":
      eventInfo.action = "card-hover";
      eventInfo = hoverTracker(eventInfo);
      break;

    // *** SIDE RESULTS
    //***most-clicked
    case "most-clicked-click":
      eventInfo = leavePageClickTracker(eventInfo);

      break;
    case "most-clicked-hover-in":
      eventInfo.timeStampSetter(eventInfo.timeStamp);
      eventInfo = {};
      break;
    case "most-clicked-hover-out":
      eventInfo.action = "most-clicked-hover";
      eventInfo = hoverTracker(eventInfo);
      break;

    //***most-requested
    case "most-requested-click":
      eventInfo = leavePageClickTracker(eventInfo);
      break;
    case "most-requested-hover-in":
      eventInfo.timeStampSetter(eventInfo.timeStamp);
      eventInfo = {};
      break;
    case "most-requested-hover-out":
      eventInfo.action = "most-requested-hover";
      eventInfo = hoverTracker(eventInfo);
      break;

    //***most-interesting
    case "most-interesting-click":
      eventInfo = leavePageClickTracker(eventInfo);
      break;
    case "most-interesting-hover-in":
      eventInfo.timeStampSetter(eventInfo.timeStamp);
      eventInfo = {};
      break;
    case "most-interesting-hover-out":
      eventInfo.action = "most-interesting-hover";
      eventInfo = hoverTracker(eventInfo);
      break;

    //***embedded
    case "embed-click":
      console.log("embed click");
      eventInfo = inPageClickTracker(eventInfo);
      break;
    case "embed-hover-in":
      eventInfo.timeStampSetter(eventInfo.timeStamp);
      eventInfo = {};
      break;
    case "embed-hover-out":
      eventInfo.action = "embedded-hover";
      eventInfo = hoverTracker(eventInfo);
      break;

    //*** track categories actions
    case "category-click":
      //console.log('test95000 actions tracker, action: ',eventInfo.action)
      eventInfo = inPageClickTracker(eventInfo);
      break;

    case "category-dropdown-hover-in":
      //console.log('test95000 actions tracker, action: ',eventInfo.action)
      eventInfo.timeStampSetter(eventInfo.timeStamp);
      eventInfo = {};
      break;

    case "category-dropdown-hover-out":
      //console.log('test95000 actions tracker, action: ',eventInfo.action)
      eventInfo.action = "category-hover";
      eventInfo = hoverTracker(eventInfo);
      break;

    //*** paginator
    case "change-page-paginator":
      //console.log('test95000 actions tracker, action: ',eventInfo.action);
      break;
    case "previous-slot-paginator":
      //console.log('test95000 actions tracker, action: ',eventInfo.action);
      break;
    case "next-slot-paginator":
      //console.lo!g('test95000 actions tracker, action: ',eventInfo.action);
      break;
    case "first-page-paginator":
      //console.log('test95000 actions tracker, action: ',eventInfo.action);
      break;

    //***search
    case "search-submit":
      //console.log('test95000 actions tracker, action: ',eventInfo.action);
      break;

     default:
      console.log("bad argument event action:", eventInfo.action);
      break;
  }

  function paginatorTracker() {
    let timeStamp;
  }

  function leavePageClickTracker(eventInfo) {
    // *** tracks click on page unload
    // *** TODO (need specific server handling - Marco)
    console.log("eventInfo", eventInfo);

    return eventInfo;
  }

  function inPageClickTracker(eventInfo) {
    // *** tracks clicks that do not cause pages leave
    // *** like categories or embed video player
    let timeStampIn = eventInfo.timeStampGetter();
    let timeClick = eventInfo.timeStamp;
    let hoverTime = timeClick - timeStampIn;
    eventInfo.hoverTime = hoverTime;
    //console.log("click event", eventInfo);
    return eventInfo;
  }

  function hoverTracker(eventInfo) {
    //console.log("test71001 hover tracker eventInfo...", eventInfo);
    let timeStampIn = eventInfo.timeStampGetter();
    //console.log("test71002 timeStampIn ", timeStampIn);
    let timeStampOut = eventInfo.timeStamp;
    //console.log("test71003 timeStampOut:", timeStampOut);
    let hoverTime = timeStampOut - timeStampIn;
    //onsole.log("test71004 hoverTime", hoverTime);

    switch (true) {
      //*** hover events are tracked only if longer than a set time limit
      case hoverTime < timeLimit:
        eventInfo = {};
        return eventInfo;
        break;
      case hoverTime >= timeLimit:
        //console.log("worth recording");
        eventInfo.hoverTime = hoverTime;
        //eventInfo.action = "card-hover";
        //console.log("test71007 recording event...", eventInfo);
        return eventInfo;
        break;
      default:
        console.log("hoverTracker error", eventInfo);
        break;
    }
    return;
  }

  //remove functions before pass back the object
  if (eventInfo.timeStampGetter || eventInfo.timeStampSetter) {
    delete eventInfo.timeStampGetter;
    delete eventInfo.timeStampSetter;
  }

    console.log('test8800')
  return eventInfo;
};
