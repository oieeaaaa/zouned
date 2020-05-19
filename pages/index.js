import {
  useReducer,
  useEffect,
  useContext,
} from 'react';
import Link from 'next/link';
import Layout from 'components/Layout/Layout';
import Search from 'components/Search/Search';
import MinimalCard from 'components/MinimalCard/MinimalCard';
import PlayCard from 'components/PlayCard/PlayCard';
import SongList from 'components/SongList/SongList';
import PlayerContext from 'js/contexts/player';
import fetchApi from 'js/helpers/fetchApi';

const SET_SONGS = 'home/SET_SONGS';
const SET_SEARCH = 'home/SET_SEARCH';
const SET_CATEGORIES = 'home/SET_CATEGORIES';
const SET_SOUNDS_OF_THE_WEEK = 'home/SET_SOUNDS_OF_THE_WEEK';
const CLEAR_SONGS = 'home/CLEAR_SONGS';
const PLAY_SOUNDS_OF_THE_WEEK = 'home/PLAY_SOUNDS_OF_THE_WEEK';

const initState = {
  songs: [],
  search: '',
  categories: [],
  soundsOfTheWeek: [],
  isSoundsOfTheWeekPlaying: false,
};

const homeReducer = (state, action) => {
  switch (action.type) {
    case SET_SONGS:
      return ({
        ...state,
        songs: action.songs,
      });
    case SET_SEARCH:
      return ({
        ...state,
        songs: action.search,
      });
    case SET_CATEGORIES:
      return ({
        ...state,
        categories: action.categories,
      });
    case SET_SOUNDS_OF_THE_WEEK:
      return ({
        ...state,
        soundsOfTheWeek: action.soundsOfTheWeek,
      });
    case CLEAR_SONGS:
      return ({
        ...state,
        songs: [],
      });
    case PLAY_SOUNDS_OF_THE_WEEK:
      return ({
        ...state,
        isSoundsOfTheWeekPlaying: action.isSoundsOfTheWeekPlaying,
      });

    default:
      return state;
  }
};

const Home = () => {
  const [state, dispatch] = useReducer(homeReducer, initState);
  const {
    activeSong, isPlaying, onPlay, updateQueue,
  } = useContext(PlayerContext);

  useEffect(() => {
    fetchApi('categories').then(data => {
      dispatch({
        type: SET_CATEGORIES,
        categories: data,
      });
    });

    fetchApi('songs/sounds-of-the-week').then(data => {
      dispatch({
        type: SET_SOUNDS_OF_THE_WEEK,
        soundsOfTheWeek: data,
      });
    });
  }, []);


  useEffect(() => {
    dispatch({
      type: PLAY_SOUNDS_OF_THE_WEEK,
      isSoundsOfTheWeekPlaying: isPlaying,
    });
  }, [isPlaying, activeSong.songSrc]);


  const handleSearchSubmit = e => {
    if (!state.search) return false;

    e.preventDefault();

    fetchApi(`songs?search=${state.search}`).then(data => {
      dispatch({
        type: SET_SONGS,
        songs: data,
      });
      updateQueue(data);
    });
  };

  const handleSearchChange = e => {
    e.preventDefault();

    if (!e.target.value) {
      dispatch({
        type: CLEAR_SONGS,
      });
    }

    dispatch({
      type: SET_SEARCH,
      search: e.target.value,
    });
  };

  // TODO: create a togglePlay hook
  const handleSoundsOfTheWeekPlay = song => {
    onPlay(song);
    updateQueue(state.soundsOfTheWeek);
  };

  return (
    <Layout className="home grid" title="Zouned">
      <Search onSubmit={handleSearchSubmit} onChange={handleSearchChange} value={state.search} />
      {state.songs.length ? (
        <SongList onPlay={onPlay} list={state.songs} />
      ) : (
        <>
          <div className="home-group home-group--categories">
            <h3 className="home-group__title">Explore</h3>
            <div className="home-group__content">
              {state.categories.map(({ name, id }) => (
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
              {state.soundsOfTheWeek.map(song => (
                <PlayCard
                  key={song.id}
                  title={song.title}
                  coverImg={song.imgSrc}
                  isPlaying={activeSong.id === song.id && state.isSoundsOfTheWeekPlaying}
                  onPlay={() => handleSoundsOfTheWeekPlay(song)}
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
