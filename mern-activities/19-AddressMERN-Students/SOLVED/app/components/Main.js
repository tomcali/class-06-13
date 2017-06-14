// Include React
// var React = require("react");
//
// // Here we include all of the sub-components
// var Form = require("./children/Form");
// var Results = require("./children/Results");
// var History = require("./children/History");
//
// // Helper for making AJAX requests to our API
// var helpers = require("./utils/helpers");
//
// // Creating the Main component
// var Main = React.createClass({
// import React from 'react';
import React, { Component } from 'react';  // Component is coming from react.Component
import Form from './children/Form';
import Results from './children/Results';
import History from './children/History';
import helpers from './utils/helpers';

class Main extends React.Component {

  // whenever you instantiate anything from Main
    // instantiate an object off a class
    //
  constructor(props) {
    super(props);   // instantiate this class
      this.state = { searchTerm: '', results: '', history: []};  // setting the state of Main

  };

  // Here we set a generic state associated with the number of clicks
  // Note how we added in this history state variable
  // getInitialState: function() {
  //   return { searchTerm: "", results: "", history: [] };
  // },

  // The moment the page renders get the History
  componentDidMount (){
    // Get the latest history.
    helpers.getHistory().then(function(response) {
      console.log(response);
      if (response !== this.state.history) {
        console.log("History", response.data);
        this.setState({ history: response.data });
      }
    }.bind(this));
  };

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate (){

    // Run the query for the address
    helpers.runQuery(this.state.searchTerm).then(function(data) {
      if (data !== this.state.results) {
        console.log("Address", data);
        this.setState({ results: data });

        // After we've received the result... then post the search term to our history.
        helpers.postHistory(this.state.searchTerm).then(function() {
          console.log("Updated!");

          // After we've done the post... then get the updated history
          helpers.getHistory().then(function(response) {
            console.log("Current History", response.data);

            console.log("History", response.data);

            this.setState({ history: response.data });

          }.bind(this));
        }.bind(this));
      }
    }.bind(this));
  };
  // This function allows childrens to update the parent.
  setTerm (){
    this.setState({ searchTerm: term });
  };
  // Here we render the function
  render (){
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">Address Finder!</h2>
            <p className="text-center">
              <em>Enter a landmark to search for its exact address (ex: "Eiffel Tower").</em>
            </p>
          </div>

          <div className="col-md-6">

            <Form setTerm={this.setTerm} />

          </div>

          <div className="col-md-6">

            <Results address={this.state.results} />

          </div>

        </div>

        <div className="row">

          <History history={this.state.history} />

        </div>

      </div>
    );
  }
};

// Export the component back for use in other files
// module.exports = Main;
export default Main;