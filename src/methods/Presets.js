import dummyThumbnail from "../../img/transparentThumb.png";
import logoDark from "../../img/logodark.png";
import logoLight from "../../img/logolight.png";

// import dummyVprev01 from "../../img/dummyVprev01.jpg";
// import dummyVprev02 from "../../img/dummyVprev02.jpg";
// import dummyVprev03 from "../../img/dummyVprev03.jpg";

const loadIcon = "xxx";
const url = "http://localhost:5000/search";
const resultsPerPage = 24;
const resultsPerPageAlt1 = 24;
const resultsPerPageAlt2 = 25;

const embeddedPerPage = 8;
const suggestedPerPage = 4;
const interestingPerPage = 6;
const requestedPerPage = 6;
const clickedPerPage = 6;

const Presets = {
  sessionId: "Default-Session-ID",
  cardData: {
    cardId: null,
    default_thumb: { src: dummyThumbnail },
    thumbs: [
      {
        width: 640,
        height: 360,
        size: "big",
        src: dummyThumbnail
      }
    ],
    //
    title: loadIcon,
    rate: loadIcon,
    views: loadIcon,
    added: loadIcon,
    lenght_sec: null,
    embed: ""
  },

  fallBackQuery: {
    url: url,
    query: "funny",
    page: 1,
    per_page: 8,
    type: "videos",
    method: "POST",
    responseType: "json"
  },

  searchTypes: {
  },

  userData: {
    //event tracker
    sessionId: "Default-Session-ID",
    sessionData: []
  },

  paginationArgs: {
    currentPage: 1,
    resultsPerPage: resultsPerPage,
    totalNumberOfResults: 0,
    pagesToList: 3, //number of page buttons to list in pagination
    pagesListStart: 1,
    numberOfPageSlots: 1, //total number of pages / pages to list
    totalNumberOfPages: 1,
    currentPagesSlot: 0 //slots of pages 0[1/2/3] - 1[4/5/6] - 2[7/8/9] (array index)
  },

  embeddedVideos: {
    videosToDisplay: [],
    perPage: embeddedPerPage,
    //currentPage: 1,
    currentSlot: 0, //index of array
    totalSlots: 1
  },

  // suggestedVideos: {
  //   videosToDisplay: [],
  //   perPage: suggestedPerPage,
  //   currentSlot: 0,
  //   totalSlots: 1
  // },

  resultsVideos: {
    videosToDisplay: [],
      perPage: resultsPerPage,
      perPageAlt1:resultsPerPageAlt1,
      perPageAlt2:resultsPerPageAlt2,
    currentSlot: 0,
    totalSlots: 1
    //currentPage:1
  },

  mostClicked: {
    videosToDisplay: [],
    perPage: clickedPerPage,
    currentSlot: 0,
    totalSlots: 1
  },
  mostRequested: {
    videosToDisplay: [],
    perPage: requestedPerPage,
    currentSlot: 0,
    totalSlots: 1
  },
  mostInteresting: {
    videosToDisplay: [],
    perPage: interestingPerPage,
    currentSlot: 0,
    totalSlots: 1
  },

  searchBar: {
    placeHolder: "type something here"
  },

  relatedCategories: [],

  logo: { dark: logoDark, light: logoLight },

  alertModal: {
    show: false,
    message: "default message Presets.js"
  },

  pleaseWaitPanel: {
    showPanel: false,
    show: false,
    message: "",
    keywords: ""
  },

  topInfoBox: {
    showKeywords: true,
    message: "loading...",
    keywords: ""
  },

  titles: {
    suggestedCase: "",
    resultsCase: ""
  },

  mobileMenuArgs: {
    searchBar: false,
    categories: false
  },

  //dynamicCss: "on-loading-page",

  breakPoints: [
    {
      minSize: 0,
      maxSize: 499,
      respClass: "x-small",
      sideCols: 1,
      mainCols: 1,
	resultsPerPage:resultsPerPage,
	resultsPerPageAlt1:resultsPerPageAlt1,
	resultsPerPageAlt2:resultsPerPageAlt2
    },
    {
      minSize: 500,
      maxSize: 899,
      respClass: "small",
      sideCols: 1,
      mainCols: 1,
	resultsPerPage:resultsPerPage,
	resultsPerPageAlt1:resultsPerPageAlt1,
	resultsPerPageAlt2:resultsPerPageAlt2
    },
    {
      minSize: 900,
      maxSize: 1199,
      respClass: "medium",
      sideCols: 1,
      mainCols: 1,
	resultsPerPage:resultsPerPage,
	resultsPerPageAlt1:resultsPerPageAlt1,
	resultsPerPageAlt2:resultsPerPageAlt2
    },
    {
      minSize: 1200,
      maxSize: 1499,
      respClass: "large",
      sideCols: 1,
      mainCols: 1,
	resultsPerPage:resultsPerPage,
	resultsPerPageAlt1:resultsPerPageAlt1,
	resultsPerPageAlt2:resultsPerPageAlt2
    },
    {
      minSize: 1500,
      maxSize: 1799,
      respClass: "x1-large",
      sideCols: 1,
      mainCols: 5,
	resultsPerPage:resultsPerPage,
	resultsPerPageAlt1:resultsPerPageAlt1,
	resultsPerPageAlt2:resultsPerPageAlt2
    },
    {
      minSize: 1800,
      maxSize: 2099,
      respClass: "x2-large",
      sideCols: 1,
	mainCols:1,
	resultsPerPage:resultsPerPage,
	resultsPerPageAlt1:resultsPerPageAlt1,
	resultsPerPageAlt2:resultsPerPageAlt2
    },
    {
      minSize: 2100,
      maxSize: 2500,
      respClass: "x3-large",
      sideCols: 1,
      mainCols: 5,
	resultsPerPage:resultsPerPage,
	resultsPerPageAlt1:resultsPerPageAlt1,
	resultsPerPageAlt2:resultsPerPageAlt2
    }
    // ,
    // {
    //   minSize: 1680,
    //   maxSize: 1919,
    //   respClass: "x4-large",
    //   sideCols: 1,
    //   mainCols: 1
    // },
    // {
    //   minSize: 1920,
    //   maxSize: 2227,
    //   respClass: "x5-large",
    //   sideCols: 1,
    //   mainCols: 1
    // }
  ]
};

export default Presets;
