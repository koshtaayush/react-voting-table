import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import './InputStyle.scss';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      venues : [],
      participants: []
    })
  }

  getSearchResult(){
    this.state = ({
      venues : [],
      participants: []
    });
    let ne = this.refs.venueSearchText.value;
    const url = "https://api.foursquare.com/v2/venues/search?client_id=GOYOWCND2OYMVHWLQSXIGNCFWJMRNQPP3N1HZ3J1M1UIZXHT&client_secret=DZBJ0LH5CIP0Z2GG0TNJHY153YT34EF0XFJH0ZD0HEEJ4WT2&query=lunch&near={ne}&v=20170801&limit=3";

    url = url.replace("{ne}", ne);

    axios.get(url).then(resp => {
      this.setState({
        venues : resp.data.response.venues
      })
    });
  }

  changeSelection(idp, col){
    var l = this.state.participants.slice();
    console.log("col clicked" +JSON.stringify(l[idp-1]));
    var t = l[idp-1].props.children[col].props.children == "NS" ? "S" : "NS";
    l[idp-1] = 
     <tr>
        <th><input /></th>
        <th id={idp + 0} onClick={() => this.changeSelection(idp, 0)}>{t}</th>
        <th id={idp + 1} onClick={() => this.changeSelection(idp, 1)}>{t}</th>
        <th id={idp + 2} onClick={() => this.changeSelection(idp, 2)}>{t}</th>
    </tr> ;
    this.setState({
      participants : l
    })
  }

  addParticipant(){
    var plist = this.state.participants.slice();
    var ide = this.state.participants.length + 1;
    plist.push(
      <tr>
        <th><input /></th>
        <th id={ide + 0} onClick={() => this.changeSelection(ide, 0)}>NS</th>
        <th id={ide + 1} onClick={() => this.changeSelection(ide, 1)}>NS</th>
        <th id={ide + 2} onClick={() => this.changeSelection(ide, 2)}>NS</th>
      </tr>
    );
    this.setState({
      participants : plist
    })
  }

  render() {
    var venueRow = [];
    var participantList = [];
    return (
      <div>
        <input className="searchBox" ref="venueSearchText" type="text" />
        <button className="searchBtn" onClick={() => this.getSearchResult()}>Search</button>
        
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
            {this.state.participants}
          </tbody>
        </table> 
        <button className="addPart" onClick={() => this.addParticipant()}>Add participant</button>
        </div>: null}
      </div>
    )
  }
}