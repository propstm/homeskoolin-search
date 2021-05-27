import React, { useState, useEffect } from 'react';

const VideoPlayer = (props:any) =>{
  useEffect(() => { 
    console.log('Video Props:');
    console.log(props);
  });
  return (
    <div className="youtubeEmbed">
      <iframe title="Video Player Frame" width="560" height="315" src={props.videoURL} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
  )
}

export default VideoPlayer;