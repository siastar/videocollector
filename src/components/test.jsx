import React from "react";
import axios from "axios";

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charactersData: [],
      locationsData: [],
      episodesData: []
    }; //define params here and pass to function
    this.params = {};
  }

  componentDidMount() {
    // Foreach key in the endPoints we hit the AXIOS GET.
    Object.keys(endPoints).forEach(key => {
      // Call Axios from here
      this.getDataFromEndpoints(endPoints[key], this.params, key);
    });
  }
  /**API ENDPOINT FUNCTIONS */

  getDataFromEndpoints = (endPoint, params, stateKey) => {
    this.setState(
      {
        [`${stateKey}DataLoading`]: true,
        [`${stateKey}Data`]: [],
        [`${stateKey}DataError`]: null
      },
        
      () => {
        axios
          .get(`${BASE_URL}${endPoint}`)
          .then(res => {
            const { data } = res;
            this.setState({
              [`${stateKey}DataLoading`]: false,
              [`${stateKey}Data`]: data.results,
              [`${stateKey}DataError`]: false
            });
          })
          .catch(error => {
            if (error.response) {
              /** The request was made and the server responded with a status code that falls out of the range of 2xx **/
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              /** The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js **/
              console.log(error.request);
            } else {
              /** Something happened in setting up the request that triggered an Error **/
              console.log("Error", error.message);
            } /** Setting DataError true and DataErrorString **/

            this.setState({
              [`${stateKey}DataLoading`]: false,
              [`${stateKey}DataError`]: true,
              [`${stateKey}DataErrorString`]: error.message
            });
            console.log(error.config);
          });
      }
    );
  };
}
