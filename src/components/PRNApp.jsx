//console.log("test");

// //node_modules
import React from "react";
import ReactDOM from "react-dom";
//import WindowSizeListener from "react-window-size-listener";
//import $ from "jquery";
const axios = require("axios");
import "core-js/stable";
import "regenerator-runtime";

// //react-bootstrap
//import Button from "react-bootstrap/Button";
//import Container from "react-bootstrap/Container";
//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";
// //src/components
import { TopPanel } from "./TopPanel.jsx";
import { BottomPanel } from "./BottomPanel.jsx";
import { SidePanel } from "./SidePanel.jsx";

import { AlertModal } from "./AlertModal.jsx";
//import { ContentCard } from "./ContentCard.jsx";
import { SearchBar } from "./SearchBar.jsx";
import { StickyPanel } from "./StickyPanel.jsx";
import { PleaseWaitPanel } from "./PleaseWaitPanel.jsx";

//import TestComponent from "./TestComponent.jsx";
//import TestEmbedVideo from "./../methods/TestEmbedVideo.jsx";
// //src/methods
//import PRN from "../methods/PRN.js";
//import TestFunction from "../methods/TestFunction.js";

const searchUrl = "http://localhost:5000/search";
//let renderCounter = 0;

export default class PRNApp extends React.Component {
  constructor(props) {
    //console.log("running PRNApp, received props: ");

    super(props);

    this.ToolSet = this.props.controllerArgs.toolSet;
    //controller methods
    this.DataSet = this.props.controllerArgs.dataSet;
    //controller data
    this.responsiveCssSet = this.props.controllerArgs.responsiveCssSet;

    this.state = this.DataSet.initState;

    //this.testController = this.ToolSet.testController;
    this.searchTypes = this.DataSet.searchTypes; //TODO remove
    this.relatedCategories = this.DataSet.relatedCategories;

    // *** Bind
    this.appMethodsCollector = this.appMethodsCollector.bind(this);
    this.appStateUpdater = this.appStateUpdater.bind(this);
    this.appStateCollector = this.appStateCollector.bind(this);
    this.cardStatusCollector = this.cardStatusCollector.bind(this);
    this.consoleState = this.consoleState.bind(this);
    //
    //this.unload.bind(this);
    this.onUnload = this.onUnload.bind(this);
    //this.test1 = this.test1.bind(this);

    this.responsiveCssSetter = incomingCss => {
      this.responsiveCssSet = incomingCss;
    };

    this.responsiveCssGetter = () => {
      return this.responsiveCssSet;
    };
  }

  // // // // // // // // // // // // // // // // // // // // //
  // // //              LIFE CYCLE METHODS              // // //
  // // // // // // // // // // // // // // // // // // // // //

  componentDidMount() {
      //console.log("this", this);
      //console.log('responsiveCssSet', this.responsiveCssGetter())
    this.ToolSet.grabAppMethods(this.appMethodsCollector());

    window.addEventListener(
      "resize",
      event =>
        //this.Toolset.onResponsiveResize()
        this.ToolSet.onResponsiveResize()
      //this.responsiveAdapter()
    );

    window.addEventListener(
      "beforeunload",
      event => this.onUnload(event) // {
      //   //event.preventDefault();
      //   //await this.ToolSet.saveSessionData();
      //   // try{
      //   //         await this.ToolSet.saveSessionData();
      //   // }
      //   // catch(err){
      //   //     console.log('test87001 catched error' , err)
      //   //     console.log('test87001 catched error' , event)
      //   // }
      //   //window.location
      // }
    );
  }

  async onUnload(event) {
    //event.preventDefault();
    //console.log("test87001 unloading page...");

    try {
      await this.ToolSet.saveSessionData();
    } catch (err) {
      //console.log("test87001 catched error", err);
      //console.log("test87001 event", event);
    }

    return;
  }

  responsiveAdapter() {
    this.ToolSet.onResponsiveResize();
    //console.log('test55000 css to apply:' , newCss)
    //let responsiveCss = this.responsiveCssGetter();
    //console.log('test55001 present css:' , responsiveCss)
    //this.responsiveCssSetter(newCss)
    //console.log('test55001 applied css:',this.responsiveCssGetter())
  }

