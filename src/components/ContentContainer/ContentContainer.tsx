import React from "react";

import "./ContentContainer.css";

interface Props {
  customColor?: string;
}

const ContentContainer: React.FC<Props> = ({ children, customColor }) => {
  return (
    <>
      <div className="content" style={{ backgroundColor: customColor }}>
        {children}
      </div>
    </>
  );
};

export default ContentContainer;
