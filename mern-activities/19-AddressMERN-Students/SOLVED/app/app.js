// Include the Main React Dependencies
// var React = require("react");
// var ReactDOM = require("react-dom");
//
// // Include the main Main Component
// var Main = require("./components/Main");

import React from 'react';
import ReactDOM from 'react-dom';

import Main from './components/Main';

// This code here allows us to render our main component (in this case Main)
ReactDOM.render(<Main />, document.getElementById("app"));
