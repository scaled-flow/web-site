import React from "react";

interface Props {}

const FAInstructions: React.FC<Props> = () => {
  return (
    <>
      <div className="fa-instructions">
        <h3>Font Awesome Instructions</h3>
        <ol className="text-left">
          <li>
            Go to{" "}
            <a href="https://fontawesome.com/icons" target="_blank" rel="noopener noreferrer">
              Font Awesome
            </a>
          </li>
          <li>Search for the icon you want</li>
          <li>Click on that icon</li>
          <li>
            Click the button that <span>Start Using This Icon</span>
          </li>
          <li>
            Copy <span>just</span> the text inside the <code>class</code> attribute.{" "}
            <span>Don't copy the quotations.</span> It will look something like: <code>fab fa-accessible-icon</code>
          </li>
        </ol>
      </div>
    </>
  );
};

export default FAInstructions;
