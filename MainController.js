import React from "react";
import ReactDOM from "react-dom";
import PRNApp from "./src/components/PRNApp"; //jsx
import "bootstrap/dist/css/bootstrap.css";
import "./styles/style.scss";
import { EventSwitcher } from "./src/methods/EventSwitcher.js";
//import { ResponsiveCSS } from "./src/methods/ResponsiveCSS.js";
import { NumberFormatter } from "./src/methods/NumberFormatter.js";

import Presets from "./src/methods/Presets.js";
//All needed presets to build page while waiting for data
import TestAdsData from "./src/methods/TestAdsData.js";
//import TestEmbedVideos from "./src/methods/TestEmbedVideos.js";
//import {NumberFormatter} from './src/methods/NumberFormatter.js'
import "core-js/stable";
import "regenerator-runtime";

const axios = require("axios");

//import deepDiff from "return-deep-diff";
//const clone = require("clone");

// app is referred to PRNapp

export default class MainController {
  //
  constructor(args) {
    this.appStateMirror = {};

    this.appMethods = {};
    // *** load app methods for controller
    this.appProps = {};
    // *** load props for PRNApp building
    this.EventSwitcher = EventSwitcher;

    this.NumberFormatter = NumberFormatter;
    this.defaultQuery = Presets.fallBackQuery;

    this.userData = Presets.userData;

    //this.dynamicCss = Presets.dynamicCss;

    // this._userData = {
    //   //sessionTracker
    //   sessionId: Presets.sessionId,
    //   sessionData: []
    // };

    this.overwriteNextId = false; //sessionTracker
    this.hoverInTimeStamp; //eventTracker

    this.onGoingQuery = {};
    this.isNewSearchStatus = true;
    this.queryKeywords = "";

    this.allResults = [];
    this.totalNumberOfResults = 0;
    this.numberOfDisplayedResults = 0;

    this.pleaseWaitPanelArgs = Presets.pleaseWaitPanel;
    this.topInfoBoxArgs = Presets.topInfoBox;

    //*** APP STATE ARGS
    this.paginationArgs = Presets.paginationArgs;

    this.resultsVideos = []; //contains all main panel results videos
    this.resultsArgs = Presets.resultsVideos;

    this.embeddedVideos = []; //contains all embedded videos
    this.embedArgs = Presets.embeddedVideos;
    // this.suggestedVideos = []; //contains all suggested videos
    // this.suggestedArgs = Presets.suggestedVideos;
    this.mostClickedVideos = [];
    this.mostClickedArgs = Presets.mostClicked;

    this.mostInterestingVideos = [];
    this.mostInterestingArgs = Presets.mostInteresting;

    this.mostRequestedVideos = [];
    this.mostRequestedArgs = Presets.mostRequested;

    // *** Binding
    this.grabAppMethods = this.grabAppMethods.bind(this);
    this.mirrorSync = this.mirrorSync.bind(this);
    this.mobileMenuArgs = Presets.mobileMenuArgs;
    this.previewLoadHandler = this.previewLoadHandler.bind(this);

    //*** handle event tracking
    this.eventTracker = this.eventTracker.bind(this);
    this.saveSessionData = this.saveSessionData.bind(this);
    //*** handle search events
    this.onSearchField = this.onSearchField.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onSearchRelatedCategories = this.onSearchRelatedCategories.bind(this);
    this.onNavigatePagination = this.onNavigatePagination.bind(this);
    this.onSkipPaginator = this.onSkipPaginator.bind(this);

    this.onReturnToFirstPage = this.onReturnToFirstPage.bind(this);

    //*** handle page skipping on embed and suggested content
    this.onPrevNextButtons = this.onPrevNextButtons.bind(this);

    //*** alerts and info panels
    this.shutAlertModal = this.shutAlertModal.bind(this);
    this.mobileMenuHandler = this.mobileMenuHandler.bind(this);

    this.onResponsiveResize = this.onResponsiveResize.bind(this);

    this.test00 = this.test00.bind(this);
    this.test = "test value";
    this.logger = true;
    //this.nextStep = false;

    // // // // // // // // // // // // // // // // // // // // //
    // // //             GETTERS AND SETTERS              // // //
    // // // // // // // // // // // // // // // // // // // // //

    // *** GETTERS AND SETTERS- get/set values from/in constructor

    this.sessionIdGetter = () => {
      return this.sessionId;
    };

    this.sessionIdSetter = onGoingSession => {
      this.sessionId = onGoingSession;
    };

    //***

    this.userDataGetter = () => {
      return this.userData;
    };

    this.userDataSetter = incomingUserData => {
      this.userData = incomingUserData;
    };

    //***

    this.overwriteNextIdGetter = () => {
      return this.overwriteNextId;
    };

    this.overwriteNextIdSetter = incomingStatus => {
      this.overwriteNextId = incomingStatus;
    }; //TODO REMOVE TEMPSESSIONID STUFF

    //***

    this.allResultsGetter = () => {
      return this.allResults;
    };

    this.allResultsSetter = incomingResults => {
      this.allResults = incomingResults;
    };

    this.relatedCategoriesGetter = () => {
      return this.relatedCategories;
    };

    this.relatedCategoriesSetter = incomingCategories => {
      this.relatedCategories = incomingCategories;
    };

    //***

    this.defaultQueryGetter = () => {
      return this.defaultQuery;
    };

    //no getter needed

    //***

    this.isNewSearchStatusGetter = () => {
      return this.isNewSearchStatus;
    };

    this.isNewSearchStatusSetter = trueOrFalse => {
      this.isNewSearchStatus = trueOrFalse;
    };

    //***

    this.onGoingQueryGetter = () => {
      return this.onGoingQuery;
    };
    this.onGoingQuerySetter = incomingQuery => {
      this.onGoingQuery = incomingQuery;
    };

    //***

    this.queryKeywordsGetter = () => {
      return this.queryKeywords;
    };

    this.queryKeywordsSetter = incomingKeywords => {
      this.queryKeywords = incomingKeywords;
    };

    //***

    this.appStateMirrorGetter = () => {
      return this.appStateMirror;
    };

    this.appStateMirrorSetter = incomingState => {
      this.appStateMirror = incomingState;
    };

    //***

    this.appPropsGetter = () => {
      return this.appProps;
    };

    this.appPropsSetter = incomingProps => {
      this.appProps = incomingProps;
    };

    //***

    this.totalNumberOfResultsGetter = () => {
      return this.totalNumberOfResults;
    };
    // no setter needed

    //***

    this.numberOfDisplayedResultsGetter = () => {
      return this.numberOfDisplayedResults;
    };

    this.numberOfDisplayedResultsSetter = incomingQuantity => {
      this.numberOfDisplayedResults = incomingQuantity;
    };

    //***

    this.currentPageGetter = () => {
      return this.currentPage;
    };
    this.currentPageSetter = incomingPage => {
      this.currentPage = incomingPage;
    };

    //***

    this.hoverInTimeStampGetter = () => {
      return this.hoverInTimeStamp;
    };
    this.hoverInTimeStampSetter = incomingTimeStamp => {
      this.hoverInTimeStamp = incomingTimeStamp;
    };

    //***

    this.appMethodsSetter = incomingMethods => {
      this.appMethods = incomingMethods;
    };
    //  no getter needed

    //*** EMBEDDED VIDEO ARGS (STATE)

    this.embedArgsSetter = videos => {
      this.embedArgs = videos;
    };
    this.embedArgsGetter = () => {
      return this.embedArgs;
    };

    //*** ALL EMBEDDED VIDEOS (CONTROLLER)

    this.embeddedVideosSetter = videos => {
      this.allEmbeddedVideos = videos;
    };
    this.embeddedVideosGetter = () => {
      return this.allEmbeddedVideos;
    };

    //*** SUGGESTED VIDEO ARGS (STATE)

    this.suggestedArgsSetter = videos => {
      this.suggestedArgs = videos;
    };
    this.suggestedArgsGetter = () => {
      return this.suggestedArgs;
    };

    //*** ALL SUGGESTED VIDEOS (CONTROLLER)

    this.suggestedVideosSetter = videos => {
      this.suggestedVideosVideos = videos;
    };
    this.suggestedVideosGetter = () => {
      return this.suggestedVideosVideos;
    };

    //*** RESULTS VIDEOS ARGS (STATE)

    this.resultsArgsSetter = videos => {
      this.resultsArgs = videos;
    };

    this.resultsArgsGetter = () => {
      return this.resultsArgs;
    };

    //*** ALL RESULTS VIDEOS (CONTROLLER)

    this.resultsVideosSetter = videos => {
      this.resultsVideosVideos = videos;
    };
    this.resultsVideosGetter = () => {
      return this.resultsVideosVideos;
    };

    // *** ALL SIDE CONTENTS,

    // ***  MOST CLICKED

    this.mostClickedArgsGetter = () => {
      //STATE ARGS
      return this.mostClickedArgs;
    };

    this.mostClickedArgsSetter = incomingArgs => {
      //STATE ARGS
      this.mostClickedArgs = incomingArgs;
    };

    this.mostClickedVideosGetter = () => {
      return this.mostClickedVideos;
    };

    this.mostClickedVideosSetter = incomingData => {
      this.mostClickedVideos = incomingData;
    };

    // *** MOST INTERESTING

    this.mostInterestingArgsGetter = () => {
      //STATE ARGS
      return this.mostInterestingArgs;
    };

    this.mostInterestingArgsSetter = incomingArgs => {
      //STATE ARGS
      this.mostInterestingArgs = incomingArgs;
    };

    this.mostInterestingVideosGetter = () => {
      return this.mostInterestingVideos;
    };

    this.mostInterestingVideosSetter = incomingData => {
      this.mostInterestingVideos = incomingData;
    };

    // *** MOST REQUESTED

    this.mostRequestedArgsGetter = () => {
      //STATE ARGS
      return this.mostRequestedArgs;
    };

    this.mostRequestedArgsSetter = incomingArgs => {
      //STATE ARGS
      this.mostRequestedArgs = incomingArgs;
    };

    this.mostRequestedVideosGetter = () => {
      return this.mostRequestedVideos;
    };

    this.mostRequestedVideosSetter = incomingData => {
      this.mostRequestedVideos = incomingData;
    };

    //***

    this.paginationArgsGetter = () => {
      return this.paginationArgs;
    };

    this.paginationArgsSetter = newArgs => {
      this.paginationArgs = newArgs;
    };

    //***

    this.pleaseWaitPanelArgsGetter = () => {
      return this.pleaseWaitPanelArgs;
    };

    this.pleaseWaitPanelArgsSetter = newArgs => {
      this.pleaseWaitPanelArgs = newArgs;
    };

    this.topInfoBoxArgsGetter = () => {
      return this.topInfoBoxArgs;
    };

    this.topInfoBoxArgsSetter = newArgs => {
      this.topInfoBoxArgs = newArgs;
    };

    // *** MOBILE MENU

    this.mobileMenuArgsGetter = () => {
      return this.mobileMenuArgs;
    };

    this.mobileMenuArgsSetter = newArgs => {
      this.mobileMenuArgs = newArgs;
    };

    //***dynamic css
    // this.dynamicCssGetter = () => {
    //   return this.dynamicCss;
    // };

    // ****

    // test stuff
    this.testGetter = () => {
      return this.test;
    };
    this.loggerGetter = () => {
      return this.logger;
    };

    // // // // // // // // // // // // // // // // // // // // //
    //console.log('test4444' , TestEmbedVideo)
    this.homePageStarter();
    // *** trigger the main process
  }

