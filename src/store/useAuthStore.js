import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      login: (profile) =>
        set({
          user: profile,
          isLoggedIn: true,
        }),

      logout: () =>
        set({
          user: null,
          isLoggedIn: false,
        }),
    }),
    {
      name: "ott-auth",
      version: 5,
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
      migrate: (persisted) => {
        if (!persisted) return persisted;
        return {
          user: persisted.user ?? persisted.googleUser ?? null,
          isLoggedIn:
            persisted.isLoggedIn ??
            persisted.isGoogleLoggedIn ??
            !!persisted.user ??
            false,
        };
      },
    }
  )
);

export default useAuthStore;
