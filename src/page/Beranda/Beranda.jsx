import React, { useEffect, useRef, useState } from 'react';
import './Beranda.css';
import Navbar from '../../component/Navbar/Navbar';
import { FaYoutube, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Footer from '../../component/Footer/Footer';

import { FaArrowRightLong } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import Berandacard from '../../component/berandaCard/Berandacard';
import { setJenisCeritaRedux } from '../../state/redux';
import { useNavigate } from 'react-router-dom';

function Beranda() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navbarBackground = useRef(null);
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state?.user?._id);
  const [atBody, setAtBody] = useState(false);
  const [recomendation, setRecomendation] = useState([]);

  const getCeritaFavorite = async () => {
    try {
      const fetchData = await fetch(`${import.meta.env.VITE_GETALL_CERITA}?limit=4&offset=0`, {
        method: 'GET',
        headers: {
          Authorization: 'guestKisahloka',
        },
      });
      const data = await fetchData.json();
      setRecomendation(data);
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToSection = () => {
    const target = document.getElementById('targetSection');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const clickCardJenisCerita = (jenis) => {
    dispatch(
      setJenisCeritaRedux({
        jeniscerita: jenis,
      })
    );
    navigate('/daftarcerita');
  };

  useEffect(() => {
    function handleScroll() {
      if (navbarBackground.current) {
        const { top } = navbarBackground.current.getBoundingClientRect();
        setAtBody(top <= 0);
      }
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    getCeritaFavorite();
  }, []);

  return (
    <>
      <Navbar atBody={atBody} />
      <div className="relativeBeranda">
        <div className="stickBeranda">
          <div
            className="bgHeroSection d-flex flex-column justify-content-center align-items-center"
            style={{ backgroundImage: "url('assets/herosection.png')" }}
          >
            <span className="subTitleHomepage">K I S A H L O K A</span>
            <span className="titleHomepage">Perpustakaan Cerita Rakyat Nusantara</span>
            <span className="subTitleHomepage">
              Kisahloka mengumpulkan lebih dari 100 cerita dari seluruh nusantara. Temukan uniknya keragaman kisah nusantara disini.
            </span>
            <button className="py-3 px-5 buttonHomePage" onClick={() => scrollToSection()}>
              Jelajahi Cerita Nusantara
            </button>
            <div className="d-flex flex-wrap" target="_blank" rel="noopener noreferrer">
              <a href="https://www.youtube.com/" className="borderIcon">
                <FaYoutube size={25} color="1a3a5c" />
              </a>
              <a href="https://www.youtube.com/" className="borderIcon" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={25} color="1a3a5c" />
              </a>
              <a href="https://www.youtube.com/" className="borderIcon" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={25} color="1a3a5c" />
              </a>
              <a href="https://www.youtube.com/" className="borderIcon" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={25} color="1a3a5c" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bodySection d-flex flex-column justify-content-center align-items-center py-5" ref={navbarBackground}>
        <span className="subTitleHomepage orangeText">Mitra Kami :</span>
        <div className="d-flex flex-wrap justify-content-center gap-5 mt-3 mb-5" id="targetSection">
          <img src="/assets/kampusmerdeka.png" alt="Kampus Merdeka" className="img-fluid logoMitra" />
          <img src="/assets/infiniteLearningLogo.png" alt="Kemdikbud" className="img-fluid logoMitra" />
          <img src="/assets/kemdikbud.png" alt="Kemdikbud" className="img-fluid logoMitra" />
          <img src="/assets/msib.png" alt="MSIB" className="img-fluid logoMitra" />
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center py-3">
          <span className="titleRecomendation orangeText mt-5">JENIS CERITA</span>
          <span className="titlejenisCerita mt-2">Nikmati Berbagai Jenis Cerita Nusantara</span>
        </div>
        {/* Card Side */}
        <div className="container d-flex flex-wrap justify-content-between pb-5 pt-3 ">
          {/* Card 1 */}
          <div className="col-8 px-3 pt-3">
            <div
              className="cardBeranda d-flex flex-column justify-content-between p-4"
              onClick={() => {
                const jenis = 'Fabel';
                clickCardJenisCerita(jenis);
              }}
            >
              <div>
                <span className="jenisCerita"> JENIS CERITA</span>
              </div>
              <div className="d-flex flex-column">
                <span className="titleCardJenisCerita">Fabel</span>
                <span className="descCardJenisCerita mt-2">Cerita yang mengisahkan hewan sebagai tokoh diceritanya</span>
                <div className="d-flex flex-wrap align-items-center jelajahi mt-2">
                  <span>Jelajahi</span>
                  <FaArrowRightLong className="arrowIcon ms-2" />
                </div>
                <img src="/assets/card1.png" alt="Card Image" className="img-fluid imgAbsolute1" />
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="col-4 px-3 pt-3 ">
            <div
              className="cardBeranda d-flex flex-column justify-content-between p-4"
              onClick={() => {
                const jenis = 'Mitos';
                clickCardJenisCerita(jenis);
              }}
            >
              <div className="d-flex flex-column">
                <span className="jenisCerita"> JENIS CERITA</span>
                <span className="titleCardJenisCerita">Mitos</span>
                <span className="descCardJenisCerita2 mt-2">Cerita yang mengisahkan asal-usul alam semesta, dewa-dewi dengan unsur magis atau ilahi</span>
              </div>
              <div className="d-flex flex-column">
                <div className="d-flex flex-wrap align-items-center jelajahi mt-2">
                  <span>Jelajahi</span>
                  <FaArrowRightLong className="arrowIcon ms-2" />
                </div>
                <img src="/assets/card2.png" alt="Card Image" className="img-fluid imgAbsolute2" />
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="col-4 px-3 pt-3 ">
            <div
              className="cardBeranda d-flex flex-column justify-content-between p-4"
              onClick={() => {
                const jenis = 'Saga';
                clickCardJenisCerita(jenis);
              }}
            >
              <div className="d-flex flex-column">
                <span className="jenisCerita"> JENIS CERITA</span>
                <span className="titleCardJenisCerita">Saga</span>
                <span className="descCardJenisCerita2 mt-2">
                  Cerita epik yang mengisahkan kisah heroik, petualangan, dan konflik yang melibatkan banyak karakter.
                </span>
              </div>
              <div className="d-flex flex-column">
                <div className="d-flex flex-wrap align-items-center jelajahi mt-2">
                  <span>Jelajahi</span>
                  <FaArrowRightLong className="arrowIcon ms-2" />
                </div>
                <img src="/assets/card3.png" alt="Card Image" className="img-fluid imgAbsolute3" />
              </div>
            </div>
          </div>
          {/* card 4 */}
          <div className="col-8 px-3 pt-3">
            <div
              className="cardBeranda d-flex flex-column justify-content-between p-4"
              onClick={() => {
                const jenis = 'Cerita Rakyat';
                clickCardJenisCerita(jenis);
              }}
            >
              <div>
                <span className="jenisCerita"> JENIS CERITA</span>
              </div>
              <div className="d-flex flex-column">
                <span className="titleCardJenisCerita">Cerita Rakyat</span>
                <span className="descCardJenisCerita mt-2">
                  Cerita yang disampaikan secara turun-temurun dalam suatu masyarakat, seperti kisah petualangan, percintaan, atau keajaiban
                </span>
                <div className="d-flex flex-wrap align-items-center jelajahi mt-2">
                  <span>Jelajahi</span>
                  <FaArrowRightLong className="arrowIcon ms-2" />
                </div>
                <img src="/assets/card4.png" alt="Card Image" className="img-fluid imgAbsolute4" />
              </div>
            </div>
          </div>
          {/* card 5 */}
          <div className="col-8 px-3 pt-3">
            <div
              className="cardBeranda d-flex flex-column justify-content-between p-4"
              onClick={() => {
                const jenis = 'Legenda';
                clickCardJenisCerita(jenis);
              }}
            >
              <div>
                <span className="jenisCerita"> JENIS CERITA</span>
              </div>
              <div className="d-flex flex-column">
                <span className="titleCardJenisCerita">Legenda</span>
                <span className="descCardJenisCerita mt-2">
                  Cerita yang berasal dari sejarah atau kepercayaan masyarakat tertentu, berkaitan dengan tokoh-tokoh heroik atau peristiwa penting
                </span>
                <div className="d-flex flex-wrap align-items-center jelajahi mt-2">
                  <span>Jelajahi</span>
                  <FaArrowRightLong className="arrowIcon ms-2" />
                </div>
                <img src="/assets/card5.png" alt="Card Image" className="img-fluid imgAbsolute5" />
              </div>
            </div>
          </div>
          {/* card 6 */}
          <div className="col-4 px-3 pt-3 ">
            <div
              className="cardBeranda d-flex flex-column justify-content-between p-4"
              onClick={() => {
                const jenis = 'Roman';
                clickCardJenisCerita(jenis);
              }}
            >
              <div className="d-flex flex-column">
                <span className="jenisCerita"> JENIS CERITA</span>
                <span className="titleCardJenisCerita">Roman</span>
                <span className="descCardJenisCerita2 mt-2">
                  Kisah kehidupan dan percintaan karakter-karakternya, sering kali dengan plot yang kompleks dan beragam
                </span>
              </div>
              <div className="d-flex flex-column">
                <div className="d-flex flex-wrap align-items-center jelajahi mt-2">
                  <span>Jelajahi</span>
                  <FaArrowRightLong className="arrowIcon ms-2" />
                </div>
                <img src="/assets/card6.png" alt="Card Image" className="img-fluid imgAbsolute2" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="recomendationSection d-flex flex-column justify-content-center align-items-center ">
        <div className="d-flex flex-column justify-content-center align-items-center py-3">
          <span className="titleRecomendation mt-5 text-light">CERITA FAVORITE</span>
          <span className="subTitleRecomendation mt-2">Kisah Favorit Di Indonesia</span>
        </div>
        <div className="container d-flex flex-wrap justify-content-center">
          {/* Card recomendation */}
          {recomendation.map((data, i) => (
            <Berandacard data={data} index={i} key={i} userId={userId} token={token} />
          ))}
        </div>
        <a href="/daftarcerita" className="jelajahiCeritaLainnya text-center px-4 py-3 rounded-5 mb-5 ">
          Jelajahi Cerita Lainnya
        </a>
      </div>
      <div className="bannerSection">
        <div className="subscribeSide container d-flex flex-wrap justify-content-center align-items-center">
          <div className="col-6">
            <img src="assets/aboutus.png" alt="subscribeImage" className="img-fluid " />
          </div>
          <div className="col-6 d-flex flex-column">
            <span className="tentangKami">IKUTI KAMI</span>
            <span className="aboutUsTitle mb-4">Dapatkan Informasi Terkini Ikuti Sosial Media Kami</span>
            <a className="d-flex my-3 flex-wrap align-items-center sosialMediaKisahloka" href="/" target="_blank" rel="noopener noreferrer">
              <FaYoutube size={40} color="1a3a5c" className="me-5" /> <span className="iconText">Kisahlokaid</span>
            </a>
            <a className="d-flex my-3 flex-wrap align-items-center sosialMediaKisahloka" href="/" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={40} color="1a3a5c" className="me-5" /> <span className="iconText">Kisahlokaid</span>
            </a>
            <a className="d-flex my-3 flex-wrap align-items-center sosialMediaKisahloka" href="/" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={40} color="1a3a5c" className="me-5" /> <span className="iconText">Kisahlokaid</span>
            </a>
            <a className="d-flex my-3 flex-wrap align-items-center sosialMediaKisahloka" href="/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={40} color="1a3a5c" className="me-5" /> <span className="iconText">Kisahlokaid</span>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Beranda;