  // // // // // // // // // // // // // // // // // // // // //
  // // //                 END CONSTRUCTOR              // // //
  // // // // // // // // // // // // // // // // // // // // //

  // // // // // // // // // // // // // // // // // // // // //
  // // //                PROPS SETUP                   // // //
  // // // // // // // // // // // // // // // // // // // // //

  createAppProps() {
    //console.log("running createAppProps");

    const appProps = {
      dataSet: this.dataSetUp(), // *** build empty data schema for PRNApp
      toolSet: this.toolSetUp(), // *** pack methods to pass to PRNApp
      responsiveCssSet: this.responsiveCssHandler().respClass
    };

    this.appPropsSetter(appProps);
    //console.log("test44003 appProps", appProps);
    return;
    //console.log(this.appPropsGetter());
    // alert('01')
    // *** set props for PRNApp (launchReact(appPropsGetter()))
  }

  dataSetUp() {
    // *** build an empty data schema to start building an empty page while
    // *** axios grabs proper data
    let dataSet = {};
    let expectedNumberOfResults = Presets.fallBackQuery.per_page;
    let responsiveCss = this.responsiveCssHandler().respClass;
    let resultsPerPage= this.responsiveCssHandler().resultsPerPage;

    // console.log('test666 respCss', this.responsiveCssHandler())

    //   switch(responsiveCss){
    //   case'x-small':
    //   case'small':
    //   case'medium':
    //   case'large':
    // 	  //responsiveCss.resultsPerPage=responsiveCss.resultsPerPageAlt1;
    // 	  break;
    //   case'x1-large':
    //   case'x2-large':
    //   case'x3-large':
    // 	  //responsiveCss.resultsPerPage=responsiveCss.resultsPerPageAlt2;
    // 	  break;
    //   default:
    // 	  console.log('error dataSetup')
    // 	  break;
    //   }
      
    dataSet = {
      // *** initialize the state for PRNApp
      initState: {
        currentSearchType: Presets.searchTypes.video,
        //page: Presets.fallBackQuery.page,
        //per_page: Presets.fallBackQuery.per_page,
        query: Presets.fallBackQuery.query,
        paginationArgs: Presets.paginationArgs,
        alertModal: Presets.alertModal,
        pleaseWaitPanel: Presets.pleaseWaitPanel,
        topInfoBox: Presets.topInfoBox,
        //myTest: "default",
        adsData: TestAdsData,
        relatedCategories: Presets.relatedCategories,
        searchBarArgs: Presets.searchBar,
        responsiveCss: responsiveCss,
        embedArgs: Presets.embeddedVideos,
        resultsArgs: Presets.resultsVideos,
        mobileMenuArgs: Presets.mobileMenuArgs
      },

      searchTypes: Presets.searchTypes,
      per_page: Presets.fallBackQuery.per_page,
      logo: Presets.logo
      //classSwitchData: CssSwitcher
      //***
    };

    let startupState = {};
    let stateMirror = {};

    startupState = Object.assign(startupState, dataSet.initState);
    // *** initialize PRNApp state
    stateMirror = Object.assign(stateMirror, dataSet.initState);
    // *** initialize Mirror
    // *** from now on PRNApp state and its mirror are separated
    this.onGoingQuerySetter(this.defaultQueryGetter());
    this.paginationArgsSetter(Presets.paginationArgs);
    this.appStateMirrorSetter(stateMirror);
    // ***
    return dataSet;
  }

