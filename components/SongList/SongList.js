/* eslint jsx-a11y/click-events-have-key-events: "off" */
/*
***************************************
Component: SongList
Author: Joimee
Description: Display list of songs
***************************************
*/
import { useContext } from 'react';
import PlayerContext from 'js/contexts/player';
import convertTime from 'js/helpers/convertTime';

export default ({ list, onPlay }) => {
  const { activeSong } = useContext(PlayerContext);

  return (
    <div className="song-list">
      <div className="song-list-header">
        <span className="song-list-header__item">no.</span>
        <span className="song-list-header__item">title</span>
        <span className="song-list-header__item">duration</span>
      </div>
      <ul className="song-list-body">
        {list.map((song, index) => (
          <li
            className={`song-list-body__item${song.id === activeSong.id ? ' song-list-body__item--active' : ''}`}
            key={song.id}
          >
            <p className="song-list__text">{index + 1}</p>
            <button
              className="song-list__text song-list__text--center"
              type="button"
              onClick={() => onPlay(song)}
            >
              {song.title}
            </button>
            <p className="song-list__text">{convertTime(song.duration)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
