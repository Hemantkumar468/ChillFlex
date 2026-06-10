import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Plus, Check, Star, Clock, Calendar } from 'lucide-react';
import {
  getMovieDetails,
  getTVDetails,
  getMovieVideos,
  getTVVideos,
  getMovieCredits,
  getSimilarMovies,
  getSimilarTV,
  getImageUrl,
} from '../api/tmdb';
import useWatchlistStore from '../store/useWatchlistStore';
import useRequireLogin from '../hooks/useRequireLogin';
import ContentRow from '../components/home/ContentRow';

const DetailPage = () => {
  const { type, id } = useParams();
  const [details, setDetails] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } =
    useWatchlistStore();
  const { goToPlayer } = useRequireLogin();

  const inWatchlist = details ? isInWatchlist(details.id) : false;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const detailFn = type === 'movie' ? getMovieDetails : getTVDetails;
        const videoFn = type === 'movie' ? getMovieVideos : getTVVideos;

        const [detailRes, videoRes, creditRes, similarRes] = await Promise.all([
          detailFn(id),
          videoFn(id),
          type === 'movie'
            ? getMovieCredits(id)
            : Promise.resolve({ data: { cast: [] } }),
          type === 'movie' ? getSimilarMovies(id) : getSimilarTV(id),
        ]);

        setDetails(detailRes.data);

        const yt = videoRes.data.results?.find(
          (v) => v.type === 'Trailer' && v.site === 'YouTube'
        );
        setTrailer(yt);
        setCast(creditRes.data.cast?.slice(0, 10));
        setSimilar(similarRes.data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
    window.scrollTo(0, 0);
  }, [id, type]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!details) return null;

  const title = details.title || details.name;
  const backdrop = getImageUrl(details.backdrop_path, 'original');
  const poster = getImageUrl(details.poster_path, 'w500');
  const rating = details.vote_average?.toFixed(1);
  const runtime = details.runtime
    ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`
    : null;
  const year = (details.release_date || details.first_air_date)?.split('-')[0];

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="relative h-[60vh] min-h-[400px]">
        {backdrop && (
          <img
            src={backdrop}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
      </div>

      <div className="relative -mt-48 z-10 px-6 md:px-16 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-none w-40 md:w-56 mx-auto md:mx-0"
          >
            {poster && (
              <img
                src={poster}
                alt={title}
                className="w-full rounded-xl shadow-2xl"
              />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1"
          >
            <h1 className="text-3xl md:text-5xl font-black mb-3">{title}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-400">
              {rating && (
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-yellow-400 font-bold">{rating}</span>
                </div>
              )}
              {year && (
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{year}</span>
                </div>
              )}
              {runtime && (
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{runtime}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {details.genres?.map((g) => (
                <span
                  key={g.id}
                  className="px-3 py-1 bg-gray-800 rounded-full text-xs font-medium"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-2xl">
              {details.overview}
            </p>

            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => goToPlayer(type, id)}
                className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors"
              >
                <Play size={20} className="fill-black" />
                Play
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  inWatchlist
                    ? removeFromWatchlist(details.id)
                    : addToWatchlist({ ...details, media_type: type })
                }
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold border transition-colors ${
                  inWatchlist
                    ? 'bg-green-600/20 border-green-500 text-green-400'
                    : 'bg-gray-800 border-gray-600 text-white hover:border-white'
                }`}
              >
                {inWatchlist ? <Check size={20} /> : <Plus size={20} />}
                {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {trailer && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">🎬 Trailer</h2>
            <div className="aspect-video max-w-4xl rounded-xl overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0&rel=0`}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        )}

        {cast?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">🎭 Cast</h2>
            <div
              className="flex gap-4 overflow-x-auto pb-4"
              style={{ scrollbarWidth: 'none' }}
            >
              {cast.map((person) => (
                <div key={person.id} className="flex-none w-24 text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-2 bg-gray-800">
                    {person.profile_path ? (
                      <img
                        src={getImageUrl(person.profile_path, 'w185')}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center text-2xl">
                        👤
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-medium text-white line-clamp-2">
                    {person.name}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {person.character}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {similar?.length > 0 && (
          <div className="mt-12">
            <ContentRow
              title="Similar Content"
              items={similar}
              loading={false}
              type={type}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
