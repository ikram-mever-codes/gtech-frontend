import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import WrongCredentials from "./Pages/WrongCredentials/WrongCredentials";
import ProtectedRoute, { getAuthWithExpiry } from "./ProtectedRoute";

const App = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const storedAuth = getAuthWithExpiry();
    if (storedAuth === null) {
      setAuth(false);
    } else {
      setAuth(storedAuth);
    }
  }, []);

  return (
    <div className="main">
      <Router>
        {auth && <Header />}
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/wrong-credentials" element={<WrongCredentials />} />
        </Routes>
        {auth && <Footer />}
      </Router>
    </div>
  );
};

export default App;
