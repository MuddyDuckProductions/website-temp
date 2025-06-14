import React from 'react';
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube
} from 'lucide-react';

function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-4 px-6 flex flex-wrap justify-center items-center gap-4 text-sm text-center">
      <span>&copy; {new Date().getFullYear()} Muddy Duck Offroad. All rights reserved.</span>
      <span>|</span>

      <a
        href="https://www.instagram.com/muddyduckoffroad/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-yellow-500 hover:text-white"
      >
        <Instagram size={18} />
      </a>

      <a
        href="https://www.facebook.com/profile.php?id=61576921557564"
        target="_blank"
        rel="noopener noreferrer"
        className="text-yellow-500 hover:text-white"
      >
        <Facebook size={18} />
      </a>

      <a
        href="https://x.com/MuddyDuckProduc"
        target="_blank"
        rel="noopener noreferrer"
        className="text-yellow-500 hover:text-white"
      >
        <Twitter size={18} />
      </a>

      <a
        href="https://www.youtube.com/@muddyduckoffroad"
        target="_blank"
        rel="noopener noreferrer"
        className="text-yellow-500 hover:text-white"
      >
        <Youtube size={18} />
      </a>

      <span>|</span>
      <span className="text-xs">
        Contact us: 
        <a
          href="mailto:Mark@MuddyDuckProductions.com"
          className="text-yellow-500 ml-1"
        >
          Mark@MuddyDuckProductions.com
        </a>
      </span>
      <span>|</span>
      <span className="text-xs italic">Stay Muddy.</span>
    </footer>
  );
}

export default Footer;
