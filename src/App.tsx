import React from "react";
import "./bootstrap.css";

import Navbar from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";

const App: React.FC = () => {
   return (
      <>
         <Navbar />
         <Footer />
      </>
   );
};

export default App;