  // // // // // // // // // // // // // // // // // // // // //
  // // //               CONTROLLER METHODS             // // //
  // // //         methods for Controller actions       // // //
  // // // // // // // // // // // // // // // // // // // // //
  // ***

  appStateCollector() {
    return this.state;
  }

  cardStatusCollector(cardId) {
    let cardStatusName = "cardStatus" + cardId;
    console.log("cardStatus: ", cardId, this.state[cardStatusName]);
    return this.state[cardStatusName];
  }

  appMethodsCollector() {
    //console.log("running appMethodsCollector");
    // *** generate object with  methods needed by Controller
    // *** Controller grabs object with grabAppMethods()
    const appMethods = {
      setStateTest: this.setStateTest,
      appStateUpdater: this.appStateUpdater,
      consoleState: this.consoleState,
      appStateCollector: this.appStateCollector,
      cardStatusCollector: this.cardStatusCollector
    };
    return appMethods;
  }

  appStateUpdater(nextState) {
    this.setState(
      nextState, // setState argument
      () => {
        this.ToolSet.mirrorSync(this.state);
      } //callback
    );
    // *** callback function after state update copies app state in
    // *** its controller mirror
  }

  // // // // // // // // // // // // // // // // // // // // //
  // // //                PROPS PACKAGERS               // // //
  // // // // // // // // // // // // // // // // // // // // //

  stickyPanelPropsPackager() {
    const stickyPanelProps = {
      logo: this.DataSet.logo,
      headTo: "sticky-panel",
      mobileMenuArgs: this.state.mobileMenuArgs
      //mobileMenuHandler: this.ToolSet.stickyPanelHandlers
    };
    //console.log("test1000 logo", stickyPanelProps);
    return stickyPanelProps;
  }

  searchBarPropsPackager() {
    const searchBarProps = {
      headTo: "search-bar",
      handlers: this.ToolSet.searchHandlers,
      searchBarArgs: this.state.searchBarArgs
    };
    return searchBarProps;
  }

  relatedCategoriesPropsPackager() {
    const relatedCategoriesProps = {
      headTo: "related-categories",
      categories: this.state.relatedCategories,
      handlers: this.ToolSet.relatedCategoriesHandlers,
      onSearchRelatedCategories: this.ToolSet.relatedCategoriesHandlers
        .onSearchRelatedCategories,
      test: "test"
    };
    //console.log('test8877 ++' , relatedCategoriesProps)
    return relatedCategoriesProps;
  }

  resultsCasePropsPackager() {
    const resultsCaseProps = {
      headTo: "search-results",
      caseData: this.state.resultsArgs,
      cardHandlers: this.ToolSet.resultsHandlers
    };
    return resultsCaseProps;
  }

  mostClickedCasePropsPackager() {
    const sideCaseProps = {
      headTo: "most-clicked",
      caseData: this.state.mostClickedArgs,
      cardHandlers: this.ToolSet.resultsHandlers
    };
    return sideCaseProps;
  }

  mostInterestingCasePropsPackager() {
    const sideCaseProps = {
      headTo: "most-interesting",
      caseData: this.state.mostInterestingArgs,
      cardHandlers: this.ToolSet.resultsHandlers
    };
    return sideCaseProps;
  }

  mostRequestedCasePropsPackager() {
    const sideCaseProps = {
      headTo: "most-requested",
      caseData: this.state.mostRequestedArgs,
      cardHandlers: this.ToolSet.resultsHandlers
    };
    return sideCaseProps;
  }

  embedCasePropsPackager() {
    const embedCaseProps = {
      //videoList: this.state.embeddedVideos,
      headTo: "embed-content",
      caseData: this.state.embedArgs,
      cardHandlers: this.ToolSet.resultsHandlers,
      //
      videoToDisplay: this.state.embedArgs.videosToDisplay
    };
    //console.log("test3333 embedCaseProps", embedCaseProps);
    return embedCaseProps;
  }

