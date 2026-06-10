import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const LoginToWatch = ({ className = '' }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`aspect-video rounded-xl bg-gray-900 border border-gray-800 flex flex-col items-center justify-center gap-4 p-6 text-center ${className}`}
    >
      <div className="w-14 h-14 rounded-full bg-red-600/20 flex items-center justify-center">
        <Lock size={24} className="text-red-400" />
      </div>
      <div>
        <p className="text-white font-semibold mb-1">Sign in to watch</p>
        <p className="text-gray-400 text-sm">
          Please sign in with Google to watch the video
        </p>
      </div>
      <button
        type="button"
        onClick={() => navigate('/login')}
        className="px-6 py-2.5 bg-red-600 rounded-lg font-semibold text-white hover:bg-red-700 transition-colors"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginToWatch;
