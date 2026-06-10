import { useEffect, useState } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import ContentRow from '../components/home/ContentRow';
import {
  getTrending,
  getPopularMovies,
  getTopRatedMovies,
  getPopularTVShows,
  getNowPlaying,
} from '../api/tmdb';

const HomePage = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [t, p, tr, tv, np] = await Promise.all([
          getTrending(),
          getPopularMovies(),
          getTopRatedMovies(),
          getPopularTVShows(),
          getNowPlaying(),
        ]);
        setTrending(t.data.results);
        setPopular(p.data.results);
        setTopRated(tr.data.results);
        setTvShows(tv.data.results);
        setNowPlaying(np.data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <HeroBanner items={trending} />

      <div className="py-8 -mt-16 relative z-10">
        <ContentRow
          title=" Trending Now"
          items={trending.filter(
            (i) => i.media_type === 'movie' || i.media_type === 'tv'
          )}
          loading={loading}
        />
        <ContentRow
          title="Popular Movies"
          items={popular}
          loading={loading}
          type="movie"
        />
        <ContentRow
          title="Popular TV Shows"
          items={tvShows}
          loading={loading}
          type="tv"
        />
        <ContentRow
          title="Top Rated"
          items={topRated}
          loading={loading}
          type="movie"
        />
        <ContentRow
          title=" Now Playing"
          items={nowPlaying}
          loading={loading}
          type="movie"
        />
      </div>
    </div>
  );
};

export default HomePage;