  pleaseWaitPanelPropsPackager() {
    const pleaseWaitPanelProps = {
      showPanel: this.state.pleaseWaitPanel.showPanel,
      message: this.state.pleaseWaitPanel.message,
      keywords: this.state.pleaseWaitPanel.keywords
    };
    return pleaseWaitPanelProps;
  }

  topInfoBoxPropsPackager() {
    const topInfoBoxProps = {
      showKeywords: this.state.topInfoBox.showKeywords,
      message: this.state.topInfoBox.message,
      keywords: this.state.topInfoBox.keywords
    };
    return topInfoBoxProps;
  }

  sidePanelPropsPackager() {
    const sidePanelProps = {
      adsData: this.state.adsData,
      test: "test",
      headTo: "side-panel"
    };
    return sidePanelProps;
  }

  paginationPropsPackager() {
    const paginationProps = {
      headTo: "results-pagination",
      handlers: this.ToolSet.paginationHandlers,
      paginationArgs: this.state.paginationArgs,
      currentPage: this.state.page
    };
    //console.log("paginationProps", paginationProps);
    return paginationProps;
  }

  bottomPanelPropsPackager() {
    const bottomPanelProps = {
      headTo: "bottom-panel"
      // caseData: this.state.embedArgs,
      // handlers: this.ToolSet.embeddedHandlers,
      // embedArgs: {
      //   totalSlots: this.state.embedArgs.totalSlots,
      //   currentSlot: this.state.embedArgs.currentSlot
      // }
    };
    return bottomPanelProps;
  }

  alertModal() {
    let modalShow = this.state.alertModal.show;
    if (modalShow == true) {
      return (
        <AlertModal
          modalData={this.state.alertModal}
          modalHandlers={this.ToolSet.modalHandlers}
        />
      );
    } else {
      return null;
    }
  }

  // // // // // // // // // // // // // // // // // // // // //
  // // //                TEST METHODS                  // // //
  // // // // // // // // // // // // // // // // // // // // //

  consoleState() {
    console.log("current state is", this.state);
  }

  // // // // // // // // // // // // // // // // // // // // //
  // // //              END OF  METHODS                 // // //
  // // // // // // // // // // // // // // // // // // // // //

  render() {
    return (
        <div className={this.state.responsiveCss}>
        <StickyPanel
          searchBarProps={this.searchBarPropsPackager()}
          relatedCategoriesProps={this.relatedCategoriesPropsPackager()}
          stickyPanelProps={this.stickyPanelPropsPackager()}
        ></StickyPanel>

        <PleaseWaitPanel
          pleaseWaitPanelProps={this.pleaseWaitPanelPropsPackager()}
          //
        />

        <div
          className="panels-wrapper"
          //fluid //
        >
          {this.alertModal()}

          <TopPanel
            //className="topgrid"
            pleaseWaitPanelProps={this.pleaseWaitPanelPropsPackager()} //
            topInfoBoxProps={this.topInfoBoxPropsPackager()} //
            //showCaseProps={this.showCasePropsPackager()}
            //searchBarProps={this.searchBarPropsPackager()}
            paginationProps={this.paginationPropsPackager()}
            resultsCaseProps={this.resultsCasePropsPackager()} //
          />

          <SidePanel
            sidePanelProps={this.sidePanelPropsPackager()}
            //suggestedCaseProps={this.suggestedCasePropsPackager()}
            mostClickedProps={this.mostClickedCasePropsPackager()}
            mostInterestingProps={this.mostInterestingCasePropsPackager()}
            mostRequestedProps={this.mostRequestedCasePropsPackager()}
          />

          <BottomPanel
            bottomPanelProps={this.bottomPanelPropsPackager()}
            embedCaseProps={this.embedCasePropsPackager()}
          />
        </div>

        <button onClick={this.consoleState} variant="warning">
          console state
        </button>

        {/* <Button onClick={this.resetSearch} variant="warning"> */}
        {/*   console state */}
        {/* </Button> */}
      </div>
    );
  }
}
