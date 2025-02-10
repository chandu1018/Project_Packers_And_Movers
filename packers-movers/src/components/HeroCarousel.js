import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Slide1 from "../images/packers-and-movers-indiranagar.png";
import Slide2 from "../images/packers-movers-charges-banner.jpg";

export default function HeroCarousel() {
  return (
    <Carousel fade>
      <Carousel.Item interval={2500}>
        <img className="d-block w-100 hero" src={Slide1} alt="First Slide" />
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img className="d-block w-100 hero" src={Slide2} alt="Second Slide" />
      </Carousel.Item>
    </Carousel>
  );
}
