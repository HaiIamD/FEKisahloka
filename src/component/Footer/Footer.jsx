import React from 'react';
import './Footer.css';
import { FaYoutube, FaFacebook, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <div className="Footer d-flex flex-column justify-content-center align-items-center">
        <span className="titleFooter">Kisahloka</span>
        <span className="subTitleFooter">“Hidupkan Cerita Lestarikan Budaya Nusantara”</span>
        <div className="d-flex flex-wrap my-2 mt-3">
          <Link to={'/'} className="navFooter mx-3">
            Beranda
          </Link>
          <Link to={'/daftarcerita'} className="navFooter mx-3">
            Daftar Cerita
          </Link>
          <Link to={'/bookmark'} className="navFooter mx-3">
            Bookmark
          </Link>
          <Link to={'/tentangkami'} className="navFooter mx-3">
            Tentang Kami
          </Link>
        </div>
        <hr className="col-11 hr" />
        <div className="col-11 d-flex justify-content-between">
          <div className="col-4">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="mx-2 icon" color="fff" size={25} />
            </a>
            <a href="/daftarcerita" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="mx-2 icon" color="fff" size={25} />
            </a>
            <a href="/login" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="mx-2 icon" color="fff" size={25} />
            </a>
          </div>
          <div className="col-4 d-flex flex-wrap align-items-center justify-content-end">
            <span className="navFooter me-2">©Kisahloka </span>
            <span className="subTitleFooter">All Rights Reserved. Website by Team Yowana Mandala</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
