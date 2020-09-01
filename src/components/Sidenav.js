import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import M from 'materialize-css';

class Sidenav extends Component {
  componentDidMount() {
    const sidenav = document.querySelector(".navigation-mobile");
    const background = document.querySelector(".background");
    document.querySelector(".mobile").addEventListener("click", function () {
      sidenav.style.right = '0'
      background.style.opacity = "1"
      background.style.visibility = "visible"
    });
    background.addEventListener('click', e => {
      sidenav.style.right = '-20rem'
      background.style.opacity = "0"
      background.style.visibility = "hidden"
    })
    document.querySelectorAll(".navigation-mobile li").forEach(i => {
      i.addEventListener("click", function () {
        sidenav.style.right = '-20rem'
        background.style.opacity = "0"
        background.style.visibility = "hidden"
      });
    });
  }
  render() {
    return (
      <div className="navigation-mobile-wrapper">
        <div className="background"></div>
        <ul className="navigation-mobile">

          <li><Link to="/telegram-gruplari">TELEGRAM GRUPLARI</Link></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://discord.gg/cZRhbuJ">DISCORD</a></li>
          <li><Link to="/kaynaklar">KAYNAKLAR</Link></li>
          {/*
        <li><Link to="/blog">BLOG</Link></li>        
        <li><Link to="/amacimiz">AMACIMIZ</Link></li>
        <li><Link to="/projeler">PROJELER</Link></li>
        <li><Link to="/is-ilanlari">İŞ İLANLARI</Link></li>
    <li><Link to="/iletisim">İLETİŞİM</Link></li>*/}
        </ul>
      </div>
    )
  }
}

export default Sidenav;