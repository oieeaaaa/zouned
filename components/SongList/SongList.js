/*
***************************************
Component: SongList
Author: Joimee
Description: Display list of songs
***************************************
*/
export default ({ list }) => (
  <div className="song-list">
    <div className="song-list-header">
      <span className="song-list-header__item">no.</span>
      <span className="song-list-header__item">title</span>
      <span className="song-list-header__item">duration</span>
    </div>
    <ul className="song-list-body">
      {list.map(({ id, title }) => (
        <li className="song-list-body__item" key={id}>
          <p className="song-list__text">{id}</p>
          <p className="song-list__text song-list__text--center">{title}</p>
          <p className="song-list__text">--</p>
        </li>
      ))}
    </ul>
  </div>
);