  toolSetUp() {
    // *** packs bound methods for app handling
    //console.log("running toolSetup");

    const toolSet = {
      grabAppMethods: this.grabAppMethods,
      mirrorSync: this.mirrorSync,
      saveSessionData: this.saveSessionData,
      onResponsiveResize: this.onResponsiveResize,
      // ***
      modalHandlers: {
        shutAlertModal: this.shutAlertModal
      },

      // ***
      searchHandlers: {
        eventTracker: this.eventTracker,
        onSearchField: this.onSearchField,
        onSearchSubmit: this.onSearchSubmit,
        mobileMenuHandler: this.mobileMenuHandler
      },

      paginationHandlers: {
        eventTracker: this.eventTracker,
        onNavigatePagination: this.onNavigatePagination,
        onReturnToFirstPage: this.onReturnToFirstPage,
        onSkipPaginator: this.onSkipPaginator
      },

      relatedCategoriesHandlers: {
        eventTracker: this.eventTracker,
        onSearchRelatedCategories: this.onSearchRelatedCategories
      },

      resultsHandlers: {
        eventTracker: this.eventTracker,
        previewLoadHandler: this.previewLoadHandler,
        onPrevNext: this.onPrevNextButtons
      },

      stickyPanelHandlers: {
        mobileMenuHandler: this.mobileMenuHandler
      },

      // *** test methods
      test00: this.test00
    };
    return toolSet;
  }

    responsiveCssHandler() {
	//scan array of breakpoint and return matchin window size set
	//TODO it should not be a for loop, maybe a while loop.
    let windowWidth = window.innerWidth;
    //console.log("test44001 windowWidth", windowWidth);
    let responsiveCssSet;
    let breakPoints = Presets.breakPoints;
    //let lastSize=breakPoints[breakPoints.length]

    for (let i = 0; i < breakPoints.length; i++) {
      if (
        windowWidth >= breakPoints[i].minSize &&
        windowWidth <= breakPoints[i].maxSize
      ) {
        //responsiveCssSet = breakPoints[i].respClass;
        responsiveCssSet = breakPoints[i];
      }
    }
    //console.log('test881 responsiveCssSet' , responsiveCssSet)
    return responsiveCssSet;
  }

  onResponsiveResize() {
    //-->runs in controller
    let newState = {};
    //console.log("test11200 page width", window.innerWidth);
    let newCss = this.responsiveCssHandler();
    //let adjustedSelection;
    console.log("newCss", newCss);
    Object.assign(newState, { responsiveCss: newCss.respClass });
    //let resultsPerPage = this.adjustNumberOfResults()
    let newSelection=this.selectVideosToDisplay('search-results');
      let resultsArgs=this.resultsArgsGetter()
      resultsArgs.videosToDisplay=newSelection;
      this.resultsArgsSetter(resultsArgs);
      Object.assign(newState, {resultsArgs: resultsArgs})  
 
    this.syncAndUpdate(newState);

      return;
  }

  grabAppMethods(appMethods) {
    // *** triggered in PRNApp, collect PRNApp bound functions
    this.appMethodsSetter(appMethods);
    return;
  }

  // // // // // // // // // // // // // // // // // // // // //
  // // //              PROCESS CONTROLLER              // // //
  // // // // // // // // // // // // // // // // // // // // //

  async homePageStarter() {
    this.createAppProps();
    //console.log("test440 appPropsGetter", this.appPropsGetter());
    // *** create the state and the parameters needed by PRNApp to start
    // *** and stores them in this.appProps
    this.launchReact(this.appPropsGetter());
    this.querySourceHandler(); //***check for keywords in url bar
    await this.trackingInit();
    this.getDataByQuery();
    //this.sessionTracker(); //***TODO THIS DOESNOT SEEMS THE BEST PLACE TO START IT
    return;
  }

  launchReact(args) {
    //console.log("running launchReact(props)");
    const reactContent = document.getElementById("react-root"); //refers to index.html
    reactContent
      ? ReactDOM.render(<PRNApp controllerArgs={args} />, reactContent)
      : false;
    return;
  }

  // // // // // // // // // // // // // // // // // // // // //
  // // //              QUERY HANDLERS                  // // //
  // // // // // // // // // // // // // // // // // // // // //

  querySourceHandler() {
    // *** handle possible query sources (search field or urlbar)
    //console.log("running querySourceHandler");
    let queryKeywords;
    let onGoingQuery;
    const urlKeywords = window.webPPrevReqData.urlArgs;
    // *** webPPrevReqData defined in backend
    //console.log("test33001 window.webPPrevReqData", window.webPPrevReqData);
    // *** switch handles eventual keywords in url bar
    switch (true) {
      // ***
      // *** if no keywords are present runs ongoing query search
      case urlKeywords.length == 0: //*** means no keywords in url
        onGoingQuery = this.onGoingQueryGetter();
        break;
      // *** if keywords are present in url handle query search with those keywords
      case urlKeywords.length > 0:
        console.log(`found url parameters: ${urlKeywords}`);
        // *** returns url formatted array [stuff,20i,20am,20looking,20for]
        for (let i = 1; i < urlKeywords.length; i++) {
          urlKeywords[i] = urlKeywords[i].substring(2);
          //***remove first 2 keys (20) from the second keyword on
          //***NB first keyword doesn't need to be processed
        }

        let keywordsString = urlKeywords.join(" ");
        console.log("keywordsString", keywordsString);
        // *** parse url keywords array and return plain string like "stuff to search"
        onGoingQuery = this.onGoingQueryGetter();
        onGoingQuery.query = keywordsString;
        this.onGoingQuerySetter(onGoingQuery);
        // *** modify default query text with url search keywords text
        break;
      // ***
      // *** if keywords are present runs search with keywords query
      default:
        console.log("source handler error, fallback to default");
        onGoingQuery = this.defaultQueryGetter();
        // *** in case of error fall back to default query
        break;
    }

    return onGoingQuery;
  }

  setSpinners(spinnerStatus) {
    let spinnersTarget;
    switch (spinnerStatus.headTo) {
      case "search-results":
    }
  }

  setAllSpinnersTo(newSpinnerStatus) {
    // *** true|false
    // *** turns on|off all the spinners
    let mirror = this.appStateMirrorGetter();
    let newState = {};
    //console.log("mirror", mirror);
    //alert("mirror");
    for (let i = 0; i < mirror.per_page; i++) {
      let cardStatusName = "cardStatus" + i;
      let cardStatusToUpdate = mirror[cardStatusName];
      cardStatusToUpdate.spinner = newSpinnerStatus;
      Object.assign(newState, cardStatusToUpdate);
    }
    this.syncAndUpdate(newState);
    return;
  }

  searchFormReset() {
    //let test=document.getElementById("search-form");
    //console.log('testxx' , test)
    return;
  }

