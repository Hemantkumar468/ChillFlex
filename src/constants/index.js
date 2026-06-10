export const APP_NAME = "ChillFlex";
export const APP_LOGO = "/logo.png";

export const ROUTES = {
  HOME: "/",
  MOVIES: "/movies",
  TV_SHOWS: "/tv-shows",
  SEARCH: "/search",
  PROFILE: "/profile",
  WATCHLIST: "/my-list",
  LOGIN: "/login",
  GOOGLE_CALLBACK: "/auth/google/callback",
  DETAIL: (type, id) => `/detail/${type}/${id}`,
  PLAYER: (type, id) => `/player/${type}/${id}`,
};
