import React, { useState, useEffect } from 'react';
const FilterResult = (props:any) => {

    const timestampContentStyle={
        fontSize:18
      }
      
      const episodeTitleStyle ={
        fontSize:13,
        // position:"relative"
      }

    useEffect(() => { 
      console.log('Filter Result Props:');
      console.log(props);
    });
  
    const updateUrlPath = (pathAndTime:any, e:any) => {
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

export default FilterResult;