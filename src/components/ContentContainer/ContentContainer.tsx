import React from "react";

import "./ContentContainer.css";

interface Props {}

const ContentContainer: React.FC<Props> = ({ children }) => {
   return (
      <>
         <div className="content">{children}</div>
      </>
   );
};

export default ContentContainer;
