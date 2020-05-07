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
import { useRef, useEffect, useReducer } from 'react';
import throttle from 'lodash.throttle';
import Icon from 'components/Icon/Icon';
import convertTime from 'js/helpers/convertTime';
import
playerReducer,
{
  initState,
  SET_PLAYING,
  SET_DURATION,
  SET_DRAG_HOLD,
  SET_TIMEUPDATE,
  RESET,
} from './PlayerReducer';

export default ({
  title,
  songSrc,
  onNext,
  onPrev,
}) => {
  const audio = useRef(null);
  const [state, dispatch] = useReducer(playerReducer, initState);

  useEffect(() => {
    if (!audio) return;

    const onDrag = throttle(e => {
      if (!state.isDragHold) return;
      const { current } = audio;
      let el = e;

      if (e.type === 'touchmove') {
        [el] = e.touches;
      }

      const position = (el.clientX / window.innerWidth);

      current.currentTime = position * state.duration;
    }, 50);


    const onDragOff = () => {
      const { current } = audio;

      if (state.isPlaying) {
        current.play();
      }

      dispatch({
        type: SET_DRAG_HOLD,
        isDragHold: false,
      });
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
  }, [audio, state.duration, state.isDragHold]);

  const onPlay = e => {
    e.preventDefault();
    const { current } = audio;

    if (state.isPlaying) {
      current.pause();
    } else {
      current.play();
    }

    dispatch({
      type: SET_PLAYING,
      isPlaying: !state.isPlaying,
    });
  };

  const onLoadedMetadata = () => {
    const { current } = audio;

    dispatch({
      type: SET_DURATION,
      duration: current.duration,
    });
  };

  const onTimeUpdate = () => {
    const { current } = audio;
    const { currentTime } = current;
    const newProgress = (currentTime / state.duration) * 100;

    dispatch({
      type: SET_TIMEUPDATE,
      timePlaying: currentTime,
      progress: newProgress,
    });
  };

  const onSkipAhead = e => {
    let event = e;
    const { current } = audio;
    const { target: el } = event;

    if (e.type === 'touchmove') {
      [event] = e.touches;
    }

    const position = (event.pageX - el.offsetLeft) / el.offsetWidth;

    current.currentTime = position * state.duration;
  };

  const onDragOn = () => {
    const { current } = audio;
    current.pause();

    dispatch({
      type: SET_DRAG_HOLD,
      isDragHold: true,
    });
  };


  const onEnded = () => {
    dispatch({
      type: RESET,
    });
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
          value={state.timePlaying}
          max={state.duration}
        />
        <div style={{ width: `${state.progress}%` }} className="player-progress-bar" />
        <button
          style={{ left: `${state.progress}%` }}
          className="player-progress-bar__btn"
          type="button"
          aria-label="Thumb"
          onTouchStart={onDragOn}
          onMouseDown={onDragOn}
        />
      </div>
      <div className="player-controls">
        <span className="player__time">{convertTime(state.timePlaying)}</span>
        <div className="player-buttons">
          <button className="player__prev" type="button" onClick={onPrev}>
            <Icon src="prev-icon.svg" />
          </button>
          <button className="player__play" type="button" onClick={onPlay}>
            <Icon src={state.isPlaying ? 'pause-icon--white-md.svg' : 'play-icon--white-md.svg'} />
          </button>
          <button className="player__next" type="button" onClick={onNext}>
            <Icon src="next-icon.svg" />
          </button>
        </div>
        <span className="player__time">{convertTime(state.duration)}</span>
      </div>
      <div className="player-footer">
        {title}
      </div>
    </div>
  );
};
