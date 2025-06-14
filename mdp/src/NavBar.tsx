function NavBar() {
  return (
    <nav className="w-full bg-[#242424] p-4">
      <div className="max-w-6xl mx-auto flex justify-evenly items-center pt-0">
        <a href="/#about-me" className="text-white hover:text-yellow-400 text-4xl">About Me</a>
        <a href="/gallery" className="text-white hover:text-yellow-400 text-4xl">Gallery</a>
        <a
          href="https://www.youtube.com/@muddyduckoffroad"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-yellow-400 text-4xl"
        >
          YouTube
        </a>
        <a href="/#builds" className="text-white hover:text-yellow-400 text-4xl">Builds</a>
        <a href="/calendar" className="text-white hover:text-yellow-400 text-4xl">Calendar</a>
        <a href="/#destinations" className="text-white hover:text-yellow-400 text-4xl">Destinations</a>
        <a href="/onX" className="text-white hover:text-yellow-400 text-4xl">onX trails</a>
      </div>
    </nav>
  );
}

export default NavBar;
