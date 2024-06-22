import React, { useEffect } from 'react';
import './Tentangkami.css';
import Navbar from '../../component/Navbar/Navbar';
import { FaYoutube, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Footer from '../../component/Footer/Footer';

function Tentangkami() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <>
      <Navbar />
      <div className="container headerTK d-flex flex-wrap align-items-center">
        <div className="col-6">
          <img src="assets/logo.png" alt="logo" className="img-fluid" />
        </div>
        <div className="col-6 d-flex flex-column">
          <span className="tentangKami">TENTANG KAMI</span>
          <span className="titleTK ">KisahLoka</span>
          <span className="descTK">
            <span className="colorBlue">KisahLoka</span> adalah sebuah platform yang menghadirkan kisah rakyat nusantara. Memperkenalkan keberagaman dan pesona
            cerita rakyat kepada semua lapisan masyarakat, serta meningkatkan minat literasi melalui platform digital.{' '}
          </span>
        </div>
      </div>

      {/* Image Side */}
      <div className=" teamTK d-flex flex-column justify-content-center align-items-center ">
        <div className="container d-flex  justify-content-center ">
          <div className="d-flex flex-column align-items-center">
            <span className="subTitleTK">YUK KENALAN</span>
            <span className="titleTimTK">Tim Dev</span>
            <span className="titleTimTK minTitle">Yowana Mandala</span>
          </div>
        </div>
        <div className="container mt-5">
          <div className=" col-12 d-flex flex-wrap justify-content-center align-items-center my-2">
            <div className="col-3 cardImage d-flex justify-content-center ">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="borderImage ">
                  <img src="assets/nona.png" alt="image" className="img-fluid " />
                </div>
                <span className="nameTeam">Nona Belanda</span>
                <span className="roleTeam">Hipster</span>
              </div>
            </div>
            <div className="col-3 cardImage d-flex justify-content-center ">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="borderImage ">
                  <img src="assets/dana.png" alt="image" className="img-fluid " />
                </div>
                <span className="nameTeam">Tf ke Dana?</span>
                <span className="roleTeam">Hustler</span>
              </div>
            </div>
          </div>
          <div className=" col-12 d-flex flex-wrap justify-content-center align-items-center my-2 mt-5">
            <div className="col-3 cardImage d-flex justify-content-center ">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="borderImage ">
                  <img src="assets/hafis.png" alt="image" className="img-fluid " />
                </div>
                <span className="nameTeam">Hafiz Teknik</span>
                <span className="roleTeam">Hipster</span>
              </div>
            </div>
            <div className="col-3 cardImage d-flex justify-content-center ">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="borderImage ">
                  <img src="assets/ardian.png" alt="image" className="img-fluid " />
                </div>
                <span className="nameTeam">Ardian</span>
                <span className="roleTeam">Hacker</span>
              </div>
            </div>
            <div className="col-3 cardImage d-flex justify-content-center ">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="borderImage ">
                  <img src="assets/dimas.png" alt="image" className="img-fluid " />
                </div>
                <span className="nameTeam">Dimasukin?</span>
                <span className="roleTeam">Hacker</span>
              </div>
            </div>
            <div className="col-3 cardImage d-flex justify-content-center ">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="borderImage ">
                  <img src="assets/alfi.png" alt="image" className="img-fluid " />
                </div>
                <span className="nameTeam">Donatur Alfi</span>
                <span className="roleTeam">Hacker</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subcribe Side */}
      <div className="subscribeSide container d-flex flex-wrap justify-content-center align-items-center">
        <div className="col-6">
          <img src="assets/aboutus.png" alt="subscribeImage" className="img-fluid " />
        </div>
        <div className="col-6 d-flex flex-column">
          <span className="tentangKami">IKUTI KAMI</span>
          <span className="aboutUsTitle mb-4">Dapatkan Informasi Terkini Ikuti Sosial Media Kami</span>
          <a
            className="d-flex my-3 flex-wrap align-items-center sosialMediaKisahloka"
            href="https://www.youtube.com/channel/UCdq4iT_AZwMQCMTr1A-uXFw"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube size={40} color="1a3a5c" className="me-5" /> <span className="iconText">Kisahlokaid</span>
          </a>
          <a
            className="d-flex my-3 flex-wrap align-items-center sosialMediaKisahloka"
            href="https://www.youtube.com/channel/UCdq4iT_AZwMQCMTr1A-uXFw"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={40} color="1a3a5c" className="me-5" /> <span className="iconText">Kisahlokaid</span>
          </a>
          <a
            className="d-flex my-3 flex-wrap align-items-center sosialMediaKisahloka"
            href="https://www.youtube.com/channel/UCdq4iT_AZwMQCMTr1A-uXFw"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={40} color="1a3a5c" className="me-5" /> <span className="iconText">Kisahlokaid</span>
          </a>
          <a
            className="d-flex my-3 flex-wrap align-items-center sosialMediaKisahloka"
            href="https://www.youtube.com/channel/UCdq4iT_AZwMQCMTr1A-uXFw"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={40} color="1a3a5c" className="me-5" /> <span className="iconText">Kisahlokaid</span>
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Tentangkami;
