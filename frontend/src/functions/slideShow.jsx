import React, { useState, useEffect } from "react";
import "./Slideshow.css";

const images = [
  "/image1.jpeg",
  "/image2.jpg",
  "/image3.jpg",
  "/image4.jpg",
  "/image5.jpeg",
  "/image6.jpeg",
  "/image7.jpg",
  "/image8.jpg",
  "/image9.avif",
  "/image10.jpg",
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 200); // Change image every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="slideshow-container">
      <img
        src={images[currentIndex]}
        alt="Slideshow"
        className="slideshow-image"
      />
    </div>
  );
};

export default Slideshow;
