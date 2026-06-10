import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GoogleSignIn from '../components/auth/GoogleSignIn';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 pb-16 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center"
      >
        <p className="text-red-500 font-black text-2xl tracking-wider mb-2">
          ChillFlex
        </p>
        <h1 className="text-3xl font-black mb-2">Sign in</h1>
        <p className="text-gray-400 text-sm mb-8">
          Continue with your Google account to access your profile and
          watchlist.
        </p>

        <GoogleSignIn />

        <Link
          to="/"
          className="inline-block mt-8 text-sm text-gray-500 hover:text-white transition-colors"
        >
          ← Back to home
        </Link>
      </motion.div>
    </div>
  );
};

export default LoginPage;