  async getDataByQuery() {
    let onGoingQuery = this.onGoingQueryGetter();
    let resultsToShow = [];
    let allResults = [];
    let embeddedVideos = [];
    //let suggestedVideos = [];
    let mostClicked = [];
    let mostInteresting = [];
    let mostRequested = [];
    let relatedCategories = [];

    let userData = (userData = this.userDataGetter());
    //*** packs userData for server delivery

    //console.log("test40200 userData", userData);

    this.onSearchToggleUiElements();

    let queryData = {
      url: onGoingQuery.url,
      method: "POST",
      responseType: "json",
      //timeout: 6000,
      data: {
        queryArgs: {
          query: onGoingQuery.query,
          per_page: onGoingQuery.per_page,
          type: "videos",
          userData: userData
        }
      }
    };

    console.log("axios request", queryData);
    //alert();
    await axios(queryData)
      .then(async received => {
        //// *** START ASYNC PROCESS HANDLING
        console.log("test600 axios received:", received);

        this.onSearchToggleUiElements();

        //*** SESSION TRACKER ID HANDLING

        //alert('ud')
        let userData = this.userDataGetter();
        if (userData.sessionData.length > 0) {
          //console.log('test12001 userData.sessionData' , userData)
          //*** reset sessionData after search is returned
          userData.sessionData = [];
          this.userDataSetter(userData);
        }

        if (received.data.sessionID) {
          await this.sessionTracker(received.data.sessionID);
        } else {
          console.log("existing session going on...");
        }

        //*** DATA RECEIVED HANDLING (categories, results, suggested, embedded)

        let newState = {};

        relatedCategories = received.data.quickSearch;

        if (relatedCategories.length > 0) {
          //console.log("test70001");
          this.relatedCategoriesSetter(relatedCategories);
          let args = this.relatedCategoriesGetter();
          Object.assign(newState, {
            relatedCategories: this.relatedCategoriesGetter()
          });
        }

        //*** RESULTS HANDLING IF/WHEN RECEIVED

        allResults = received.data.searchResults;

        if (allResults.length > 0) {
          allResults = this.allResultsIndexer(allResults);
          this.allResultsSetter(allResults);
          let resultsArgs = this.resultsArgsSetup();
          let paginationArgs = this.paginationBuilder();
          Object.assign(newState, {
            resultsArgs: resultsArgs,
            paginationArgs: paginationArgs
          });

          this.resultsArgsSetter(resultsArgs);
          this.paginationArgsSetter(paginationArgs);
        }

        //*** EMBEDDED CONTENT HANDLING IF SERVED
        embeddedVideos = received.data.embedded;
        if (embeddedVideos.length > 0) {
          //console.log("test70003");
          this.embeddedVideosSetter(embeddedVideos); //--
          let args = this.embeddedArgsSetup(embeddedVideos);
          Object.assign(newState, { embedArgs: args });
        }

        mostClicked = received.data.stats.mostClicked;
        mostClicked = this.testVideosGenerator(); //TEST COMMENT THIS ONCE CONNECTED
        if (mostClicked.length > 0) {
          //console.log('stats!!!')
          this.mostClickedVideosSetter(mostClicked);
          let args = this.mostClickedArgsSetup();
          Object.assign(newState, { mostClickedArgs: args });
        }

        mostInteresting = received.data.stats.mostInteresting;
        mostInteresting = this.testVideosGenerator(); //TEST COMMENT THIS ONCE CONNECTED
        if (mostInteresting.length > 0) {
          //console.log('stats!!!')
          this.mostInterestingVideosSetter(mostInteresting);
          let args = this.mostInterestingArgsSetup();
          Object.assign(newState, { mostInterestingArgs: args });
        }

        mostRequested = received.data.stats.mostRequested;
        mostRequested = this.testVideosGenerator(); //TEST COMMENT THIS ONCE CONNECTED
        if (mostRequested.length > 0) {
          //console.log('stats!!!')
          this.mostRequestedVideosSetter(mostRequested);
          let args = this.mostRequestedArgsSetup();
          Object.assign(newState, { mostRequestedArgs: args });
        }

        if (
          allResults.length > 0 ||
          embeddedVideos.length > 0 ||
          //suggestedVideos.length > 0 ||
          relatedCategories.length > 0 ||
          mostClicked.length > 0 ||
          mostRequested.length > 0 ||
          mostInteresting.length > 0
        ) {
          this.syncAndUpdate(newState);
        }
      })
      .catch(err => {
        console.log("axios error:", err);
        this.handleNoResults();
      });
  }

  async trackingInit() {
    let storage = window.sessionStorage;
    let userData = this.userDataGetter();
    let existingId = await storage.getItem("sessionId");
    if (existingId) {
      userData.sessionId = existingId;
    } else {
      userData.sessionId = Presets.userData.sessionId;
    }
    this.userDataSetter(userData);
    //console.log("init userData", userData);
    return;
  }

  async sessionTracker(newSessionId) {
    let storage = window.sessionStorage;
    let existingSessionId = await storage.getItem("sessionId");
    let userData = this.userDataGetter();
    let overwriteNextId = this.overwriteNextIdGetter();
    console.log("received SessionId", newSessionId);
    if (
      !existingSessionId || //if a previous sessionId doesn't exists
      overwriteNextId == true // or is already due to be overwritten
    ) {
      await storage.setItem("sessionId", newSessionId); //write sessionId in storage
      userData.sessionId = newSessionId;
      //storage.setItem("overwriteNextId", "false"); // avoid future overwriting
      this.overwriteNextIdSetter(false);
      //console.log("test7774 sessionId validated", newSessionId);
      this.userDataSetter(userData); //write sessionId in constructor (TODO it is necessary?)
    } else if (existingSessionId) {
      //if sessionId already exists
      userData.sessionId = existingSessionId;
      this.userDataSetter(userData);
      this.overwriteNextIdSetter(true);
    }
    return;
  }

  async saveSessionData() {
    console.log("test87000 saving session data...");
    //console.log("userDataGetter", this.userDataGetter());
    let userData = this.userDataGetter();
    console.log("userData", userData);

    let apiArgs = {
      method: "POST",
      url: "/api/usagestats",
      data: { apiArgs: { userData: userData } }
    };

    await axios(apiArgs);

   return;
  }

  allResultsIndexer(allResults) {
    // *** provide a rank number to result(that is its  index)
    for (let i = 0; i < allResults.length; i++) {
      let result = allResults[i];
      result.rank = i;
    }
    return allResults;
  }

  embeddedArgsSetup() {
    // embeddedVideos
    let args = this.embedArgsGetter();
    let allVideos = this.embeddedVideosGetter();
    let totalSlots = Math.ceil(
      //embeddedVideos.length / Presets.embeddedVideos.perPage
      allVideos.length / Presets.embeddedVideos.perPage
    );

    let videosToDisplay = this.selectVideosToDisplay("embed-content");
    args.totalSlots = totalSlots;
    args.videosToDisplay = videosToDisplay;
    //this.embeddedVideosSetter(args)
    return args;
  }

  resultsArgsSetup() {
    let args = this.resultsArgsGetter();
    let allVideos = this.allResultsGetter();
    let videosToDisplay = this.selectVideosToDisplay("search-results");
    args.videosToDisplay = videosToDisplay;
    return args;
  }

  mostClickedArgsSetup() {
    let args = this.mostClickedArgsGetter();
    let allVideos = this.mostClickedVideosGetter();
    let totalSlots = Math.ceil(allVideos.length / Presets.mostClicked.perPage);
    let videosToDisplay = this.selectVideosToDisplay("most-clicked");

    args.totalSlots = totalSlots;
    args.videosToDisplay = videosToDisplay;

    return args;
  }

