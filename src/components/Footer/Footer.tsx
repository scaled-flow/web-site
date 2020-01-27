import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
   return (
      <div className="footer">
         <span>SCALED FLOW &reg; {new Date().getFullYear()}</span>
      </div>
   );
};

export default Footer;
