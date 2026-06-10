import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      googleUser: null,
      isGoogleLoggedIn: false,
      accessToken: null,

      loginWithGoogle: (profile, accessToken = null) =>
        set({
          googleUser: profile,
          isGoogleLoggedIn: true,
          accessToken,
        }),

      signOutGoogle: () =>
        set({
          googleUser: null,
          isGoogleLoggedIn: false,
          accessToken: null,
        }),
    }),
    {
      name: "ott-auth",
      version: 4,
      partialize: (state) => ({
        googleUser: state.googleUser,
        isGoogleLoggedIn: state.isGoogleLoggedIn,
      }),
      migrate: (persisted) => {
        if (!persisted) return persisted;

        return {
          googleUser: persisted.googleUser ?? persisted.user ?? null,
          isGoogleLoggedIn:
            persisted.isGoogleLoggedIn ??
            persisted.isAuthenticated ??
            !!persisted.googleUser,
          accessToken: null,
        };
      },
    }
  )
);

export default useAuthStore;
