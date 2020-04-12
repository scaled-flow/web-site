import React from "react";
import CookiesModal from "../Analytics/CookiesModal"
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <div className="footer-container">
      <CookiesModal />
      <div className="footer">
        <span>SCALED FLOW &reg; {new Date().getFullYear()}</span>
      </div>
    </div>
  );
};

export default Footer;
