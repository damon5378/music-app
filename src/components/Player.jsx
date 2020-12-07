import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faStepBackward,
  faStepForward,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

export const Player = ({
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
}) => {
  // const setIsPlaying = () => {
  //   !props.isPlaying
  //     ? props.setIsPlaying(!props.isPlaying)
  //     : props.setIsPlaying(!props.isPlaying);
  // };

  //   const setIsPlayingFoo = (props) => {
  //     props.setIsPlaying(!props.isPlaying);
  //   };

  //   const playSongHandler = (props) => {
  //     audioRef.current.play();
  //     setIsPlaying();
  //   };

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  //   const pauseSongHandler = () => {
  //     audioRef.current.pause();
  //   };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration });
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragRangeHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  return (
    <div className="player">
      <div className="time_control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          onChange={dragRangeHandler}
          type="range"
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play_control">
        <FontAwesomeIcon
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
          className="skip_forward"
          size="2x"
          icon={faStepForward}
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};
