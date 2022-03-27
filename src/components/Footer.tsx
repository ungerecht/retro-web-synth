import React from "react";
import { github } from "../icons";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-text">
          <h1>RETRO SYNTH</h1>
          <span className="tagline">An open-source web synthesizer</span>
          <br />
          <span>
            Developed by{" "}
            <a
              href="https://github.com/ungerecht"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kevin Ungerecht
            </a>
          </span>
        </div>
        <div className="icon-link">
          <a
            href="https://github.com/ungerecht/retro-web-synth"
            target="_blank"
            rel="noopener noreferrer"
          >
            {github}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
