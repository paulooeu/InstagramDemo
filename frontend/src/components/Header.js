import React from "react";
import logo from "../assets/instagram.png";
import camera from "../assets/camera.svg";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header id="main-header">
      <div className="header-content">
        <Link to="/">
          <img src={logo} alt="Insta" width="150px" />
        </Link>
        <Link to="/new">
          <img src={camera} alt="Enviar publicaçao" width="30px" />
        </Link>
      </div>
    </header>
  );
}
