import {
  useEffect,
  useContext,
  useState,
  createRef,
} from 'react';
import { useRouter } from 'next/router';
import Layout from 'components/Layout/Layout';
import Carousel from 'components/Carousel/Carousel';
import SongList from 'components/SongList/SongList';
import PlayerContext from 'js/contexts/player';

import fetchApi from 'js/helpers/fetchApi';


const carousel = createRef(null);

const PlayQueue = () => {
  const { activeSong, onPlay, updateQueue } = useContext(PlayerContext);
  const [data, setData] = useState(null);
  const [initialIndex, setInitialIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!router) return;

    // update the queue
    fetchApi(`categories/${router.query.id}/play-queue`).then(res => {
      setData(res);
      updateQueue(res.queue);
    });
  }, [router]);

  useEffect(() => {
    if (!carousel.current || !data) return;
    const { current } = carousel;
    const activeSongIndex = data.queue.findIndex(song => song.id === activeSong.id);

    // auto slide to the current song index
    current.select(activeSongIndex);

    // update song on slide
    current.on('change', currentIndex => {
      const newSong = data.queue[currentIndex];
      if (!newSong) return;

      setData(prevData => ({
        ...prevData,
        song: newSong,
      }));

      onPlay(newSong);
    });
  }, [carousel.current, activeSong, data]);

  useEffect(() => {
    if (!router || !data) return;
    const { query } = router;
    const songId = parseInt(query.id, 10);

    const initialSongIndex = data.queue.findIndex(song => song.id === songId);

    setInitialIndex(initialSongIndex);
  }, [router, data]);

  // since flickity library uses the old way of passing ref
  // we cannot use the useRef hook here
  const passRef = flcktyRef => {
    carousel.current = flcktyRef;
  };

  if (!data) return '';

  return (
    <Layout className="play-queue grid" title="Zouned | Play Queue">
      <h1 className="play-queue__title">{data.song.title}</h1>
      <p className="play-queue__author">{data.song.artist}</p>
      <Carousel
        list={data.queue}
        flickityRef={passRef}
        initialIndex={initialIndex}
      />
      <h3 className="play-queue__heading">Play Queue</h3>
      <SongList list={data.queue} onPlay={onPlay} />
    </Layout>
  );
};

export default PlayQueue;
