import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Layout from 'components/Layout/Layout';
import Search from 'components/Search/Search';
import MinimalCard from 'components/MinimalCard/MinimalCard';
import PlayCard from 'components/PlayCard/PlayCard';
import SongList from 'components/SongList/SongList';
import PlayerContext from 'js/contexts/player';
import fetchApi from 'js/helpers/fetchApi';

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [soundsOfTheWeek, setSoundsOfTheWeek] = useState([]);
  const { onPlay, updateQueue } = useContext(PlayerContext);

  useEffect(() => {
    fetchApi('categories').then(data => {
      setCategories(data);
    });

    fetchApi('songs/sounds-of-the-week').then(data => {
      setSoundsOfTheWeek(data);
    });
  }, []);

  const handleSearchSubmit = e => {
    if (!search) return false;

    e.preventDefault();

    fetchApi(`songs?search=${search}`).then(data => {
      setSongs(data);
      updateQueue(data);
    });
  };

  const handleSearchChange = e => {
    e.preventDefault();

    if (!e.target.value) {
      setSongs([]);
    }

    setSearch(e.target.value);
  };

  return (
    <Layout className="home grid" title="Zouned">
      <Search onSubmit={handleSearchSubmit} onChange={handleSearchChange} value={search} />
      {songs.length ? (
        <SongList onPlay={onPlay} list={songs} />
      ) : (
        <>
          <div className="home-group home-group--categories">
            <h3 className="home-group__title">Explore</h3>
            <div className="home-group__content">
              {categories.map(({ name, id }) => (
                <Link key={id} href="/category/[id]" as={`/category/${id}`}>
                  <a>
                    <MinimalCard label={name} />
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div className="home-group home-group--sounds-of-the-week">
            <h3 className="home-group__title">Sounds of the week</h3>
            <div className="home-group__content">
              {soundsOfTheWeek.map(song => (
                <PlayCard
                  key={song.id}
                  title={song.title}
                  coverImg={song.imgSrc}
                  isPlaying={false}
                  onPlay={() => onPlay(song)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Home;
