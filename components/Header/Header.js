/*
***************************************
Component: Header
Author: Joimee
Description: Layout > Header
***************************************
*/
import Link from 'next/link';
import { useContext } from 'react';
import Icon from 'components/Icon/Icon';
import PlayerContext from 'js/contexts/player';

export default () => {
  const { activeSong } = useContext(PlayerContext);

  return (
    <div className="header">
      <div className="grid">
        <Link href="/">
          <a className="header__brand">
            zouned
          </a>
        </Link>
        {activeSong.id && (
          <div className="header-buttons">
            <Link href="/play-queue/[id]" as={`/play-queue/${activeSong.id}`}>
              <a className="header__btn">
                <Icon src="menu-icon.svg" />
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
