import React, { useState, useEffect } from "react";
import "./home.css";
import video from "../../Assets/video01.mp4";
import { GrLocation } from "react-icons/gr";
import { HiFilter } from "react-icons/hi";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { BsListUl } from "react-icons/bs";
import { TbApps } from "react-icons/tb";
import { LiaTripadvisor } from "react-icons/lia";
import AOS from "aos";
import "aos/dist/aos.css";

function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(2500);

  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
  };

  useEffect(() => {
    if (!isMounted) {
      AOS.init({ duration: 2000 });
      setIsMounted(true);
    }
  }, [isMounted]);

  return (
    <section className="home">
      <div className="overlay"> </div>
      <video src={video} muted autoPlay loop type="video/mp4"></video>

      <div className="homeContent container">
        {/* Text Div */}
        <div className="textDiv">
          <span data-aos="fade-up" className="smallText">
            Our Packages
          </span>

          <h1 data-aos="fade-up" className="homeTitle">
            Search your Holiday
          </h1>
        </div>

        {/* Inner Card  */}
        <div data-aos="fade-up" className="cardDiv grid">
          {/* Destination Input */}
          <div className="destinationInput">
            <label htmlFor="date">Search you destination:</label>
            <div className="input flex">
              <input type="text" placeholder="Enter name here..." />
              <GrLocation className="icon" />
            </div>
          </div>
          {/* Date Input */}
          <div className="dateInput">
            <label htmlFor="city">Select your date:</label>
            <div className="input flex">
              <input type="date" />
            </div>
          </div>
          {/* Price Input */}
          <div className="priceInput">
            <div className="label_total flex">
              <label htmlFor="price">Select price:</label>
              <h3 className="total">${selectedPrice}</h3>
            </div>
            <div className="input flex">
              <input
                type="range"
                max={5000}
                min={500}
                step={100}
                value={selectedPrice}
                onChange={handlePriceChange}
              />
            </div>
          </div>
          {/* Search Bar */}
          <div className="searchOptions flex">
            <HiFilter className="icon" />
            <span>MORE FILTERS</span>
          </div>
        </div>

        {/* Icons */}
        <div data-aos="fade-up" className="homeFooterIcons flex">
          <div className="rightIcons">
            <FiFacebook className="icon" />
            <LiaTripadvisor className="icon" />
            <FaInstagram className="icon" />
          </div>

          <div className="leftIcons">
            <BsListUl className="icon" />
            <TbApps className="icon" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
