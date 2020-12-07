import React from "react";

export const Song = (props) => {
  return (
    <div className="song_container">
      <img src={props.currentSong.cover} alt={props.currentSong.name} />
      <h2>{props.currentSong.name}</h2>
      <h3>{props.currentSong.artist}</h3>
    </div>
  );
};
