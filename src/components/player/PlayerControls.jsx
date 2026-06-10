import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const PlayerControls = ({ onBack }) => (
  <div className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50">
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onBack}
      aria-label="Back"
      className="inline-flex h-11 items-center gap-2 rounded-full bg-black/70 px-4 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition-colors hover:bg-black/90 sm:h-12 sm:px-5 sm:text-base"
    >
      <ArrowLeft size={20} />
      <span>Back</span>
    </motion.button>
  </div>
);

export default PlayerControls;
