import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { getPopularMovies, getPopularTVShows, searchMulti } from '../api/tmdb';
import useDebounce from '../hooks/useDebounce';
import MediaGrid from '../components/browse/MediaGrid';
import MediaModal from '../components/browse/MediaModal';

const BrowsePage = () => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState('movie');

  const debouncedQuery = useDebounce(query, 400);
  const isSearching = debouncedQuery.trim().length > 0;

  useEffect(() => {
    const fetchPopular = async () => {
      setLoading(true);
      try {
        const [moviesRes, tvRes] = await Promise.all([
          getPopularMovies(),
          getPopularTVShows(),
        ]);
        setMovies(moviesRes.data.results);
        setTvShows(tvRes.data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, []);

  useEffect(() => {
    if (!isSearching) {
      setSearchResults([]);
      return;
    }

    const runSearch = async () => {
      setSearching(true);
      try {
        const res = await searchMulti(debouncedQuery);
        setSearchResults(
          res.data.results.filter(
            (r) => r.media_type === 'movie' || r.media_type === 'tv'
          )
        );
      } catch (err) {
        console.error(err);
      } finally {
        setSearching(false);
      }
    };
    runSearch();
  }, [debouncedQuery, isSearching]);

  const handleCardClick = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="bg-black min-h-screen pt-24 pb-16 px-4 sm:px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Discover Movies & TV Shows
          </h1>
          <p className="text-gray-400">Powered by TMDB API</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies, TV shows..."
              className="w-full bg-gray-900 text-white pl-12 pr-12 py-4 rounded-xl text-base border border-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {isSearching ? (
          <MediaGrid
            title={`Search results for "${debouncedQuery}"`}
            items={searchResults}
            type="movie"
            loading={searching}
            onCardClick={(item) =>
              handleCardClick(item, item.media_type || 'movie')
            }
          />
        ) : (
          <>
            <MediaGrid
              title=" Popular Movies"
              items={movies}
              type="movie"
              loading={loading}
              onCardClick={handleCardClick}
            />
            <MediaGrid
              title="Popular TV Shows"
              items={tvShows}
              type="tv"
              loading={loading}
              onCardClick={handleCardClick}
            />
          </>
        )}
      </div>

      <MediaModal
        item={selectedItem}
        type={selectedType}
        isOpen={!!selectedItem}
        onClose={closeModal}
      />
    </div>
  );
};

export default BrowsePage;
