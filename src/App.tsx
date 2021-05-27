import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import Filter from './Filter';
import {originalVideo} from './resources';
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
  
    //https://www.freecodecamp.org/news/javascript-debounce-example/
  // function debounce(func: { (query: any): void; apply?: any; }, timeout = 500){
  //   let timer: NodeJS.Timeout;
  //   return (...args: any) => {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => { func.apply(this, args); }, timeout);
  //   };
  // }
  function saveInput(query: React.SetStateAction<string>){
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
  //const processChange = debounce((query) => saveInput(query));

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
                  
                    saveInput(e.target.value);
                  }}             
                />
            </div>

            <Filter search = {search} key="999999" loadVideoHander = { updateUrlPath}/>
          </header> 
        </div>
      )
  }


export default App;
