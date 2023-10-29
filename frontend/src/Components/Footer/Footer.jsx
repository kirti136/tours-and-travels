import React, { useState, useEffect } from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import video from "../../Assets/video02.mp4";
import { FiSend } from "react-icons/fi";
import { MdOutlineTravelExplore } from "react-icons/md";
import {
  FaTwitter,
  FaYoutube,
  FaInstagramSquare,
  FaTripadvisor,
} from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";

function Footer() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      AOS.init({ duration: 2000 });
      setIsMounted(true);
    }
  }, [isMounted]);

  return (
    <section className="footer">
      <div className="videoDiv">
        <video src={video} loop autoPlay muted type="video/mp4"></video>
      </div>

      <div className="secContent container">
        <div data-aos="fade-up" className="contactDiv flex">
          <div className="text">
            <small>KEEP IN TOUCH</small>
            <h2>Travel with us</h2>
          </div>

          <div className="inputDiv flex">
            <input
              data-aos="fade-up"
              type="text"
              placeholder="Enter Email Address"
            />
            <button data-aos="fade-up" className="btn flex" type="submit">
              SEND <FiSend className="icon" />
            </button>
          </div>
        </div>

        <div className="footerCard flex">
          {/* Footer Intro,Logo,Para,Social */}
          <div className="footerIntro flex">
            {/* Logo */}
            <div className="logoDiv">
              <Link to={"/"} className="a logo flex">
                <MdOutlineTravelExplore className="icon" /> Travel.
              </Link>
            </div>
            {/* Paragraph */}
            <div data-aos="fade-up" className="footerParagraph">
              "Embark on a journey of unforgettable adventures and discover the
              world's wonders with our travel and tour services. Let us turn
              your dreams into extraordinary memories."
            </div>
            {/* Socials */}
            <div data-aos="fade-up" className="footerSocials flex">
              <FaTwitter className="icon" />
              <FaYoutube className="icon" />
              <FaInstagramSquare className="icon" />
              <FaTripadvisor className="icon" />
            </div>
          </div>

          {/* Links */}
          <div className="footerLinks grid">
            {/* Group 01 */}
            <div
              data-aos-duration="2000"
              data-aos="fade-up"
              className="linkGroup"
            >
              <span className="groupTitle">OUR AGENCY</span>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Services
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Insurance
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Agency
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Tourism
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Payment
              </li>
            </div>

            {/* Group 02 */}
            <div
              data-aos-duration="2000"
              data-aos="fade-up"
              className="linkGroup"
            >
              <span className="groupTitle">PARTNERS</span>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Bookings
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Rentcars
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                HotelWorld
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Trivage
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                TripAdvisor
              </li>
            </div>

            {/* Group 03 */}
            <div
              data-aos-duration="2000"
              data-aos="fade-up"
              className="linkGroup"
            >
              <span className="groupTitle">LAST MINUTE</span>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                London
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Canada
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                California
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Bharat
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Indonesia
              </li>
            </div>
          </div>

          {/* Footer Div */}
          <div className="footerDiv flex">
            <small>BEST TRAVEL WEBSITE THEME</small>
            <small>COPYRIGHTS RESERVED - TRAVEL 2023</small>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
