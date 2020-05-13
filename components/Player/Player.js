/* eslint
  jsx-a11y/media-has-caption: "off",
  jsx-a11y/no-noninteractive-element-interactions: "off",
  jsx-a11y/click-events-have-key-events: "off",
  no-use-before-define: "off"
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
  SET_DRAG_HOLD,
  SET_TIMEUPDATE,
  RESET,
} from './PlayerReducer';

export default ({
  onNext,
  onPrev,
  isPlaying,
  song,
}) => {
  const audio = useRef(null);
  const [state, dispatch] = useReducer(playerReducer, initState);

  useEffect(() => {
    togglePlay(isPlaying);
  }, [isPlaying, song.songSrc]);

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

      current.currentTime = position * song.duration;
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
  }, [audio, song.duration, state.isDragHold, state.isPlaying]);

  const onPlay = () => {
    const { current } = audio;

    current.play();

    dispatch({
      type: SET_PLAYING,
      isPlaying: true,
    });
  };

  const onPause = () => {
    const { current } = audio;

    current.pause();

    dispatch({
      type: SET_PLAYING,
      isPlaying: false,
    });
  };

  function togglePlay(playingState) {
    if (playingState) {
      onPlay();
    } else {
      onPause();
    }
  }

  const onTimeUpdate = () => {
    const { current } = audio;
    const { currentTime } = current;
    const newProgress = (currentTime / song.duration) * 100;

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

    current.currentTime = position * song.duration;
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
        onTimeUpdate={onTimeUpdate}
        controls={false}
        preload="metadata"
        onEnded={onEnded}
        src={song.songSrc}
      />
      <div className="player-progress">
        <progress
          onClick={onSkipAhead}
          value={state.timePlaying}
          max={song.duration}
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
          <button className="player__play" type="button" onClick={() => togglePlay(!state.isPlaying)}>
            <Icon src={state.isPlaying ? 'pause-icon--white-md.svg' : 'play-icon--white-md.svg'} />
          </button>
          <button className="player__next" type="button" onClick={onNext}>
            <Icon src="next-icon.svg" />
          </button>
        </div>
        <span className="player__time">{convertTime(song.duration)}</span>
      </div>
      <div className="player-footer">
        {song.title}
      </div>
    </div>
  );
};
