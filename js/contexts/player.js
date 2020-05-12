import { createContext } from 'react';

const PlayerContext = createContext({
  onPlay: () => {},
  onPause: () => {},
  onNext: () => {},
  onPrev: () => {},
});

export default PlayerContext;
