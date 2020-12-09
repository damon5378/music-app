import React from "react";

export const LibrarySong = ({
  songs,
  id,
  song,
  setSongs,
  isPlaying,
  audioRef,
  setCurrentSong,
}) => {
  const songSelectHandler = async () => {
    const selectedSong = songs.filter((state) => state.id === id);
    await setCurrentSong(selectedSong[0]);

    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);

    // playAudio(isPlaying, audioRef);
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library_song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song_description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};
