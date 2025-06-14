import AboutMe from "./AboutMe";
import Media from "./Media"; // Assuming this is correct
import Builds from "./Builds";
import Destinations from "./Destinations";


function Body() {
  return (
    <div className="w-full pt-48 pb-0 text-lg space-y-0">
      <section id="about-me">
      <AboutMe />
      </section>
      <section id="media"> 
      <Media />
      </section>
      <section id="builds">
      <Builds />
      </section>
      <section id="destinations">
      <Destinations />
      </section>
          </div>
  );
}

export default Body;
