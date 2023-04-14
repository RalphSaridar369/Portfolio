import React from "react";
import Contact from "./contact/Contact";
import "./Footer.scss";
import { footer_links } from "./Static";

const Footer = () => {
  return (
    <>
      <div className="lighter"></div>
      <div className="footer-container">
        <div className="footer-left">
          <h5>Contact Us</h5>
          <br />
          {footer_links.map((link, index) => (
            <p key={index}>
              <a href={link.link} target="blank_">
                {link.text}
              </a>
            </p>
          ))}
        </div>
        <Contact className="footer-right" />
      </div>
    </>
  );
};

export default Footer;
