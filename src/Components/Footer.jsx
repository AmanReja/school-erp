import React from "react";
import {
  Heart,
  Github,
  Mail,
  HelpCircle,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white px-5 py-4 lg:px-7">
      <div className="flex flex-col items-center justify-between gap-3 text-xs text-gray-500 sm:flex-row">

        {/* LEFT */}
        <div className="flex items-center gap-1">
          <span>© {new Date().getFullYear()}</span>

          <span className="font-medium text-gray-800">
            Attendance System
          </span>

          <span>· All rights reserved.</span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5">

          <button
            type="button"
            className="flex items-center gap-1.5 transition hover:text-gray-900"
          >
            <HelpCircle size={14} />
            Help
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5 transition hover:text-gray-900"
          >
            <Mail size={14} />
            Contact
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5 transition hover:text-gray-900"
          >
            <Github size={14} />
            GitHub
          </button>

        </div>

      </div>

      {/* MADE WITH */}
      <div className="mt-2 flex justify-center items-center gap-1 text-[11px] text-gray-400">
        Made with
        <Heart
          size={11}
          className="fill-current"
        />
        for better attendance management
      </div>
    </footer>
  );
};

export default Footer;