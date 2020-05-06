/* eslint
  jsx-a11y/media-has-caption: "off",
  jsx-a11y/no-noninteractive-element-interactions: "off",
  jsx-a11y/click-events-have-key-events: "off"
*/

/*
***************************************
Component: Player
Author: Joimee
Description:
***************************************
*/
import { useState, useRef, useEffect } from 'react';
import throttle from 'lodash.throttle';
import Icon from 'components/Icon/Icon';
import convertTime from 'js/helpers/convertTime';

export default ({
  title,
  songSrc,
}) => {
  const audio = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timePlaying, setTimePlaying] = useState(0);
  const [isDragHold, setIsDragHold] = useState(false);

  useEffect(() => {
    if (!audio) return;

    const onDrag = throttle(e => {
      if (!isDragHold) return;
      const { current } = audio;
      let el = e;

      if (e.type === 'touchmove') {
        [el] = e.touches;
      }

      const position = (el.clientX / window.innerWidth);

      current.currentTime = position * duration;
    }, 50);


    const onDragOff = () => {
      const { current } = audio;
      current.play();
      setIsDragHold(false);
    };

    window.addEventListener('mousemove', onDrag);
    window.addEventListener('touchmove', onDrag);
    window.addEventListener('mouseup', onDragOff);
    window.addEventListener('touchend', onDragOff);

    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('touchmove', onDrag);

      window.removeEventListener('mouseup', onDragOff);
      window.removeEventListener('touchend', onDragOff);
    };
  }, [audio, duration, isDragHold]);

  const onPlay = e => {
    e.preventDefault();
    const { current } = audio;

    if (isPlaying) {
      current.pause();
    } else {
      current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const onLoadedMetadata = () => {
    const { current } = audio;

    setDuration(current.duration);
  };

  const onTimeUpdate = () => {
    const { current } = audio;
    const { currentTime } = current;
    const newProgress = (currentTime / duration) * 100;

    setTimePlaying(currentTime);
    setProgress(newProgress);
  };

  const onSkipAhead = e => {
    let event = e;
    const { current } = audio;
    const { target: el } = event;

    if (e.type === 'touchmove') {
      [event] = e.touches;
    }

    const position = (event.pageX - el.offsetLeft) / el.offsetWidth;

    current.currentTime = position * duration;
  };

  const onDragOn = () => {
    const { current } = audio;
    current.pause();
    setIsDragHold(true);
  };


  const onEnded = () => {
    setIsDragHold(false);
    setProgress(0);
    setTimePlaying(0);
  };

  return (
    <div className="player">
      <audio
        ref={audio}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        controls={false}
        preload="metadata"
        onEnded={onEnded}
      >
        <source src={songSrc} type="audio/mp3" />
      </audio>
      <div className="player-progress">
        <progress
          onClick={onSkipAhead}
          value={timePlaying}
          max={duration}
        />
        <div style={{ width: `${progress}%` }} className="player-progress-bar" />
        <button
          style={{ left: `${progress}%` }}
          className="player-progress-bar__btn"
          type="button"
          aria-label="Thumb"
          onTouchStart={onDragOn}
          onMouseDown={onDragOn}
        />
      </div>
      <div className="player-controls">
        <span className="player__time">{convertTime(timePlaying)}</span>
        <div className="player-buttons">
          <button className="player__prev" type="button">
            <Icon src="prev-icon.svg" />
          </button>
          <button className="player__play" type="button" onClick={onPlay}>
            <Icon src={isPlaying ? 'pause-icon--white-md.svg' : 'play-icon--white-md.svg'} />
          </button>
          <button className="player__next" type="button">
            <Icon src="next-icon.svg" />
          </button>
        </div>
        <span className="player__time">{convertTime(duration)}</span>
      </div>
      <div className="player-footer">
        {title}
      </div>
    </div>
  );
};
