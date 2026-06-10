import axios from "axios";

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

// Home Page APIs
export const getTrending = (page = 1) =>
  tmdb.get("/trending/all/week", { params: { page } });
export const getPopularMovies = (page = 1) =>
  tmdb.get("/movie/popular", { params: { page } });
export const getTopRatedMovies = (page = 1) =>
  tmdb.get("/movie/top_rated", { params: { page } });
export const getPopularTVShows = (page = 1) =>
  tmdb.get("/tv/popular", { params: { page } });
export const getUpcomingMovies = (page = 1) =>
  tmdb.get("/movie/upcoming", { params: { page } });
export const getNowPlaying = (page = 1) =>
  tmdb.get("/movie/now_playing", { params: { page } });

// Movies APIs
export const getDiscoverMovies = (page = 1) =>
  tmdb.get("/discover/movie", { params: { page, sort_by: "popularity.desc" } });

// TV Shows APIs
export const getTopRatedTV = (page = 1) =>
  tmdb.get("/tv/top_rated", { params: { page } });
export const getOnTheAir = (page = 1) =>
  tmdb.get("/tv/on_the_air", { params: { page } });
export const getAiringToday = (page = 1) =>
  tmdb.get("/tv/airing_today", { params: { page } });
export const getDiscoverTV = (page = 1) =>
  tmdb.get("/discover/tv", { params: { page, sort_by: "popularity.desc" } });

// Detail Page APIs
export const getMovieDetails = (id) => tmdb.get(`/movie/${id}`);
export const getTVDetails = (id) => tmdb.get(`/tv/${id}`);
export const getMovieVideos = (id) => tmdb.get(`/movie/${id}/videos`);
export const getTVVideos = (id) => tmdb.get(`/tv/${id}/videos`);
export const getMovieCredits = (id) => tmdb.get(`/movie/${id}/credits`);
export const getSimilarMovies = (id) => tmdb.get(`/movie/${id}/similar`);
export const getSimilarTV = (id) => tmdb.get(`/tv/${id}/similar`);

// Search API
export const searchMulti = (query, page = 1) =>
  tmdb.get("/search/multi", { params: { query, page } });

// Genre APIs
export const getMovieGenres = () => tmdb.get("/genre/movie/list");
export const getTVGenres = () => tmdb.get("/genre/tv/list");
export const getMoviesByGenre = (genreId, page = 1) =>
  tmdb.get("/discover/movie", { params: { with_genres: genreId, page } });
export const getTVByGenre = (genreId, page = 1) =>
  tmdb.get("/discover/tv", { params: { with_genres: genreId, page } });

// Image URL helper
export const getImageUrl = (path, size = "w500") =>
  path ? `${import.meta.env.VITE_TMDB_IMAGE_BASE}/${size}${path}` : null;

// Authentication APIs
export const createRequestToken = () => tmdb.post("/authentication/token/new");

export const createSession = (requestToken) =>
  tmdb.post("/authentication/session/new", { request_token: requestToken });

export const deleteSession = (sessionId) =>
  tmdb.delete("/authentication/session", { data: { session_id: sessionId } });

export const getAccountDetails = (sessionId) =>
  tmdb.get("/account", { params: { session_id: sessionId } });

// Account Favorites APIs
export const getFavoriteMovies = (accountId, sessionId, page = 1) =>
  tmdb.get(`/account/${accountId}/favorite/movies`, {
    params: { session_id: sessionId, page },
  });

export const getFavoriteTV = (accountId, sessionId, page = 1) =>
  tmdb.get(`/account/${accountId}/favorite/tv`, {
    params: { session_id: sessionId, page },
  });

export const markAsFavorite = (accountId, sessionId, mediaType, mediaId, favorite = true) =>
  tmdb.post(
    `/account/${accountId}/favorite`,
    { media_type: mediaType, media_id: mediaId, favorite },
    { params: { session_id: sessionId } }
  );
