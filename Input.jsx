import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';


export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      venues : [],
      participants: []
    })
  }

  getSearchResult(){
    console.log("inside fucntiuo");
    const url = "https://api.foursquare.com/v2/venues/search?client_id=GOYOWCND2OYMVHWLQSXIGNCFWJMRNQPP3N1HZ3J1M1UIZXHT&client_secret=DZBJ0LH5CIP0Z2GG0TNJHY153YT34EF0XFJH0ZD0HEEJ4WT2&query=lunch&near=Amsterdam&v=20170801&limit=3";

    axios.get(url).then(resp => {
      var venueRow = 
      console.log(resp.data.response.venues);
      this.setState({
        venues : resp.data.response.venues
      })
    });
  }

  addParticipant(){

  }

  render() {
    var venueRow = [];
    var participantList = [];
    return (
      <div>
        <input type="text" />
        <button onClick={() => this.getSearchResult()}>Search</button>
        
        {this.state.venues.length > 0 ? 
        <div>
        <table>
          <tbody>
            <tr>
              <th>Participant</th>
              {this.state.venues[0] ? <th>{this.state.venues[0].name}</th> : null }
              {this.state.venues[1] ? <th>{this.state.venues[1].name}</th> : null}
              {this.state.venues[2] ? <th>{this.state.venues[2].name}</th> : null}
            </tr>
            {participantList}
          </tbody>
        </table> 
        <button onClick={() => this.addParticipant()}>Add participant</button>
        </div>: null}
      </div>
    )
  }
}