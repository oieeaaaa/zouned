/*
***************************************
Component: Header
Author: Joimee
Description: Layout > Header
***************************************
*/
import { useState } from 'react';
import Icon from 'components/Icon/Icon';

export default () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const onPlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="header">
      <div className="grid">
        <div className="header__brand">zouned</div>
        <div className="header-buttons">
          <button className="header__btn" type="button" onClick={toggleNav}>
            <Icon src="menu-icon.svg" />
          </button>
          <button className="header__btn" type="button" onClick={onPlay}>
            <Icon src={isPlaying ? 'pause-icon.svg' : 'play-icon.svg'} />
          </button>
        </div>
      </div>
    </div>
  );
};
