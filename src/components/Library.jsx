import React from "react";
import { LibrarySong } from "./LibrarySong";

export const Library = (props) => {
  return (
    <div className={`library ${props.libraryStatus ? "library_active" : ""}`}>
      <div className="library_list">
        <h2>Library</h2>
        <div className="library_songs">
          {props.songs.map((song) => (
            <LibrarySong
              song={song}
              songs={props.songs}
              setSongs={props.setSongs}
              setCurrentSong={props.setCurrentSong}
              id={song.id}
              key={song.id}
              audioRef={props.audioRef}
              isPlaying={props.isPlaying}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