  mostRequestedArgsSetup() {
    let args = this.mostRequestedArgsGetter();
    let allVideos = this.mostRequestedVideosGetter();
    let totalSlots = Math.ceil(
      allVideos.length / Presets.mostRequested.perPage
    );
    let videosToDisplay = this.selectVideosToDisplay("most-requested");
    args.totalSlots = totalSlots;
    args.videosToDisplay = videosToDisplay;
    return args;
  }

  mostInterestingArgsSetup() {
    let args = this.mostInterestingArgsGetter();
    let allVideos = this.mostInterestingVideosGetter();
    let totalSlots = Math.ceil(
      allVideos.length / Presets.mostInteresting.perPage
    );
    let videosToDisplay = this.selectVideosToDisplay("most-interesting");
    args.totalSlots = totalSlots;
    args.videosToDisplay = videosToDisplay;
    return args;
  }
   
  selectVideosToDisplay(headTo) {
    let allVideos;
    //let videosPerPage = Presets.embeddedVideos.perPage;
    let videosPerPage;
    let selected = [];
    let args;
    let paginationArgs;

    switch (headTo) {
      case "embed-content":
        args = this.embedArgsGetter();
        allVideos = this.embeddedVideosGetter();
        videosPerPage = Presets.embeddedVideos.perPage;
        break;

      case "most-clicked":
        args = this.mostClickedArgsGetter();
        allVideos = this.mostClickedVideosGetter();
        videosPerPage = Presets.mostClicked.perPage;
        break;

      case "most-requested":
        args = this.mostRequestedArgsGetter();
        allVideos = this.mostClickedVideosGetter();
        videosPerPage = Presets.mostClicked.perPage;
        break;

      case "most-interesting":
        args = this.mostInterestingArgsGetter();
        allVideos = this.mostClickedVideosGetter();
        videosPerPage = Presets.mostInteresting.perPage;
        break;

      case "search-results":
      case "pagination-change":
        args = this.resultsArgsGetter();
        allVideos = this.allResultsGetter();
        //videosPerPage = Presets.resultsVideos.perPage;
	videosPerPage = this.adjustNumberOfResults();
        break;

      default:
        console.log("default error in selectVideoToDisplay");
        break;
    }

      
      
    let currentSlot = args.currentSlot;
    let startIndex = videosPerPage * currentSlot;
    let endIndex = startIndex + videosPerPage - 1;

    if (allVideos.length <= endIndex) {
      endIndex = allVideos.length - 1;
    }

    for (let index = startIndex; index <= endIndex; index++) {
      selected.push(allVideos[index]);
    }

    for (let i = 0; i < selected.length; i++) {
      selected[i].spinnerStatus = true;
      if (selected[i].rate || selected[i].views) {
        selected[i].rate = this.formatRateValue(selected[i].rate);
        //console.log("test51000x original value for views:", selected[i].views);
        selected[i].views = this.formatViewsValue(selected[i].views);
      }
    }

      if(selected.length < videosPerPage){
	  console.log('ìhey')
      }
      
    return selected;
  }

  adjustNumberOfResults() {
    //console.log("test661 adjusting ", newCss);
  let responsiveCss = this.responsiveCssHandler().respClass;
      let resultsPerPage;
    //console.log('test666 respCss', this.responsiveCssHandler())

      switch(responsiveCss){
      case'x-small':
      case'small':
      case'medium':
      case'large':
	  resultsPerPage=this.responsiveCssHandler().resultsPerPageAlt1;
	  break;
      case'x1-large':
      case'x2-large':
      case'x3-large':
	  resultsPerPage=this.responsiveCssHandler().resultsPerPageAlt2
	  break;
      default:
	  console.log('error dataSetup')
	  break;
      }
      console.log('test666 resultsPerPage', resultsPerPage)
      return resultsPerPage;
  }

  adjustedSideResults() {
    let screenSize = window.innerWidth;
    //let adjEmbedded;
    let adjSuggested;
    let adjustedResults = {};

    switch (true) {
      case screenSize < 533:
        adjSuggested = 8;
        break;

      case screenSize > 1649:
        adjSuggested = 4;
        break;

      case screenSize > 1327:
        adjSuggested = 5;
        break;

      case screenSize > 1005:
        adjSuggested = 9;
        break;

      case screenSize > 801:
        adjSuggested = 16;
        break;

      case screenSize > 532:
        adjSuggested = 8;
        break;

      default:
        console.log("default screenSize", screenSize);
    }

    adjustedResults = {
      adjSuggested: adjSuggested,
      adjEmbedded: Presets.embeddedVideos.perPage
    };

    return adjustedResults;
  }

  formatDurationValue() {}

  formatRateValue(rate) {
    switch (typeof rate) {
      case "number":
        rate = rate.toString();
        break;
      case "string":
        break;
      default:
        console.log("invalid rate format", rate);
        rate = "???";
        break;
    }

    if (rate.lenght == 1) {
      rate = "0" + rate;
    }

    rate = rate.substr(0, 2) + "%";

    return rate;
  }

  formatViewsValue(views) {
    //console.log('test51001 views' , views)
    let formattedValue;

    if (typeof views !== "string") {
      views = views.toString();
    }

    if (views.includes("K") || views.includes("k")) {
      formattedValue = views;
    } else {
      if (views.includes(".")) {
        views = views.replace(".", "");
      }

      formattedValue = this.NumberFormatter(views);
    }

    return formattedValue;
  }

  testVideosGenerator() {
    //sort all results by rate or views
    let allResults = this.allResultsGetter();
    //console.log("test55001", allResults);

    let testVideos = allResults.sort((a, b) => {
      return b.views - a.views;
      //return a.rate - b.rate;
    });

    //console.log("test55002", suggestedVideos);

    return testVideos;
  }

  ///////////////////////////////////////////////////////////

  mobileMenuHandler(mobileMenuEvent) {
    //console.log("mobile!", mobileMenuEvent);

    let newArgs = this.mobileMenuArgsGetter();
    //console.log("newArgs", newArgs);
    switch (mobileMenuEvent.headTo) {
      case "search-box":
        newArgs.searchBar = !newArgs.searchBar;
        //***toggle mobile searchbar menu
        newArgs.categories = false;
        //***shut down other mobile menu (if open, otherwise runs anyway but is uneffective)
        break;
      case "categories-box":
        newArgs.categories = !newArgs.categories;
        //***toggle mobile categories menu
        newArgs.searchBar = false;
        //***shut down other mobile menu (if open, otherwise runs anyway but is uneffective)

        break;
      default:
        console.log("mobileMenuEvent error:", mobileMenuEvent);
        break;
    }

    this.mobileMenuArgsSetter(newArgs);

    let newState = {};
    Object.assign(newState, newArgs);
    this.syncAndUpdate(newState);
  }

  showAlertModal(modalData) {
    modalData.alertModal.show = true;
    let newState = modalData;
    this.syncAndUpdate(newState);
    return;
  }

  shutAlertModal() {
    let newState = {
      alertModal: {
        show: false,
        message: "default"
      }
    };
    this.syncAndUpdate(newState);
    return;
  }

