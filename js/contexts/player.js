import { createContext } from 'react';

const PlayerContext = createContext({
  isPlaying: false,
  song: {},
  onPlay: () => {},
  onNext: () => {},
  onPrev: () => {},
});

export default PlayerContext;
