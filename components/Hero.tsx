"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Hero = () => {
  return (
    <>
      <main className="w-full mt-40 lg:mt-44 -z-10">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          emulateTouch={true}
          renderArrowPrev={() => false}
          renderArrowNext={() => false}
        >
          <div className="relative">
            <img
              src="slide1.jpg"
              className="aspect-[1/1] lg:h-[60vh] md:aspect-auto object-cover"
            />
          </div>
          <div className="relative">
            <img
              src="slide2.jpg"
              className="aspect-[1/1] lg:h-[60vh] md:aspect-auto object-cover"
            />
          </div>
          <div className="relative">
            <img
              src="slide3.jpg"
              className="aspect-[1/1] lg:h-[60vh] md:aspect-auto object-cover"
            />
          </div>
          <div className="relative">
            <img
              src="slide4.jpg"
              className="aspect-[1/1] lg:h-[60vh] md:aspect-auto object-cover"
            />
          </div>
        </Carousel>
      </main>
    </>
  );
};

export default Hero;
