import React, { useState, useEffect } from 'react';
import transcripts from './resources';
import './App.css';

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

let originalPath = transcripts[102].URL;

function convertTimestampToSeconds(timestampVal){
  let hoursPreConvert;
  let seconds;
  if(!timestampVal){
    timestampVal = "";
  }
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

  let objects = transcripts.filter((object)=>{
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