  resetAllCards() {
    //console.log('Presets' , Presets)
    let defaultArgs = {
      suggestedArgs: Presets.suggestedVideos,
      resultsArgs: Presets.resultsVideos,
      embedArgs: Presets.embeddedVideos
    };

    //let suggestedArgs = this.suggestedArgsGetter();
    let resultsArgs = this.resultsArgsGetter();
    let embedArgs = this.embedArgsGetter();
    let paginationArgs = this.paginationArgsGetter();

    //suggestedArgs.videosToDisplay = [];
    resultsArgs.videosToDisplay = [];
    embedArgs.videosToDisplay = [];
    paginationArgs.totalNumberOfResults = 0;

    //this.suggestedArgsSetter(suggestedArgs);
    this.resultsArgsSetter(resultsArgs);
    this.embedArgsSetter(embedArgs);
    this.paginationArgsSetter(paginationArgs);

    return defaultArgs;
  }

  onSearchToggleUiElements() {
    //toggle elements during search
    let newState = {};
    let pleaseWaitPanelArgs = this.togglePleaseWaitPanel();
    let topInfoBoxArgs = this.toggleTopInfoBox();
    //console.log("test64003 topInfoBoxArgs", topInfoBoxArgs);
    //console.log("pleaseWaitPanelArgs", pleaseWaitPanelArgs);

    if (pleaseWaitPanelArgs.showPanel == true) {
      //***reset all cards;

      let defaultCards = this.resetAllCards();

      Object.assign(newState, defaultCards);
    }

    Object.assign(newState, {
      pleaseWaitPanel: pleaseWaitPanelArgs,
      topInfoBox: topInfoBoxArgs
    });
    //console.log("test78002 newState", newState);
    //alert()
    this.syncAndUpdate(newState);
  }

  togglePleaseWaitPanel() {
    let args = this.pleaseWaitPanelArgsGetter();

    switch (args.showPanel) {
      case false:
        let onGoingQuery = this.onGoingQueryGetter();
        args.showPanel = true;
        args.keywords = onGoingQuery.query;
        //console.log('test64005 onGoingQuery' , onGoingQuery)
        break;
      case true:
        args.showPanel = false;
        break;
      default:
        console.log("togglePleaseWaitPanel error default");
        break;
    }

    this.pleaseWaitPanelArgsSetter(args);

    return args;
  }

  toggleTopInfoBox() {
    let args = this.topInfoBoxArgsGetter();
    //console.log('test640010 args' , args.showKeywords)
    switch (args.showKeywords) {
      case false:
        let onGoingQuery = this.onGoingQueryGetter();
        args.showKeywords = true;
        args.keywords = onGoingQuery.query;
        //console.log('test64001 args case false ->' , args.showKeywords)

        break;
      case true:
        args.showKeywords = false;
        //console.log('test640011 args case true ->' , args.showKeywords)

        break;
      default:
        console.log("toggleTopInfoBox error default");
        break;
    }

    this.topInfoBoxArgsSetter(args);

    return args;
  }

  handleNoResults() {
    // *** starts with eventual axios timeout
    console.log("handling no results");
    let modalData = {
      alertModal: {
        message: "no results found for your search"
      }
    };
    this.showAlertModal(modalData);
    //this.setAllSpinnersTo(false);
    return;
  }

  resultsValidator(cardId) {
    // *** turns ""actualResult"" from false to true once data is loaded
    let cardStatus = {};
    Object.assign(cardStatus, Presets.cardStatus);
    cardStatus.cardId = cardId;
    cardStatus.actualResult = true;
    return cardStatus;
  }

  mirrorSync(newPRNAppState) {
    this.appStateMirrorSetter(newPRNAppState);
    return;
  }
  // // // // // // // // // // // // // // // // // // // // //
  // // //                STATE HANDLERS                // // //
  // // // // // // // // // // // // // // // // // // // // //

  syncAndUpdate(newState) {
    this.appMethods.appStateUpdater(newState);
    return;
  }

  // // // // // // // // // // // // // // // // // // // // //
  // // //              EVENTS HANDLERS                 // // //
  // // // // // // // // // // // // // // // // // // // // //

  isEmpty(incomingObject) {
    let keys = Object.entries(incomingObject);
    let status;
    //console.log("001 incomingObject", incomingObject);
    //console.log("001 keys:", keys);
    switch (true) {
      case keys.length == 0:
        status = true;
        break;
      case keys.length > 0:
        status = false;
        break;
      default:
        break;
    }
    //console.log("001 status", status);
    keys = [];
    return status;
  }

  eventTracker(eventInfo) {
    //***track significant UI events

    //console.log('eventInfo' , eventInfo)

    //if (eventInfo.action.search('hover') >=0){
    eventInfo.timeStampGetter = this.hoverInTimeStampGetter;
    eventInfo.timeStampSetter = this.hoverInTimeStampSetter;
    //}
    //*** add necessary functions to eventInfo object
    //*** in order to maniupalet timeStamp value ans calculate hover timeclick
    //*** TODO it should sussist only on hover events
    //***> if (eventInfo.action.search('hover') >=0){
    //***> eventInfo.timeStampGetter = this.hoverInTimeStampGetter;
    //***> eventInfo.timeStampSetter = this.hoverInTimeStampSetter;
    //***> }

    let trackedEvent = EventSwitcher(eventInfo);

    //console.log("test72001 trackedEvent", trackedEvent);

    switch (this.isEmpty(trackedEvent)) {
      //*** check if event object is empty
      case true:
        break;
        console.log("no event to track");
      case false:
        delete trackedEvent.type;
        let userData = this.userDataGetter();
        userData.sessionData.push(trackedEvent);
        this.userDataSetter(userData);

        //console.log("test12030 stacked userData", this.userDataGetter());
        //*** stack events in userData array, they will be delivered later
        //*** at next search or click
        break;
      default:
        break;
    }
    return;
  }

  async previewLoadHandler(loadEventData) {
    //shut spinners after image load
    //console.log('test56002 load handling' , loadEventData)

    await loadEventData;
    //console.log('test13001 loadEventData' , loadEventData)
    let argsGetter;
    let argsSetter;
    let stateTarget;

    switch (loadEventData.headTo) {
      case "search-results":
        argsGetter = this.resultsArgsGetter;
        argsSetter = this.resultsArgsSetter;
        stateTarget = "resultsArgs";
        break;
      // case "suggested-content":
      //   argsGetter = this.suggestedArgsGetter;
      //   argsSetter = this.suggestedArgsSetter;
      //   stateTarget = "suggestedArgs";
      //   break;
      case "embed-content":
        argsGetter = this.embedArgsGetter;
        argsSetter = this.embedArgsSetter;
        stateTarget = "embedArgs";
        break;
      case "most-clicked":
        argsGetter = this.mostClickedArgsGetter;
        argsSetter = this.mostClickedArgsSetter;
        stateTarget = "mostClickedArgs";
        break;
      case "most-requested":
        argsGetter = this.mostRequestedArgsGetter;
        argsSetter = this.mostRequestedArgsSetter;
        stateTarget = "mostRequestedArgs";
        break;
      case "most-interesting":
        argsGetter = this.mostInterestingArgsGetter;
        argsSetter = this.mostInterestingArgsSetter;
        stateTarget = "mostInterestingArgs";
        break;
      default:
        console.log("poreviewLoadHandler error", loadEventData);
        break;
    }

    let args = argsGetter();
    let videos = args.videosToDisplay;
    videos[loadEventData.cardIndex].spinnerStatus = false;
    argsSetter(args);
    let newState = {};
    Object.assign(newState, { [stateTarget]: args });
    //console.log("test20010 newState", newState);

    this.syncAndUpdate(newState);
  }

