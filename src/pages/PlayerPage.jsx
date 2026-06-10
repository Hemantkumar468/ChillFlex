import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getMovieVideos, getTVVideos, getMovieDetails, getTVDetails } from "../api/tmdb";
import useWatchlistStore from "../store/useWatchlistStore";
import VideoPlayer from "../components/player/VideoPlayer";
import PlayerControls from "../components/player/PlayerControls";

const PlayerPage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [videoKey, setVideoKey] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(true);
  const { updateProgress } = useWatchlistStore();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoFn = type === "movie" ? getMovieVideos : getTVVideos;
        const detailFn = type === "movie" ? getMovieDetails : getTVDetails;

        const [videoRes, detailRes] = await Promise.all([
          videoFn(id),
          detailFn(id),
        ]);

        const youtubeVideos =
          videoRes.data.results?.filter((v) => v.site === "YouTube") || [];

        const trailer =
          youtubeVideos.find((v) => v.type === "Trailer") ||
          youtubeVideos.find((v) => v.type === "Teaser") ||
          youtubeVideos.find((v) => v.type === "Clip") ||
          youtubeVideos[0];

        setVideoKey(trailer?.key || null);
        setTitle(detailRes.data.title || detailRes.data.name);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id, type]);

  const handleProgress = ({ played: progress }) => {
    updateProgress({ id: Number(id), title, media_type: type }, Math.round(progress * 100));
  };

  const handleBack = () => {
    const from = location.state?.from;
    const fromPath = from?.pathname
      ? `${from.pathname}${from.search || ""}${from.hash || ""}`
      : "/";

    setPlaying(false);
    navigate(fromPath.startsWith("/player/") ? "/" : fromPath, { replace: true });
  };

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <PlayerControls onBack={handleBack} />

      <div className="min-h-screen flex items-center justify-center px-3 py-20 sm:px-6 lg:px-8">
        {loading ? (
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
        ) : videoKey ? (
          <div className="w-full max-w-6xl">
            <VideoPlayer
              videoKey={videoKey}
              onProgress={handleProgress}
              playing={playing}
            />
          </div>
        ) : (
          <div className="text-center text-white">
            <div className="text-6xl mb-4">🎬</div>
            <p className="text-xl font-semibold mb-2">No video available</p>
            <p className="text-gray-400">Trailer not found for this title</p>
            <button
              onClick={handleBack}
              className="mt-6 px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerPage;
