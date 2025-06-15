import AboutMe from "./AboutMe";
import Media from "./Media"; // Assuming this is correct
import Builds from "./Builds";
import Destinations from "./Destinations";


function Body() {
  return (
    <div className="w-full pt-0 pb-0 text-lg space-y-0">
      <section id="about-me"  className="scroll-mt-[6px]">
      <AboutMe />
      </section>
      <section id="media" className="scroll-mt-[34px]"> 
      <Media />
      </section>
      <section id="builds"  className="scroll-mt-[8px]">
      <Builds />
      </section>
      <section id="destinations"  className="scroll-mt-[4px]">
      <Destinations />
      </section>
          </div>
  );
}

export default Body;
