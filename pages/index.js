import { useState, useEffect } from 'react';
import Layout from 'components/Layout/Layout';
import Search from 'components/Search/Search';
import MinimalCard from 'components/MinimalCard/MinimalCard';
import PlayCard from 'components/PlayCard/PlayCard';
import fetchApi from 'js/helpers/fetchApi';

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchApi('categories').then(data => {
      setCategories(data);
    });
  }, []);

  return (
    <Layout className="home grid" title="Zouned">
      <Search />
      <div className="home-group home-group--categories">
        <h3 className="home-group__title">Explore</h3>
        <div className="home-group__content">
          {categories.map(({ name, id }) => (
            <MinimalCard
              key={id}
              label={name}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>
      <div className="home-group home-group--sounds-of-the-week">
        <h3 className="home-group__title">Sounds of the week</h3>
        <div className="home-group__content">
          <PlayCard
            title="Moonlight"
            coverImg="https://bit.ly/35QkYJ9"
            isPlaying={false}
            onPlay={() => {}}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
