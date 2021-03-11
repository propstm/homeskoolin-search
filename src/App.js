import React, { Component } from 'react';
import './App.css';
import transcript97 from './resources/homeskoolin-97-transcript.json';

let DataSet = transcript97.Content;

const styleInfo = {
  paddingRight:'10px'
}
const elementStyle ={
  border:'solid',
  borderRadius:'10px',
  position:'relative',
  left:'10vh',
  height:'3vh',
  width:'20vh',
  marginTop:'5vh',
  marginBottom:'10vh'
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
    console.log('render is running.');
    let items = DataSet.filter((data)=>{
      if(this.state.search == null)
          return null;
      else if(data.Text.toLowerCase().includes(this.state.search.toLowerCase())){
          console.log('Matched ' + this.state.search.toLowerCase() + ' to Data Object:' + data.content);
          return data;
      }
    }).map(data=>{
      let timetoSeconds = this.convertTimestampToSeconds(data.Timestamp);
      console.log('TIME TO SECONDS:' + timetoSeconds);
      urlPathAndTime = transcript97.URL+"&start="+timetoSeconds;
      //urlPathAndTime = "&t="+timetoSeconds;
      return(
      <div>
        <ul>
          <li style={{position:'relative',left:'10vh'}}>
           <a href="javacript:return false;" onClick={(e) => this.updateUrlPathStateVal(urlPathAndTime, e) } ><span style={styleInfo}>{data.Timestamp}</span> </a>
            <span style={styleInfo}>{data.Text}</span>
          </li>
        </ul>
      </div>
      )
    })

    return (

      <div className="App">
        <header className="App-header">
          {/* <SearchBar /> */}
          <div className="searchBar">
            <div className="youtubeEmbed">
            {/* {`https://www.youtube.com/embed/dHFVfWs0NK4${emptyStr}`}<br/>
            {`${urlPathAndTime}`}<br/> */}
          
            <iframe width="560" height="315" src={`${youtubeURL}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <label htmlFor="search">Search Query:</label>
            <input type="text" placeholder="Enter item to be searched"  onChange={(e)=> {
              console.log("-------------------");
              console.log("Old state value:" + this.state.search); 
              this.setState({
                search: e.target.value
              });
              
              console.log("updating state to:" + e.target.value)
            }
            } />
          </div>
          {items}
        </header>
      </div>
    )
  }
}



export default App;
