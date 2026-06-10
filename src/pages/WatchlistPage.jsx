import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Play } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import useWatchlistStore from '../store/useWatchlistStore';
import { getImageUrl } from '../api/tmdb';

const WatchlistPage = () => {
  const { watchlist, removeFromWatchlist, continueWatching } =
    useWatchlistStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = {
    pathname: location.pathname,
    search: location.search,
    hash: location.hash,
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-16 pb-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black">My List</h1>
      </div>

      {continueWatching.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4 text-gray-300">
            ▶ Continue Watching
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {continueWatching.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="cursor-pointer group relative"
                onClick={() =>
                  navigate(`/player/${item.media_type || 'movie'}/${item.id}`, {
                    state: { from },
                  })
                }
              >
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-800 mb-2 relative">
                  {getImageUrl(item.backdrop_path) ? (
                    <img
                      src={getImageUrl(item.backdrop_path, 'w500')}
                      alt={item.title || item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-3xl">
                      🎬
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play size={32} className="text-white fill-white" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                    <div
                      className="h-full bg-red-500"
                      style={{ width: `${item.progress || 0}%` }}
                    />
                  </div>
                </div>
                <p className="text-sm font-medium line-clamp-1">
                  {item.title || item.name}
                </p>
                <p className="text-xs text-gray-500">
                  {item.progress || 0}% watched
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4 text-gray-300">📌 Saved</h2>

      {watchlist.length === 0 ? (
        <div className="text-center py-24 text-gray-600">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-xl">Your watchlist is empty</p>
          <p className="text-sm text-gray-500 mt-2">
            movies and TV shows to add them to your list
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors text-white"
          >
            Browse Content
          </button>
        </div>
      ) : (
        <AnimatePresence>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {watchlist.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="group relative"
              >
                <div
                  className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 mb-2 cursor-pointer"
                  onClick={() =>
                    navigate(`/detail/${item.media_type || 'movie'}/${item.id}`)
                  }
                >
                  {getImageUrl(item.poster_path) ? (
                    <img
                      src={getImageUrl(item.poster_path)}
                      alt={item.title || item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">
                      🎬
                    </div>
                  )}
                </div>
                <p className="text-sm font-medium line-clamp-2 pr-6">
                  {item.title || item.name}
                </p>
                <button
                  onClick={() => removeFromWatchlist(item.id)}
                  className="absolute top-2 right-2 w-7 h-7 bg-red-600/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                >
                  <Trash2 size={12} className="text-white" />
                </button>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default WatchlistPage;
