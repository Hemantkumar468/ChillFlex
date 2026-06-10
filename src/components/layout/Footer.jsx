const Footer = () => (
  <footer className="bg-black border-t border-gray-900 py-8 px-6 md:px-16">
    <div className="max-w-6xl mx-auto">
      <p className="text-2xl font-black text-red-500 tracking-wider mb-4">
        ChillFlex
      </p>
      <p className="text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ChillFlex. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