  // // // // // // // // // // // // // // // // // // // // //
  // // //               SEARCH HANDLERS                // // //
  // // // // // // // // // // // // // // // // // // // // //

  onSearchField(event) {
    // *** handle search field entries while typing
    event.preventDefault();
    let keywords = event.target.value;
    //console.log('test1113 kwds' , keywords)
    //let onGoingQuery = this.queryKeywordsGetter();
    //onGoingQuery.query = keywords;
    this.queryKeywordsSetter(keywords);
    return;
  }
  //

  onSearchSubmit(event) {
    // *** submit keywords given in onSearchFiels() for actual search
    event.preventDefault();
    //console.log("test1114 onSearchSubmit" , event.type);
    this.isNewSearchStatusSetter(true);

    let keywords = this.queryKeywordsGetter();

    switch (true) {
      //***
      case keywords.length == 0:
        console.log("no keywords, no further action to perform");
        break;
      //***
      case keywords.length > 0:
        let onGoingQuery = this.onGoingQueryGetter();
        onGoingQuery.query = keywords;
        onGoingQuery.page = 1; //TODO
        this.onGoingQuerySetter(onGoingQuery);
        this.getDataByQuery();
        break;
      //***
      default:
        console.log("default error onSearchSubmit (defaultQuery fallback)");
        this.onGoingQuerySetter(this.defaultQueryGetter());
        this.getDataByQuery();
        break;
    }

    //TODO activate spinner here

    return;
  }

  onSearchRelatedCategories(keywords) {
    this.isNewSearchStatusSetter(true);
    //let categoryKeywords = "test";
    let onGoingQuery = this.onGoingQueryGetter();
    onGoingQuery.query = keywords;
    this.onGoingQuerySetter(onGoingQuery);
    this.getDataByQuery();
    return;
  }

  // // // // // // // // // // // // // // // // // // // // //
  // // //           PAGINATION HANDLERS                // // //
  // // // // // // // // // // // // // // // // // // // // //

  onNavigatePagination(eventInfo) {
    //***receives object
    //*** {
    //*** original: event,
    //*** pageNumber:numberToShow
    //*** }

    console.log("click");
    this.isNewSearchStatusSetter(false);

    let pageNumber = eventInfo.pageNumber;
    let paginationArgs = this.paginationArgsGetter();
    paginationArgs.currentPage = pageNumber;

    this.paginationArgsSetter(paginationArgs);

    let resultsArgs = this.resultsArgsGetter();
    let newSlot = pageNumber - 1; //currentSlot array index
    resultsArgs.currentSlot = newSlot;
    this.resultsArgsSetter(resultsArgs);

    let videos = this.selectVideosToDisplay("pagination-change");
    resultsArgs.videosToDisplay = videos;
    this.resultsArgsSetter(resultsArgs);

    let newState = {};
    Object.assign(newState, {
      resultsArgs: resultsArgs,
      paginationArgs: paginationArgs
    });

    this.syncAndUpdate(newState);

    //return paginationArgs

    return;
  }

  onSkipPaginator(eventData) {
    console.log("next");
    this.isNewSearchStatusSetter(false);

    let paginationArgs = this.paginationArgsGetter();

    switch (eventData.action) {
      case "next-slot-paginator":
        paginationArgs.pagesListStart =
          paginationArgs.pagesListStart + paginationArgs.pagesToList;
        paginationArgs.pagesListEnd =
          paginationArgs.pagesListEnd + paginationArgs.pagesToList;
        paginationArgs.currentPage = paginationArgs.pagesListStart;
        paginationArgs.currentPagesSlot++;
        break;

      case "previous-slot-paginator":
        paginationArgs.pagesListStart =
          paginationArgs.pagesListStart - paginationArgs.pagesToList;
        paginationArgs.pagesListEnd =
          paginationArgs.pagesListEnd - paginationArgs.pagesToList;
        paginationArgs.currentPage = paginationArgs.pagesListStart;
        paginationArgs.currentPagesSlot--;

        if (paginationArgs.pagesListStart < 1) {
          paginationArgs.pagesListStart = 1;
          paginationArgs.pagesListEnd = paginationArgs.pagesToList;
        }

        break;
      default:
        console.log("default error in onSkipPagination");
        break;
    }

    this.paginationArgsSetter(paginationArgs);

    let resultsArgs = this.resultsArgsGetter();
    let newSlot = paginationArgs.currentPage - 1;
    resultsArgs.currentSlot = newSlot;
    this.resultsArgsSetter(resultsArgs);
    let videos = this.selectVideosToDisplay("pagination-change");
    resultsArgs.videosToDisplay = videos;
    this.resultsArgsSetter(resultsArgs);

    let newState = {};
    Object.assign(newState, {
      paginationArgs: paginationArgs,
      resultsArgs: resultsArgs
    });

    this.syncAndUpdate({ newState });

    return;
  }

  onSkipToNextSlot(eventData) {
    console.log("next");
    this.isNewSearchStatusSetter(false);
    let paginationArgs = this.paginationArgsGetter();

    switch (eventData.action) {
      case "next-slot-paginator":
        paginationArgs.pagesListStart =
          paginationArgs.pagesListStart + paginationArgs.pagesToList;
        paginationArgs.pagesListEnd =
          paginationArgs.pagesListEnd + paginationArgs.pagesToList;
        paginationArgs.currentPage = paginationArgs.pagesListStart;
        paginationArgs.currentPagesSlot++;
        break;

      case "previous-slotPaginator":
        paginationArgs.pagesListStart =
          paginationArgs.pagesListStart - paginationArgs.pagesToList;
        paginationArgs.pagesListEnd =
          paginationArgs.pagesListEnd - paginationArgs.pagesToList;
        paginationArgs.currentPage = paginationArgs.pagesListStart;
        paginationArgs.currentPagesSlot--;
        if (paginationArgs.pagesListStart < 1) {
          paginationArgs.pagesListStart = 1;
          paginationArgs.pagesListEnd = paginationArgs.pagesToList;
        }
        break;
      default:
        break;
    }

    this.paginationArgsSetter(paginationArgs);

    let resultsArgs = this.resultsArgsGetter();
    let newSlot = paginationArgs.currentPage - 1;
    resultsArgs.currentSlot = newSlot;
    this.resultsArgsSetter(resultsArgs);
    let videos = this.selectVideosToDisplay("pagination-change");
    resultsArgs.videosToDisplay = videos;
    this.resultsArgsSetter(resultsArgs);

    let newState = {};
    Object.assign(newState, {
      paginationArgs: paginationArgs,
      resultsArgs: resultsArgs
    });

    this.syncAndUpdate({ newState });

    return;
  }

  onSkipToPreviousSlot() {
    console.log("previous");
    this.isNewSearchStatusSetter(false);
    let newArgs = this.paginationArgsGetter();
    newArgs.pagesListStart = newArgs.pagesListStart - newArgs.pagesToList;
    newArgs.pagesListEnd = newArgs.pagesListEnd - newArgs.pagesToList;
    newArgs.currentPage = newArgs.pagesListStart;
    newArgs.currentPagesSlot--;
    if (newArgs.pagesListStart < 1) {
      newArgs.pagesListStart = 1;
      newArgs.pagesListEnd = newArgs.pagesToList;
    }
    this.currentPageSetter(newArgs.currentPage);
    this.paginationArgsSetter(newArgs);
    this.handleResultsToDisplay();
    return;
  }

