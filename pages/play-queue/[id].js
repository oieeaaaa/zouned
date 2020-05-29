import {
  useEffect,
  useContext,
  useState,
  createRef,
} from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import Layout from 'components/Layout/Layout';
import Carousel from 'components/Carousel/Carousel';
import SongList from 'components/SongList/SongList';
import PlayerContext from 'js/contexts/player';

import fetchApi from 'js/helpers/fetchApi';


const carousel = createRef(null);

const PlayQueue = () => {
  const { activeSong, onPlay } = useContext(PlayerContext);
  const [data, setData] = useState(null);
  const [initialIndex, setInitialIndex] = useState(0);
  const router = useRouter();
  const [cookies] = useCookies(['queueURL']);

  useEffect(() => {
    if (!router || !data) return;
    const { query } = router;
    const songId = parseInt(query.id, 10);

    const initialSongIndex = data.findIndex(song => song.id === songId);

    setInitialIndex(initialSongIndex);
  }, [router, data]);

  useEffect(() => {
    if (!router) return;

    // update the queue
    fetchApi(cookies.queueURL).then(res => {
      setData(res);
    });
  }, [router]);

  useEffect(() => {
    if (!carousel.current || !data) return;
    const { current } = carousel;
    const activeSongIndex = data.findIndex(song => song.id === activeSong.id);

    // auto slide to the current song index
    current.select(activeSongIndex);

    // update song on slide
    current.on('change', currentIndex => {
      const newSong = data[currentIndex];
      if (!newSong) return;

      onPlay(newSong);
    });
  }, [carousel.current, activeSong, data]);

  // since flickity library uses the old way of passing ref
  // we cannot use the useRef hook here
  const passRef = flcktyRef => {
    carousel.current = flcktyRef;
  };

  if (!data) return '';

  return (
    <Layout className="play-queue grid" title="Zouned | Play Queue">
      <h1 className="play-queue__title">{activeSong.title}</h1>
      <p className="play-queue__author">{activeSong.artist}</p>
      <Carousel
        list={data}
        flickityRef={passRef}
        initialIndex={initialIndex}
      />
      <h3 className="play-queue__heading">Play Queue</h3>
      <SongList list={data} onPlay={onPlay} />
    </Layout>
  );
};

export default PlayQueue;
