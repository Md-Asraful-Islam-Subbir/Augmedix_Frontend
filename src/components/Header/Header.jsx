import React, { useState } from "react";
import Slider from "react-slick";
import "./Header.css";
import { assets } from "../../assets/assets";

const HeaderSlide = ({ title, description, buttonText, imageSrc }) => (
  <div className="header">
    <div className="header-contents">
      <h1>{title}</h1>
      <p>{description}</p>
      <button className="header-button">{buttonText}</button>
    </div>
    <div className="header-image-container">
      <img src={imageSrc} alt="Header Visual" className="header-image" />
    </div>
  </div>
);

function Header() {
  const [dotActive, setDotActive] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 600,
    arrows: false,
    beforeChange: (prev, next) => setDotActive(next),
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul style={{ display: "flex", gap: "10px", margin: 0, padding: 0 }}>
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: i === dotActive ? "#262626" : "#ccc",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      />
    ),
  };

  const slides = [
    {
      title: "Join Our Fast-Growing Healthtech Company",
      description: "Work with the latest AI technology and help impact the global healthcare industry.",
      buttonText: "Let's Talk",
      imageSrc: assets.header_img,
    },
    {
      title: "Streamline Clinical Documentation",
      description: "Our AI and medical scribe solutions help reduce clinician burnout and improve patient care.",
      buttonText: "Learn More",
      imageSrc: assets.header_img1,
    },
    {
      title: "Empowering Healthcare Providers",
      description: "We enable doctors to focus more on patients by handling administrative tasks.",
      buttonText: "Get Started",
      imageSrc: assets.header_img2,
    },
  ];

  return (
    <div className="header-slider-container">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <HeaderSlide key={index} {...slide} />
        ))}
      </Slider>
    </div>
  );
}

export default Header;