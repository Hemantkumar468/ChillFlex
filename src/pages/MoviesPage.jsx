import { useEffect, useState } from 'react';
import ContentRow from '../components/home/ContentRow';
import {
  getPopularMovies,
  getTopRatedMovies,
  getNowPlaying,
  getUpcomingMovies,
  getDiscoverMovies,
} from '../api/tmdb';

const MoviesPage = () => {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [discover, setDiscover] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [
          popularRes,
          topRatedRes,
          nowPlayingRes,
          upcomingRes,
          discoverRes,
        ] = await Promise.all([
          getPopularMovies(),
          getTopRatedMovies(),
          getNowPlaying(),
          getUpcomingMovies(),
          getDiscoverMovies(),
        ]);

        setPopular(popularRes.data.results);
        setTopRated(topRatedRes.data.results);
        setNowPlaying(nowPlayingRes.data.results);
        setUpcoming(upcomingRes.data.results);
        setDiscover(discoverRes.data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen pt-24 pb-16">
      <div className="px-6 mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-white">Movies</h1>
        <p className="text-gray-400 mt-2">
          Browse popular top rated & upcoming movies from TMDB
        </p>
      </div>

      <ContentRow
        title=" Popular Movies"
        items={popular}
        loading={loading}
        type="movie"
      />
      <ContentRow
        title=" Top Rated"
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
      <ContentRow
        title=" Upcoming"
        items={upcoming}
        loading={loading}
        type="movie"
      />
      <ContentRow
        title=" Discover More"
        items={discover}
        loading={loading}
        type="movie"
      />
    </div>
  );
};

export default MoviesPage;
