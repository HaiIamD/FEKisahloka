import React, { useEffect, useState } from 'react';
import './Detailcerita.css';
import Navbar from '../../component/Navbar/Navbar';
import { IoBookOutline } from 'react-icons/io5';
import { TbBookmarkPlus } from 'react-icons/tb';
import { MdBookmarkRemove } from 'react-icons/md';
import Footer from '../../component/Footer/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDetailCerita, setFavoriteList } from '../../state/redux.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Gridloader from 'react-spinners/DotLoader';
import Card from '../../component/Card/Card.jsx';

function Detailcerita() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ceritaId } = useParams();
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state?.user?._id);

  const [previewCerita, setreviewCerita] = useState([]);
  const [recomendationStory, setRecomendationStory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState([]);

  const getDetailCerita = async () => {
    try {
      const fetchData = await fetch(`${import.meta.env.VITE_GET_CERITA}/${ceritaId}`, {
        method: 'GET',
        headers: {
          Authorization: 'guestKisahloka',
        },
      });
      const data = await fetchData.json();
      setreviewCerita(data);
      setIsFavorite(data.favorite.some((fav) => fav.favorite === userId));
    } catch (error) {
      console.log(error);
    }
  };

  const getRecomendation = async () => {
    try {
      const fetchData = await fetch(`${import.meta.env.VITE_GETALL_CERITA}?limit=20`, {
        method: 'GET',
        headers: {
          Authorization: 'guestKisahloka',
        },
      });
      const data = await fetchData.json();
      setRecomendationStory(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addFavorite = async () => {
    try {
      const fetchData = await fetch(`${import.meta.env.VITE_ADD_FAVORITE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `kisahloka ${token}`,
        },
        body: JSON.stringify({
          userId: userId,
          ceritaId: ceritaId,
        }),
      });
      if (fetchData.ok) {
        toast('Berhasil Menambahkan ke Bookmark ✨');
        setIsFavorite(true);
      }
    } catch (error) {
      toast.error('Something Wrong , Try Again Latter');
    }
  };

  const deleteFavorite = async () => {
    try {
      const fetchData = await fetch(`${import.meta.env.VITE_DELETE_FAVORITE}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `kisahloka ${token}`,
        },
        body: JSON.stringify({
          userId: userId,
          ceritaId: ceritaId,
        }),
      });
      if (fetchData.ok) {
        setIsFavorite(false);
        toast('Berhasil Menghapus dari Bookmark');
      }
    } catch (error) {
      toast.error('Something Wrong , Try Again Latter');
    }
  };

  const storeDetailCerita = (data) => {
    dispatch(
      setDetailCerita({
        detailCerita: data,
      })
    );
  };
  const storeFavoriteList = (data) => {
    dispatch(
      setFavoriteList({
        favorite: data,
      })
    );
    navigate(`/reading/${ceritaId}`);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    getDetailCerita();
    getRecomendation();
  }, []);
  return (
    <>
      <ToastContainer />

      {!loading && (
        <div className="d-flex flex-column justify-content-center align-items-center absoluteLoading col-12">
          <Gridloader size={50} aria-label="Loading Spinner" data-testid="loader" />
          <span className="subTitleDetailCerita my-2">Loading...</span>
        </div>
      )}

      <>
        <Navbar />
        <div className="container">
          {/* Header Detail Cerita */}
          <div className="d-flex flex-wrap align-items-center headerDetailCerita justify-content-center ">
            <div className="col-6 ">
              <div className="borderImageCerita">
                <img src={previewCerita.imageCerita} alt="imageCerita" className="img-fluid" onLoad={() => setLoading(true)} />
              </div>
            </div>
            <div className="col-6 px-3  d-flex flex-column">
              <span className="titleDetailCerita">{previewCerita.titleCerita}</span>
              <span className="subTitleDetailCerita my-2">Sinopsis :</span>

              <span className="sinopsisDetailCerita">{previewCerita.descCerita}</span>

              <span className="subTitleDetailCerita my-2">Asal Cerita :</span>
              <div>
                <button className="buttonDetailCerita">{previewCerita.asalDaerah}</button>
              </div>
              <span className="subTitleDetailCerita my-2">Genre :</span>
              <div className="d-flex flex-wrap col-12">
                {previewCerita?.genre?.map((data, i) => (
                  <button className="buttonDetailCerita" key={i}>
                    {data.genre}
                  </button>
                ))}
              </div>
              <div className="d-flex flex-wrap col-12 mt-5">
                <button
                  className="buttonMulaiCerita d-flex align-align-items-center me-2"
                  onClick={() => {
                    storeDetailCerita(previewCerita.isiCerita);
                    storeFavoriteList(previewCerita.favorite);
                  }}
                >
                  <IoBookOutline size={19} className="me-2" /> Mulai Baca Cerita
                </button>
                {!token && (
                  <button className="buttonBookmnark mx-2" onClick={() => navigate('/login')}>
                    <TbBookmarkPlus size={19} className="ms-2" /> Tambah ke Bookmark
                  </button>
                )}
                {token &&
                  (!isFavorite ? (
                    <button className="buttonBookmnark mx-2" onClick={() => addFavorite()}>
                      <TbBookmarkPlus size={19} className="ms-2" /> Tambah ke Bookmark
                    </button>
                  ) : (
                    <button className="buttonBookmnarkRemove mx-2" onClick={() => deleteFavorite()}>
                      <MdBookmarkRemove size={19} className="ms-2" /> Hapus dari Bookmark
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* Recomendation */}
          <div className="d-flex flex-column my-2 mb-4">
            <span className="subTitleDetailCerita">Jelajahi Cerita Lainnya</span>
            <div className="d-flex flex-wrap kotakJelajahiCerita">
              {/* card */}
              {recomendationStory
                .filter((data) => !data.favorite.some((fav) => fav.favorite === userId))
                .slice(0, 4)
                .map((data, i) => (
                  <Card data={data} index={i} key={i} setLoading={setLoading} userId={userId} token={token} />
                ))}
            </div>
          </div>

          {/* Footer */}
        </div>

        <Footer />
      </>
    </>
  );
}

export default Detailcerita;
