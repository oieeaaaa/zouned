import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Player from 'components/Player/Player';
import PlayerContext from 'js/contexts/player';
import fetchApi from 'js/helpers/fetchApi';

import 'scss/main.scss';

export default ({ Component, pageProps }) => {
  const [song, setSong] = useState(null);
  const [queueURL, setQueueURL] = useState(''); // must be a back-end api route
  const [queue, setQueue] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeatCount, setRepeatCount] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(['queueURL']); // eslint-disable-line

  useEffect(() => {
    if (!queueURL && cookies.queueURL) {
      fetchApi(cookies.queueURL).then(res => {
        setQueue(res);
      });
    }
  }, [cookies.queueURL]);

  useEffect(() => {
    if ('queueURL' in cookies) {
      removeCookie('queueURL');
    }

    if (queueURL) {
      fetchApi(queueURL).then(res => {
        setQueue(res);
      });
    }

    setCookie('queueURL', queueURL);
  }, [queueURL]);

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

    // count the number of play for Player's useEffect
    if (nextSong.songSrc === song.songSrc) {
      setRepeatCount(repeatCount + 1);
    }

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
        updateQueueURL: setQueueURL,
        activeSong: song || {},
        isPlaying,
        queueURL,
      }}
      >
        <Component {...pageProps} />
      </PlayerContext.Provider>
      {song && (
        <Player
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          onNext={handleNext}
          onPrev={handlePrev}
          song={song}
          repeatCount={repeatCount}
        />
      )}
    </div>
  );
};
