import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './../assets/logo.svg';
import Camera from './../assets/camera.svg';

import './Header.css';

export default function Header() {
  return (
    <header id="main-header">
      <div className="header-content">
        <Link to="/">
          <img src={Logo} alt="InstaRocket" />
        </Link>
        <Link to="/new">
          <img src={Camera} alt="Enviar publicação" />
        </Link>
      </div>
    </header>
  );
}
