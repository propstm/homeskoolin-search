import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import Filter from './Filter';
import {originalVideo} from './resources';
import debounce from 'lodash.debounce'
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

let originalPath = originalVideo;

const App = () => {

  const [urlPath, setUrlPath] = useState(originalPath);
  const [search, setSearch] = useState('');

  const delayedHandleChange = debounce(targetValue => saveInput(targetValue), 500);

  function saveInput(query:string){
    console.log('Saving data:' + query);
    setSearch(query);
  }

  const updateUrlPath = (pathAndTime: React.SetStateAction<string>) => {

    console.log('update url path clicked - APP');
    console.log(pathAndTime);
    
    if(urlPath !== pathAndTime){
      console.log('URL PATH CHANGED');
      console.log('------------------');
      setUrlPath(pathAndTime);
    }
  }

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
                  delayedHandleChange(e.target.value);
                    
                  }}             
                />
            </div>

            <Filter search = {search} key="999999" loadVideoHander = { updateUrlPath}/>
          </header> 
        </div>
      )
  }


export default App;
