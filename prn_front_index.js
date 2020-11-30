// import React from "react";
// import ReactDOM from "react-dom";
// import PRNApp from "./src/components/PRNApp"; //jsx
// import "bootstrap/dist/css/bootstrap.css";
// import "./styles/style.scss";
import MainController from "./MainController.js";
//import Presets from "./src/methods/Presets.js";

//const reactContent = document.getElementById("react-root"); //refers to index.html
//reactContent ? ReactDOM.render(<PRNApp />, reactContent) : false;
//if reactContent exists return it within <App/> module, otherwise return 'false'

// ReactDOM.render(
//     <App/>, document.getElementById('react-root') //app is injected in index.html
// );

const mainController = new MainController({});

// *** Hot Reload
// if (module.hot) {
//   module.hot.accept();
// }
// *** hot reload on changes (as defined in webpack.conf.js)
