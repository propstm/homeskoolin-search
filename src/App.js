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

let originalPath = transcript97.URL

function convertTimestampToSeconds(timestampVal){
  let hoursPreConvert;
  let seconds;
  var timestampSpllit = timestampVal.split(":");
  hoursPreConvert = parseInt(timestampSpllit[0]);
  seconds = parseInt(timestampSpllit[1]);
  return (hoursPreConvert*60) + seconds - 2;

}

const VideoPlayer = (props) =>{
  useEffect(() => { 
    console.log('Video Props:');
    console.log(props);
  });
  return (
    <div className="youtubeEmbed">
      <iframe width="560" height="315" src={props.videoURL} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
  )
}

const FilterResult = (props) => {

  useEffect(() => { 
    console.log('Filter Result Props:');
    console.log(props);
  });

  const updateUrlPath = (pathAndTime, e) => {
    e.preventDefault();
    props.loadVideoHander(pathAndTime);
    console.log('url path clicked' + pathAndTime);
  }

  return (

    <li style={{position:'relative'}}>
    {/* Need to revisit the URL path logic. All links are currently using the last result in the data set. */}
    <a href="javacript:return false;" onClick={(e) => updateUrlPath(props.pathAndTime, e) } ><span style={timestampContentStyle}>{props.dataObj.Timestamp}</span></a>
    <span style={timestampContentStyle}>  {props.dataObj.Text}</span><br/>
    <span style={episodeTitleStyle}>{props.obj['Episode Title']}</span>
    </li>
  )
}


const Filter = (props) => {
  let items;
  let allItems = [];


  useEffect(() => { 
  });

  let objects = ObjectDataArray.filter((object)=>{
    items = object.Content.filter((data)=>{
      if(props.search == null || props.search == ""){
          items = [];
          return null;
    }else if(data.Text.toLowerCase().includes(props.search.toLowerCase())){
          return data;
      }
    }).map(data=>{
      let timetoSeconds = convertTimestampToSeconds(data.Timestamp); 
      
      console.log('object URL: ' +object.URL);
      let urlPathAndTime = object.URL+"&start="+timetoSeconds;
      return(
      
          <FilterResult obj = {object} pathAndTime = {urlPathAndTime} dataObj = {data} key={Math.random()} loadVideoHander = { props.loadVideoHander }/>
      )
    });
    allItems = allItems.concat(items);

  }).map(data=>{

  });

  return (<div>
            <ul style={{listStyleType:'none'}}>{allItems}</ul>
          </div>
        )
}



const App = () => {

  const [urlPath, setUrlPath] = useState(originalPath);
  const [search, setSearch] = useState('');
  
    //https://www.freecodecamp.org/news/javascript-debounce-example/
  function debounce(func, timeout = 500){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
  function saveInput(query){
    console.log('Saving data:' + query);
    setSearch(query);
  }

  const updateUrlPath = (pathAndTime) => {

    console.log('update url path clicked - APP');
    console.log(pathAndTime);
    
    if(urlPath != pathAndTime){
      console.log('URL PATH CHANGED');
      console.log('------------------');
      setUrlPath(pathAndTime);
    }
  }
  const processChange = debounce((query) => saveInput(query));

      return (
        <div className="App">
          <header className="App-header">
            {/* <SearchBar /> */}
            <div className="searchBar">
              <VideoPlayer videoURL = {urlPath} />
              <label htmlFor="search">Search Query:</label>
              <input type="text" 
                placeholder="Enter item to be searched"  
                onChange={(e)=> { 
                  
                    processChange(e.target.value);
                  }}             
                />
            </div>

            <Filter search = {search} key="999999" loadVideoHander = { updateUrlPath}/>
          </header> 
        </div>
      )
  }

export default App;