import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faStepBackward,
  faStepForward,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { playAudio } from "../util";

export const Player = ({
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
  songs,
  setSongs,
  setCurrentSong,
}) => {
  useEffect(() => {
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
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
  }, [currentSong]);

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  // const timeUpdateHandler = (e) => {
  //   const current = e.target.currentTime;
  //   const duration = e.target.duration;
  //   setSongInfo({ ...songInfo, currentTime: current, duration });
  // };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragRangeHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1]);
        playAudio(isPlaying, audioRef);
        return;
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
    playAudio(isPlaying, audioRef);
  };

  return (
    <div className="player">
      <div className="time_control">
        <p>{songInfo.duration ? getTime(songInfo.currentTime) : "0:00"}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragRangeHandler}
          type="range"
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play_control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip_back"
          size="2x"
          icon={faStepBackward}
        />
        <div className="play-icon__wrapper">
          <FontAwesomeIcon
            className="play"
            size="3x"
            icon={isPlaying ? faPause : faPlay}
            onClick={playSongHandler}
          />
        </div>
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip_forward"
          size="2x"
          icon={faStepForward}
        />
      </div>
      {/* <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio> */}
    </div>
  );
};
