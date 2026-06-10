const Badge = ({ children, className = "" }) => (
  <span
    className={`px-3 py-1 bg-gray-800 rounded-full text-xs font-medium ${className}`}
  >
    {children}
  </span>
);

export default Badge;
