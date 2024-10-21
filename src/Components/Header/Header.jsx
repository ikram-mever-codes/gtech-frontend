import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src="logo.jpg" alt="G Tech Logo" />
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ul className="header-menu">
          <li>
            <Link to={"#"}>Home</Link>
          </li>
          <li>
            <Link to={"#"}>Products</Link>
          </li>
          <li>
            <Link to={"#"}>About</Link>
          </li>
          <li>
            <Link to={"#"}>Contact</Link>
          </li>
        </ul>
      </div>
      <div className="header-profile">
        <button>Logout</button>
      </div>
    </header>
  );
};

export default Header;
