import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import './InputStyle.scss';
import config from './config.js';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      venues : [],
      participants: [],
      selectionList:[],
      selectionCount: []
    })
  }

  getSearchResult(){
    this.state = ({
      venues : [],
      participants: [],
      selectionList:[],
      selectionCount: []
    })
      let ne = this.refs.venueSearchText.value;
      if(ne == ""){
        return false;
      }
      
      const url = "https://api.foursquare.com/v2/venues/search?client_id={cid}&client_secret={csid}&query=lunch&near={ne}&v=20170801&limit=3";

      url = url.replace("{ne}", ne).replace("{cid}", config.CLIENT_ID).replace("{csid}", config.CLIENT_SECRET_ID);

      axios.get(url).then(resp => {
        this.setState({
          venues : resp.data.response.venues
        })
      });
    
  }

  changeSelection(idp, col){
    var sl = this.state.selectionList.slice();
    var countList = this.state.selectionCount.slice();

    if(col == 0){
      sl[idp] = [1,0,0];
      countList[countList[0]++, countList[1], countList[2]];
    }else if(col == 1){
      sl[idp] = [0,1,0];
      countList[countList[0], countList[1]++, countList[2]];
    }else if(col == 2){
      sl[idp] = [0,0,1];
      countList[countList[0]++, countList[1], countList[2]++];
    }

    this.setState({
      selectionList: sl
    }, ()=>{

      var l = this.state.participants.slice();
      var ide = this.state.selectionList.length;
    
    l[idp] = 
     <tr>
          <th><input /></th>
          <th id={ide + 0} onClick={() => this.changeSelection(ide-1, 0)}>
          {this.state.selectionList[ide-1][0] == 1 ? "Selected" : "Not Selected"}
          </th>
          <th id={ide + 1} onClick={() => this.changeSelection(ide-1, 1)}>
          {this.state.selectionList[ide-1][1] == 1 ? "Seclected" : "Not Selected"}
          </th>
          <th id={ide + 2} onClick={() => this.changeSelection(ide-1, 2)}>
          {this.state.selectionList[ide-1][2] == 1 ? "Selected" : "Not Selected"}
          </th>
        </tr> ;
    this.setState({
      participants : l
    })
    })
  }

  addParticipant(){
    var plist = this.state.participants.slice();
    var slist = this.state.selectionList.slice();
    slist.push([0,0,0]);
    this.setState({
      selectionList : slist
    }, () => {
      var ide = this.state.selectionList.length;
      plist.push(
        <tr>
          <th><input /></th>
          <th id={ide + 0} onClick={() => this.changeSelection(ide-1, 0)}>
          {this.state.selectionList[ide-1][0] == 1 ? "Selected" : "Not Selected"}
          </th>
          <th id={ide + 1} onClick={() => this.changeSelection(ide-1, 1)}>
          {this.state.selectionList[ide-1][1] == 1 ? "Selected" : "Not Selected"}
          </th>
          <th id={ide + 2} onClick={() => this.changeSelection(ide-1, 2)}>
          {this.state.selectionList[ide-1][2] == 1 ? "Selected" : "Not Selected"}
          </th>
        </tr>
      );
      this.setState({
        participants : plist
      })
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
        <div>* For selecting a venue click on the row of your name and the column name of the venue.</div>
        </div>: null}
      </div>
    )
  }
}