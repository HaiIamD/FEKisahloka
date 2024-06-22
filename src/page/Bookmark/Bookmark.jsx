import React, { useEffect, useState } from 'react';
import './Bookmark.css';
import Navbar from '../../component/Navbar/Navbar';
import Footer from '../../component/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import Gridloader from 'react-spinners/DotLoader';
import Card from '../../component/Card/Card';
import Favoritecard from '../../component/favoriteCard/Favoritecard';
import { Link } from 'react-router-dom';

function Bookmark() {
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state?.user?._id);
  const [recomendationCerita, setRecomendationCerita] = useState([]);
  const [favoritCerita, setFavoriteCerita] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCerita = async () => {
    try {
      const fetchData = await fetch(`${import.meta.env.VITE_GETALL_CERITA}?limit=20`, {
        method: 'GET',
        headers: {
          Authorization: 'guestKisahloka',
        },
      });
      const data = await fetchData.json();
      setRecomendationCerita(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCeritaFavorite = async () => {
    try {
      const fetchData = await fetch(`${import.meta.env.VITE_GET_FAVORITE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `kisahloka ${token}`,
        },
        body: JSON.stringify({
          userId,
        }),
      });
      const data = await fetchData.json();
      setFavoriteCerita(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    getCerita();
    getCeritaFavorite();
  }, []);
  return (
    <>
      {!loading && (
        <div className="d-flex flex-column justify-content-center align-items-center absoluteLoading col-12">
          <Gridloader size={50} aria-label="Loading Spinner" data-testid="loader" />
          <span className="subTitleDetailCerita my-2">Loading...</span>
        </div>
      )}

      <Navbar />
      <div className="container">
        <div className="bookmarkSide d-flex flex-column justify-content-center align-items-center">
          {token && (
            <>
              {favoritCerita.length === 0 ? (
                <>
                  <img src="/assets/bookmarkUser.png" alt="Login Icon" className="img-fluid imgBookmarkLogin" />
                  <span className="titleBookmarkLogin mt-3">Kamu belum memiliki cerita favorit nih </span>
                  <span className="titleBookmarkLogin">yuk jelajahi cerita baru!</span>
                  <Link to={'/daftarcerita'} className="py-2 px-4 rounded-5 buttonBookmarkLogin mt-4">
                    Jelajahi Cerita Nusantara
                  </Link>
                </>
              ) : (
                <>
                  <span className="col-12 jelajahiCeritaTitle mb-3">Cerita Favorite Kamu</span>
                  {/* Melakukan pengeambilan 8 data terakhir dan di balik agar tampilnya itu data terbaru yang di tambahkan ke favorite */}
                  <div className="col-12 d-flex flex-wrap">
                    {favoritCerita.slice(0, 8).map((data, i) => (
                      <Favoritecard data={data} index={i} key={i} userId={userId} token={token} setFavoriteCerita={setFavoriteCerita} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
          {!token && (
            <>
              <img src="/assets/bookmarkLogin.png" alt="Login Icon" className="img-fluid imgBookmarkLogin" />
              <span className="titleBookmarkLogin">Ayo login dulu</span>
              <span className="titleBookmarkLogin">untuk melihat cerita favorit mu !</span>
              <a href="/login" className="py-2 px-4 rounded-5 buttonBookmarkLogin mt-4">
                Masuk
              </a>
            </>
          )}
        </div>

        {/*  Recomendation side */}
        <div className="py-5">
          <div className="d-flex flex-flex-wrap justify-content-between">
            <span className="col-7 jelajahiCeritaTitle">Jelajahi Cerita Lainnya</span>
            <div className=" col-5 d-flex flex-wrap justify-content-between">
              <span>
                <span className="jelajahiCeritaTitle">Nikamati Jenis Cerita Baru</span> - Legenda
              </span>
              <a href="/daftarcerita" className="jelajahiLink">
                Jelajahi
              </a>
            </div>
          </div>
          <div className="d-flex flex-wrap  mt-4">
            {recomendationCerita
              .filter((data) => !data.favorite.some((fav) => fav.favorite === userId))
              .slice(0, 8)
              .map((data, i) => (
                <Card
                  data={data}
                  index={i}
                  key={i}
                  setLoading={setLoading}
                  userId={userId}
                  token={token}
                  setFavoriteCerita={setFavoriteCerita}
                  setRecomendationCerita={setRecomendationCerita}
                />
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Bookmark;
