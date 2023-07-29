import React from "react";
import { FaGithub } from "react-icons/fa";

const Footnote = () => {
  return (
    <footer className="bg-gray-900 text-center py-6 mt-8">
      <a
        href="https://github.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center text-red-500 hover:text-red-700 transition-colors duration-300"
      >
        <FaGithub size={24} />
      </a>
    </footer>
  );
};

export default Footnote;
