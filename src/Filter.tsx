// @ts-nocheck
import React, { useState, useEffect } from 'react';
import FilterResult from './FilterResult';
import {transcripts} from './resources';

const Filter = (props:any) => {
    let items;
    let allItems = [];

    function convertTimestampToSeconds(timestampVal:any){
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
  
    useEffect(() => { 
    });
  
    let objects = transcripts.filter((object)=>{
      items = object.Content.filter((data)=>{
        if(props.search == null || props.search === ""){
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

  export default Filter;