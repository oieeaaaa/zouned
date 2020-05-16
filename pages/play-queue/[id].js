import { useContext } from 'react';
import Layout from 'components/Layout/Layout';
import Carousel from 'components/Carousel/Carousel';
import SongList from 'components/SongList/SongList';
import { carouselList } from 'components/Carousel/Carousel.styleguide';
import { songs } from 'components/SongList/SongList.styleguide';
import PlayerContext from 'js/contexts/player';


const PlayQueue = () => {
  const { onPlay } = useContext(PlayerContext);

  return (
    <Layout className="play-queue grid" title="Zouned | Play Queue">
      <h1 className="play-queue__title">Song Title</h1>
      <p className="play-queue__author">Author Name</p>
      <Carousel list={carouselList} />
      <h3 className="play-queue__heading">Play Queue</h3>
      <SongList list={songs} onPlay={onPlay} />
    </Layout>
  );
};

export default PlayQueue;
