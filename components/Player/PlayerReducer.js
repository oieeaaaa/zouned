export const RESET = 'RESET';
export const SET_PLAYING = 'SET_PLAYING';
export const SET_TIMEPLAYING = 'SET_TIMEPLAYING';
export const SET_DRAG_HOLD = 'SET_DRAG_HOLD';
export const SET_PROGRESS = 'SET_PROGRESS';
export const SET_TIMEUPDATE = 'SET_TIMEUPDATE';

export const initState = {
  isPlaying: false,
  timePlaying: 0,
  progress: 0,
  isDragHold: false,
};

const playerReducer = (state, action) => {
  switch (action.type) {
    case SET_PLAYING:
      return {
        ...state,
        isPlaying: action.isPlaying,
      };

    case SET_DRAG_HOLD:
      return {
        ...state,
        isDragHold: action.isDragHold,
      };

    case SET_TIMEUPDATE:
      return {
        ...state,
        timePlaying: action.timePlaying,
        progress: action.progress,
      };

    case RESET: {
      const { duration, ...reset } = initState;

      // reset all except for duration
      return {
        ...reset,
        duration: state.duration,
      };
    }

    default:
      return state;
  }
};

export default playerReducer;
