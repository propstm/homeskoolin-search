import React, { Component } from 'react';
import './App.css';
import transcript97 from './resources/homeskoolin-97-transcript.json';
import transcript1 from './resources/corona-1-transcript.json';
import transcript2 from './resources/corona-2-transcript.json';
import transcript3 from './resources/corona-3-transcript.json';
import transcript4 from './resources/corona-4-transcript.json';

let DataSet = transcript97.Content;
let ObjectDataArray = [transcript97, transcript1, transcript2, transcript3, transcript4];

const styleInfo = {

}
const elementStyle ={
  border:'solid',
  borderRadius:'10px',
  position:'relative',
  marginTop:'2vh',
  marginBottom:'5vh'
}

const timestampContentStyle={
  fontSize:18
}

const episodeTitleStyle ={
  fontSize:13,
  position:'relative'
}

let urlPathAndTime = transcript97.URL
let youtubeURL = urlPathAndTime;
let emptyStr = "";
class App extends React.Component {
  constructor() {
    super();
    this.state = {search: null,
    urlPath: urlPathAndTime,
    youtubePath: urlPathAndTime
    };
  }

  componentDidUpdate(prevProps, prevState) { 
    if ('data' in this.props && this.props.data !== prevProps.data) {
        const data = this.props.data;
        this.setState({
            data: {
                update: data.lastUpdate,
                confirmed: data.confirmed,
                recovered: data.recovered,
                deaths: data.deaths
            }
        });
    }
  }

  convertTimestampToSeconds(timestampVal){
    let hoursPreConvert;
    let seconds;
    var timestampSpllit = timestampVal.split(":");
    hoursPreConvert = parseInt(timestampSpllit[0]);
    seconds = parseInt(timestampSpllit[1]);
    return (hoursPreConvert*60) + seconds - 2;

  }
  updateUrlPathStateVal(newUrl, e){
    e.preventDefault();
    console.log('update url path clicked');
    if(this.state.urlPath != newUrl){
      this.setState({
        youtubePath: newUrl
      });
    }
    youtubeURL = newUrl;

  }



  render(){
    let allItems = [];
    let items;
    let objects = ObjectDataArray.filter((object)=>{
      items = object.Content.filter((data)=>{
        if(this.state.search == null || this.state.search == ""){
            items = [];
            return null;
      }else if(data.Text.toLowerCase().includes(this.state.search.toLowerCase())){
            return data;
        }
      }).map(data=>{
        let timetoSeconds = this.convertTimestampToSeconds(data.Timestamp);
        urlPathAndTime = object.URL+"&start="+timetoSeconds;
        return(
        <div>
          <ul style={{listStyleType:'none'}}>
            <li style={{position:'relative'}}>
              {/* Need to revisit the URL path logic. All links are currently using the last result in the data set. */}
             <a href="javacript:return false;" onClick={(e) => this.updateUrlPathStateVal(urlPathAndTime, e) } ><span style={timestampContentStyle}>{data.Timestamp}</span></a>
             <span style={timestampContentStyle}>  {data.Text}</span><br/>
             <span style={episodeTitleStyle}>{object['Episode Title']}</span>
            </li>
          </ul>
        </div>
        )
      });
      allItems = allItems.concat(items);

    }).map(data=>{

    });

    return (

      <div className="App">
        <header className="App-header">
          {/* <SearchBar /> */}
          <div className="searchBar">
            <div className="youtubeEmbed">
          
            <iframe width="560" height="315" src={`${youtubeURL}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <label htmlFor="search">Search Query:</label>
            <input type="text" placeholder="Enter item to be searched"  onChange={(e)=> {
              this.setState({
                search: e.target.value
              });
            }
            } />
          </div>

        </header>
        <div className="contentResults">
            {allItems}
          </div>
      </div>
    )
  }
}



export default App;
