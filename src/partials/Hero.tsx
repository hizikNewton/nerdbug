import { FC } from "react";
import weather from "assets/weather.png";
const Hero: FC = () => {
  return (
    <section className="relative">
      {/* Illustration behind hero content */}

      <div className="flex items-center max-w-6xl px-4 mx-auto sm:px-6 bg-hero">
        <div className="pt-20 pb-12 md:pt-40 md:pb-20 md:w-[60%]">
          <div className="flex flex-col w-full md:w-[640px] items-center ">
            <div className="mb-4 text-4xl font-bold text-center md:text-5xl ">
              Our Weather Service for Your Convenience
            </div>
            <div className="w-64 mb-8 text-base font-normal text-center md:w-full ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br />
              sed do eiusmod tempor incididunt ut labore et dolore magna.
            </div>
          </div>
        </div>
        <div className="hidden md:w-[40%] md:block ">
          <img src={weather} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