  onReturnToFirstPage() {
    console.log("return to first page");
    this.isNewSearchStatusSetter(false);
    let newArgs = this.paginationArgsGetter();
    newArgs.pagesListStart = 1;
    newArgs.pagesListEnd = newArgs.pagesListEnd + newArgs.pagesToList;
    newArgs.currentPage = 1;
    newArgs.currentPagesSlot = 1;
    //console.log("test222 pagination args skip next", newArgs);
    //this.currentPageSetter(newArgs.currentPage);
    this.paginationArgsSetter(newArgs);
    this.handleResultsToDisplay();
    return;
  }

  paginationBuilder() {
    //console.log("test33003");
    let isNewSearchStatus = this.isNewSearchStatusGetter();

    let paginationArgs = this.paginationArgsGetter();
    if (!paginationArgs) {
      paginationArgs = Presets.paginationArgs;
      //this.paginationArgsSetter(paginationArgs)
      //console.log('test33001 !paginationArgs' ,paginationArgs)
    }

    //console.log('test33004 paginationArgs' ,paginationArgs)
    //console.log('test33005 isNewSearchStatus' ,isNewSearchStatus)

    let pagesListStart = paginationArgs.pagesListStart;
    let pagesToList = paginationArgs.pagesToList; //number of page buttons in the paginator
    let pagesListEnd = pagesListStart + pagesToList;
    let currentPage = paginationArgs.currentPage;
    let currentPagesSlot = Math.ceil(currentPage / pagesToList);
    let resultsGetter = this.allResultsGetter;

    function handleNewPaginaton() {
      //console.log('test33006 handling new pagination')
      let allResults = resultsGetter();
      let currentPage = 1;
      let totalNumberOfResults = allResults.length;
      let perPage = paginationArgs.resultsPerPage;
      let totalNumberOfPages = Math.ceil(totalNumberOfResults / perPage);
      let numberOfPageSlots = Math.ceil(totalNumberOfPages / pagesToList);
      if (totalNumberOfPages <= pagesToList) {
        pagesToList = totalNumberOfPages;
      }

      let args = {
        resultsPerPage: paginationArgs.resultsPerPage, //
        currentPage: currentPage, //
        totalNumberOfResults: totalNumberOfResults, //
        pagesToList: pagesToList,
        pagesListStart: pagesListStart,
        pagesListEnd: pagesListEnd,
        numberOfPageSlots: numberOfPageSlots,
        totalNumberOfPages: totalNumberOfPages,
        currentPagesSlot: currentPagesSlot
      };
      //console.log('test33007 new pag args' , args)
      return args;
    }

    function handleExistingPagination() {
      let args = paginationArgs;
      return args;
    }

    switch (isNewSearchStatus) {
      case true:
        paginationArgs = handleNewPaginaton();
        //console.log("test11005 handling new search");
        break;
      case false:
        paginationArgs = handleExistingPagination();
        //console.log("test11006 handling existing results");
        break;
      default:
        break;
    }

    this.paginationArgsSetter(paginationArgs);
    //console.log('test33009 last args' , paginationArgs)

    return paginationArgs;
  }

  // paginationHandler(action) {
  //   let paginationArgs = this.paginationArgsGetter();
  //   let resultsArgs = this.resultsArgGetter();
  // }

  // // // // // // // // // // // // // // // // // // // // //
  // // //   SUGGESTED/EMBEDDED CONTENT HANDLERS        // // //
  // // // // // // // // // // // // // // // // // // // // //

  onPrevNextButtons(event) {
    console.log("event.target", event.target);
    const headTo = event.target.attributes.head_to.value;
    const btnType = event.target.attributes.btn_type.value;
    let current;
    let args;
    let nextArgsSetter;
    let stateTarget;

    // console.log(
    //   "test 2201 onPrevNextButtons event.target.attributes",
    //   event.target.attributes
    // );
    console.log("headTo", headTo);
    switch (headTo) {
      case "embed-content":
        args = this.embedArgsGetter();
        nextArgsSetter = this.embedArgsSetter;
        stateTarget = "embedArgs";
        break;
      // case "suggested-content":
      //   args = this.suggestedArgsGetter();
      //   nextArgsSetter = this.suggestedArgsSetter;
      //   stateTarget = "suggestedArgs";
      //   break;
      case "most-clicked":
        args = this.mostClickedArgsGetter();
        nextArgsSetter = this.mostClickedArgsSetter;
        stateTarget = "mostClickedArgs";
        break;
      case "most-requested":
        args = this.mostRequestedArgsGetter();
        nextArgsSetter = this.mostRequestedArgsSetter;
        stateTarget = "mostRequestedArgs";
        break;
      case "most-interesting":
        args = this.mostInterestingArgsGetter();
        nextArgsSetter = this.mostInterestingArgsSetter;
        stateTarget = "mostInterestingArgs";
        break;

      default:
        console.log("onPrevNextButtons switch default");
        break;
    }

    current = args.currentSlot;

    switch (btnType) {
      case "prev":
        current--;
        break;
      case "next":
        current++;
        break;
      default:
        console.log("default currentSlot error");
    }

    args.currentSlot = current;

    nextArgsSetter(args);

    let selected = this.selectVideosToDisplay(headTo);

    args.videosToDisplay = selected;

    nextArgsSetter(args);

    let newState = {};
    Object.assign(newState, {
      [stateTarget]: args
    });

    this.syncAndUpdate(newState);
    return;
  }

  // // // // // // // // // // // // // // // // // // // // //
  // // //                 TEST METHODS                 // // //
  // // // // // // // // // // // // // // // // // // // // //

  getAppState(msg) {
    let appState = this.appMethods.appStateCollector();
    console.log(`${msg} controller check, PRNApp State`, appState);
    console.log(
      `${msg} controllerCheck, State Mirror`,
      this.appStateMirrorGetter()
    );
    return appState;
  }

  gettersLog(msg) {
    let logger = this.loggerGetter();
    if (logger == true) {
      //console.log(" defaultQueryG", msg, this.defaultQueryGetter());
      console.log(msg);
      //console.log("onGoingQuery: ", msg, this.onGoingQueryGetter());
      //console.log("searchResults Getter: ", msg, this.searchResultsGetter());
      //console.log("Next State Getter: ", msg, this.appNextStateGetter());
      console.log("State Mirror Getter: ", msg, this.appStateMirrorGetter());
      this.getAppState(msg);
      //console.log("appPropsGetter", msg , this.appPropsGetter());
      //console.log(message, " spinnerController: ", this.spinnerControllerGetter());
      //console.log(message, " appMethodsG", this.appMethodsGetter());
      //console.log(message, " testGetter", this.testGetter());
      console.log("end getters log", msg);
    }
    return;
  }

  cl(message, data) {
    let logger = this.loggerGetter();
    if (logger == true) {
      if (!data) {
        data = null;
      }
      console.log(message, data);
    }
    return;
  }

  test00() {
    console.log("myTest");
    let x = Math.floor(Math.random() * 10);
    let test = { myTest: { val: x } };
    this.syncAndUpdate(test);
    let appState = this.getAppState();
    let mirror = this.appStateMirrorGetter();
    console.log("test00 appState", appState);
    console.log("test00 mirror", mirror);
    return;
  }
}
