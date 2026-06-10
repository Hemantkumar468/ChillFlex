import { motion } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  className = "",
  onClick,
  ...props
}) => {
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200",
    secondary: "bg-gray-600/80 text-white hover:bg-gray-500/80 backdrop-blur-sm",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "bg-transparent border border-gray-600 text-white hover:border-white",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-bold transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
