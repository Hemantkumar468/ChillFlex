import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGoogleLogin, useGoogleOAuth } from '@react-oauth/google';
import { exchangeGoogleAuthCode } from '../../api/googleAuth';
import useAuthStore from '../../store/useAuthStore';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const APP_ORIGIN = typeof window !== 'undefined' ? window.location.origin : '';

const GoogleSignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginWithGoogle = useAuthStore((s) => s.loginWithGoogle);
  const { scriptLoadedSuccessfully } = useGoogleOAuth();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const redirectTo = location.state?.from || '/profile';

  const finishLogin = (user, accessToken = null) => {
    loginWithGoogle(user, accessToken);
    navigate(redirectTo, { replace: true });
  };

  const loginWithPopup = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: 'popup',
    onSuccess: async (codeResponse) => {
      setLoading(true);
      setLoginError(null);
      try {
        const { user, accessToken } = await exchangeGoogleAuthCode(
          codeResponse.code,
          'postmessage'
        );
        finishLogin(user, accessToken);
      } catch (err) {
        console.error(err);
        setLoginError(
          err.message ||
            'A Google system error occurred. Please try again later'
        );
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setLoginError(
        `origin_mismatch — Please add this exact origin in the Google Cloud Console: ${APP_ORIGIN}`
      );
    },
  });

  if (!GOOGLE_CLIENT_ID) {
    return (
      <div className="w-full max-w-md rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
        <p className="font-semibold mb-1">Google Client ID missing</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-4">
      {loginError && (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
          {loginError}
        </div>
      )}

      <div className="flex flex-col gap-3">
        <button
          type="button"
          disabled={!scriptLoadedSuccessfully || loading}
          onClick={() => loginWithPopup()}
          className="w-full flex items-center justify-center gap-3 rounded-full bg-white text-gray-900 py-3 px-6 font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg>
          {loading ? 'Signing in...' : 'Continue with Google'}
        </button>
      </div>
    </div>
  );
};

export default GoogleSignIn;
