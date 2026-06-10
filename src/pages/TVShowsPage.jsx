import { useEffect, useState } from 'react';
import ContentRow from '../components/home/ContentRow';
import {
  getPopularTVShows,
  getTopRatedTV,
  getOnTheAir,
  getAiringToday,
  getDiscoverTV,
} from '../api/tmdb';

const TVShowsPage = () => {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [onTheAir, setOnTheAir] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  const [discover, setDiscover] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const [
          popularRes,
          topRatedRes,
          onTheAirRes,
          airingTodayRes,
          discoverRes,
        ] = await Promise.all([
          getPopularTVShows(),
          getTopRatedTV(),
          getOnTheAir(),
          getAiringToday(),
          getDiscoverTV(),
        ]);

        setPopular(popularRes.data.results);
        setTopRated(topRatedRes.data.results);
        setOnTheAir(onTheAirRes.data.results);
        setAiringToday(airingTodayRes.data.results);
        setDiscover(discoverRes.data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen pt-24 pb-16">
      <div className="px-6 mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-white">TV Shows</h1>
        <p className="text-gray-400 mt-2">trending TV series</p>
      </div>

      <ContentRow
        title="Popular TV Shows"
        items={popular}
        loading={loading}
        type="tv"
      />
      <ContentRow
        title=" Top Rated"
        items={topRated}
        loading={loading}
        type="tv"
      />
      <ContentRow
        title=" On The Air"
        items={onTheAir}
        loading={loading}
        type="tv"
      />
      <ContentRow
        title=" Airing Today"
        items={airingToday}
        loading={loading}
        type="tv"
      />
      <ContentRow
        title=" Discover More"
        items={discover}
        loading={loading}
        type="tv"
      />
    </div>
  );
};

export default TVShowsPage;
