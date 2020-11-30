import React from "react";//import ContentCard from "./ContentCard.jsx";


import { PleaseWaitPanel } from "./PleaseWaitPanel.jsx";
//import { ShowCase } from "./ShowCase.jsx";
import { SearchBar } from "./SearchBar.jsx";
import { PaginationBrowser } from "./PaginationBrowser.jsx";
import { ResultsVideoCase } from "./ResultsVideoCase.jsx";
import { TopInfoBox } from "./TopInfoBox.jsx";

export const TopPanel = props => {
  // console.log('test987 toppanel props', props)

    // <div className="toppanel shadowbox" id="toppanel">

  return (
    <div className="toppanel">
   
      {/* <PleaseWaitPanel pleaseWaitPanelProps={props.pleaseWaitPanelProps} /> */}

      <TopInfoBox topInfoBoxProps={props.topInfoBoxProps} />

      <ResultsVideoCase resultsCaseProps={props.resultsCaseProps} />

      <PaginationBrowser paginationProps={props.paginationProps} />

      {/* <div className="center-content" /\* style={{textAlign: "center"}} *\/> */}
      {/*   <PaginationBrowser */}
      {/*     paginationProps={props.paginationProps} */}
      {/*   /> */}
      {/* </div> */}
    </div>
  );
};
