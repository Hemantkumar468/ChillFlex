import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { exchangeGoogleAuthCode } from "../api/googleAuth";
import useAuthStore from "../store/useAuthStore";

const GoogleAuthCallbackPage = () => {
  const navigate = useNavigate();
  const loginWithGoogle = useAuthStore((s) => s.loginWithGoogle);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const oauthError = params.get("error");

      if (oauthError) {
        setError("Google sign-in was cancelled or denied.");
        return;
      }

      if (!code) {
        setError("Authorization code missing. Please try again.");
        return;
      }

      try {
        const redirectUri = `${window.location.origin}/auth/google/callback`;
        const { user, accessToken } = await exchangeGoogleAuthCode(code, redirectUri);
        loginWithGoogle(user, accessToken);
        navigate("/profile", { replace: true });
      } catch (err) {
        console.error(err);
        setError(err.message || "Google login failed. Please try again.");
      }
    };

    handleCallback();
  }, [loginWithGoogle, navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white gap-4 px-6">
        <p className="text-red-400 text-center">{error}</p>
        <button
          onClick={() => navigate("/login", { replace: true })}
          className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700"
        >
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white gap-4">
      <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-400 text-sm">Completing Google sign-in...</p>
    </div>
  );
};

export default GoogleAuthCallbackPage;
