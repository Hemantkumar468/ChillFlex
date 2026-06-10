import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWatchlistStore = create(
  persist(
    (set, get) => ({
      watchlist: [],
      continueWatching: [],

      addToWatchlist: (item) => {
        const exists = get().watchlist.find((i) => i.id === item.id);
        if (exists) return;

        const mediaType = item.media_type || "movie";
        set((state) => ({
          watchlist: [...state.watchlist, { ...item, media_type: mediaType }],
        }));
      },

      removeFromWatchlist: (id) => {
        set((state) => ({
          watchlist: state.watchlist.filter((i) => i.id !== id),
        }));
      },

      isInWatchlist: (id) => {
        return get().watchlist.some((i) => i.id === id);
      },

      updateProgress: (item, progress) => {
        set((state) => {
          const existing = state.continueWatching.find((i) => i.id === item.id);
          if (existing) {
            return {
              continueWatching: state.continueWatching.map((i) =>
                i.id === item.id ? { ...i, progress } : i
              ),
            };
          }
          return {
            continueWatching: [...state.continueWatching, { ...item, progress }],
          };
        });
      },

      clearProgress: (id) => {
        set((state) => ({
          continueWatching: state.continueWatching.filter((i) => i.id !== id),
        }));
      },
    }),
    { name: "ott-watchlist" }
  )
);

export default useWatchlistStore;
