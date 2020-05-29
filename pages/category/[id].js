import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import SongList from 'components/SongList/SongList';
import Layout from 'components/Layout/Layout';
import PlayerContext from 'js/contexts/player';

import fetchApi from 'js/helpers/fetchApi';

const Category = () => {
  const router = useRouter();
  const { onPlay, updateQueueURL } = useContext(PlayerContext);
  const [category, setCategory] = useState({
    songs: [],
  });

  useEffect(() => {
    fetchApi(`categories/${router.query.id}/songs`).then(data => {
      setCategory(data);
    });
  }, [router.query.id]);

  const handlePlay = (song) => {
    updateQueueURL(`categories/${router.query.id}/play-queue`);
    onPlay(song);
  };

  return (
    <Layout className="category grid" title={`Zouned | ${category.name}`}>
      <h1 className="category__title">{category.name}</h1>
      <SongList onPlay={handlePlay} list={category.songs} />
    </Layout>
  );
};

export default Category;
