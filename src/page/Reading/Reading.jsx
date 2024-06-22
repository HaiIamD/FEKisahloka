import React, { useEffect, useState } from 'react';
import './Reading.css';
import { IoArrowBack } from 'react-icons/io5';
import { LuLanguages } from 'react-icons/lu';
import { TbTextSize } from 'react-icons/tb';
import { FaHeart } from 'react-icons/fa6';
import { MdWbSunny } from 'react-icons/md';
import { FaGlasses } from 'react-icons/fa6';
import { setLanguage, setReadingmode } from '../../state/redux.js';
import { BsBookmarkHeartFill } from 'react-icons/bs';
import { TfiArrowCircleLeft, TfiArrowCircleRight } from 'react-icons/tfi';
import { MdOutlineSwapVert } from 'react-icons/md';
import Footer from '../../component/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

function Reading() {
  const dispatch = useDispatch();
  const { ceritaId } = useParams();
  const listFavorite = useSelector((state) => state?.favorite);
  const isiCerita = useSelector((state) => state.detailCerita);
  const language = useSelector((state) => state.language);
  const readingMode = useSelector((state) => state.readingMode);
  const [slideCerita, setSlideCerita] = useState(0);
  const [textSize, setTextSize] = useState(6);
  console.log(listFavorite);

  const handlePrevSlide = () => {
    setSlideCerita((prev) => Math.max(prev - 1, 0));
  };

  const handleNextSlide = () => {
    setSlideCerita((prev) => Math.min(prev + 1, isiCerita.length - 1));
  };

  const handleLanguageSwitch = () => {
    const newLanguage = language === 'Indonesia' ? 'English' : 'Indonesia';
    dispatch(setLanguage({ language: newLanguage }));
  };

  const handleReadingMode = () => {
    const reading = readingMode === 'yes' ? 'no' : 'yes';
    console.log(reading);
    dispatch(setReadingmode({ readingMode: reading }));
  };
  const handleText = () => {
    setTextSize((prev) => {
      // Mengatur urutan nilai 6, 5, 4, 6
      const newSize = { 6: 5, 5: 4, 4: 6 }[prev] || 6; // Nilai awal jika prev bukan 6, 5, atau 4
      return newSize;
    });
  };

  //  Scrool to top when page reload dan memanggil function fetchAPI
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <>
      {readingMode === 'yes' ? <div className="ReadingMode col-12"></div> : ''}
      {/* Navbar Reading Mode */}
      <div className="navbarReadingMode col-12 d-flex justify-content-between p-4 px-5  ">
        <Link to={`/detailcerita/${ceritaId}`} className="leftNavbar d-flex align-items-center ">
          <IoArrowBack className="me-1" size={20} /> <span>Kembali ke Detai Cerita</span>
        </Link>
        <div className="middleNavbar d-flex flex-wrap align-items-center  ">
          <LuLanguages className="me-2" size={20} />
          <span>{language}</span>
          <MdOutlineSwapVert className="ms-2 cursorCerita" size={20} color="6f7f96" onClick={handleLanguageSwitch} />
        </div>
        <div className="endNavbar d-flex flex-wrap align-items-center">
          <TbTextSize size={22} className="mx-3 sizeText " onClick={() => handleText()} />
          <div className="mx-4 ">
            <input type="checkbox" className="checkbox" id="checkbox" />
            <label htmlFor="checkbox" className="checkbox-label" onClick={() => handleReadingMode()}>
              <MdWbSunny size={18} className="ps-1 iconReading" color="f69a0e" />
              <FaGlasses size={18} className="pe-1 iconReading" />
              <span className="ball"></span>
            </label>
          </div>
          {listFavorite[0].favorite === null && (
            <div className="d-flex flex-wrap align-items-center">
              <BsBookmarkHeartFill size={24} className="ms-3 me-2 bookmark" color="C40C0C" /> <span>0</span>
            </div>
          )}

          {listFavorite[0].favorite !== null && (
            <div className="d-flex flex-wrap align-items-center">
              <BsBookmarkHeartFill size={24} className="ms-3 me-2 bookmark" color="C40C0C" /> <span>{listFavorite.length}</span>
            </div>
          )}
        </div>
      </div>

      {/* Image And Text */}
      <div className="container">
        <div className="d-flex flex-wrap imageAndText  d-flex flex-wrap justify-content-center align-items-center py-4">
          <div className="col-1">
            <TfiArrowCircleLeft size={35} color="6f7f96" className="cursorCerita " onClick={handlePrevSlide} />
          </div>
          <div className="col-10 d-flex flex-column justify-content-center align-items-center">
            <div className="borderIsiCerita">
              <img src={isiCerita[slideCerita].imageisicerita} alt="imageCerita" className="img-fluid" />
            </div>
            {language === 'Indonesia' && <span className={`textCerita mt-4 fs-${textSize}`}>{isiCerita[slideCerita].cerita_Indonesia}</span>}
            {language === 'English' && <span className={`textCerita mt-4 fs-${textSize}`}>{isiCerita[slideCerita].cerita_English}</span>}
          </div>

          <div className="col-1">
            <TfiArrowCircleRight size={35} color="6f7f96" className="cursorCerita " onClick={handleNextSlide} />
          </div>
          <div className="d-flex justify-content-center ">
            <span className="pageCerita pt-4">
              {slideCerita + 1} / {isiCerita.length}
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar  */}

      <Footer />
    </>
  );
}

export default Reading;
