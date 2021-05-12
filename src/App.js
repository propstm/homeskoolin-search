import React, { useState, useEffect } from 'react';
import './App.css';
import transcript97 from './resources/homeskoolin-97-transcript.json';
import transcript1 from './resources/corona-1-transcript.json';
import transcript2 from './resources/corona-2-transcript.json';
import transcript3 from './resources/corona-3-transcript.json';
import transcript4 from './resources/corona-4-transcript.json';
import transcript5 from './resources/corona-5-transcript.json';
import transcript6 from './resources/corona-6-transcript.json';
import transcript7 from './resources/corona-7-transcript.json';
import transcript8 from './resources/corona-8-transcript.json';
import transcript9 from './resources/corona-9-transcript.json';
import transcript10 from './resources/corona-10-transcript.json';
import transcriptH97 from './resources/homeskoolin-97-transcript.json';

let DataSet = transcript97.Content;
let ObjectDataArray = [transcriptH97, transcript1, transcript2, transcript3, transcript4, transcript5, transcript6, transcript7, transcript8, transcript9, transcript10];


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

function convertTimestampToSeconds(timestampVal){
  let hoursPreConvert;
  let seconds;
  var timestampSpllit = timestampVal.split(":");
  hoursPreConvert = parseInt(timestampSpllit[0]);
  seconds = parseInt(timestampSpllit[1]);
  return (hoursPreConvert*60) + seconds - 2;

}

const VideoPlayer = () =>{
  return (
    <div className="youtubeEmbed">
      {/* <iframe width="560" height="315" src={`${youtubeURL}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
    </div>
  )
}

const FilterResult = (props) => {

  const [urlPath, setUrlPath] = useState(urlPathAndTime);
  const [youtubePath, setYoutubePath] = useState(urlPathAndTime);

  useEffect(() => { 
    console.log('Filter Result Props:' + props);
  });

  const updateUrlPath = (newUrl, e) => {
    e.preventDefault();
    console.log('update url path clicked');
    console.log(newUrl);
    if(urlPath != newUrl){
      setUrlPath(newUrl);
    }
  
  }

  return (

    <li style={{position:'relative'}}>
    {/* Need to revisit the URL path logic. All links are currently using the last result in the data set. */}
   <a href="javacript:return false;" onClick={(e) => updateUrlPath(urlPath, e) } ><span style={timestampContentStyle}>{props.dataObj.Timestamp}</span></a>
   <span style={timestampContentStyle}>  {props.dataObj.Text}</span><br/>
   <span style={episodeTitleStyle}>{props.obj['Episode Title']}</span>
  </li>
  )
}

const Filter = (props) => {
  const [allItems, setAllItems] = useState([]);
  let items;
  const [search, setSearch] = useState();

  useEffect(() => { 
    if(props.search.length > 3){
      console.log('filter use effect fired /Search Value:' + props.search);
      let objects = ObjectDataArray.filter((object)=>{
        items = object.Content.filter((data)=>{
          if(props.search == null || props.search == ""){
              items = [];
              // console.log('returning null');
              return null;
          }else if(data.Text.toLowerCase().includes(props.search.toLowerCase())){
            return data;
  
          }
        }).map(data=>{
          let timetoSeconds = convertTimestampToSeconds(data.Timestamp);
          urlPathAndTime = object.URL+"&start="+timetoSeconds;

          return(
              <FilterResult obj = {object} dataObj = {data} />
          )
        });
        setAllItems(allItems.concat(items));
      }).map(data=>{
    
      });  
    }

  }, [props]);
  
  return(
    <div className="contentResults">
      <div>
        <ul style={{listStyleType:'none'}}>
          {allItems}
        </ul>
      </div>
    </div>
  );
}


const App = () => {
  const [search, setSearch] = useState('');

    return (
      <div className="App">
        <header className="App-header">
          {/* <SearchBar /> */}
          <div className="searchBar">
            <VideoPlayer />
            <label htmlFor="search">Search Query:</label>
            <input type="text" 
              placeholder="Enter item to be searched"  
              onChange={(e)=> { if(e.target.value != search){
                console.log('search changed to: ' + e.target.value);
                setSearch(e.target.value);
              }}}             
              />
          </div>

        </header> 
        <Filter search = {search} />
      </div>
    )
}

export default App;
