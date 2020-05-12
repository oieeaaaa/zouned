import { useState } from 'react';
import Player from 'components/Player/Player';
import PlayerContext from 'js/contexts/player';

import 'scss/main.scss';

export default ({ Component, pageProps }) => {
  const [song, setSong] = useState(null);
  const [queue, setQueue] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = newSong => {
    // for changing of songs
    if (!song || newSong.id !== song.id) {
      setSong(newSong);
      setIsPlaying(true);
      return;
    }

    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const currentSongIndex = queue.findIndex(queueItem => queueItem.id === song.id);

    // if there is no current song playing stop this function
    if (currentSongIndex === -1) return false;

    // circulate forward through the queue
    const nextSong = queue[((currentSongIndex + 1) % queue.length)];

    setSong(nextSong);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    const currentSongIndex = queue.findIndex(queueItem => queueItem.id === song.id);

    // if there is no current song playing stop this function
    if (currentSongIndex === -1) return false;

    // magic
    const prevSong = queue[((currentSongIndex - 1 + queue.length) % queue.length)];

    setSong(prevSong);
    setIsPlaying(true);
  };

  return (
    <div>
      <PlayerContext.Provider value={{
        onPlay: handlePlay,
        updateQueue: setQueue,
        activeSong: song || {},
      }}
      >
        <Component {...pageProps} />
      </PlayerContext.Provider>
      {song && (
        <Player
          isPlaying={isPlaying}
          onPlay={handlePlay}
          onNext={handleNext}
          onPrev={handlePrev}
          song={song}
        />
      )}
    </div>
  );
};
