import React, { useState } from 'react';
import { TbBookmarkPlus } from 'react-icons/tb';
import { MdBookmarkRemove } from 'react-icons/md';
import { useSelector } from 'react-redux';
import './Card.css';
import { useNavigate } from 'react-router-dom';

function Card({ data, index, setLoading, userId, token, setFavoriteCerita, setRecomendationCerita }) {
  const navigate = useNavigate();

  // Check ada favortie atau engga , kalau ada true kalau ga ada false
  const [isFavorite, setIsFavorite] = useState(data.favorite.some((fav) => fav.favorite === userId));

  const addFavorite = async (ceritaId) => {
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
      const data = await fetchData.json();
      if (setFavoriteCerita) {
        setFavoriteCerita((prevFavorites) => [data, ...prevFavorites]);
      }
      // Perbarui state rekomendasi cerita dengan menghapus item yang baru ditambahkan ke favorit
      if (setRecomendationCerita) {
        setRecomendationCerita((prevRecomendation) => prevRecomendation.filter((item) => item.ceritaId !== ceritaId));
      } else {
        setIsFavorite(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFavorite = async (ceritaId) => {
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
        // Hapus item favorit dari state favoritCerita
        if (setFavoriteCerita) {
          setFavoriteCerita((prevFavorites) => prevFavorites.filter((favorite) => favorite.ceritaId !== ceritaId));
        }

        setIsFavorite(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div key={index} className="cardCerita col-3  p-2">
        <div className="borderRecomendation">
          <img src={data.imageCerita} alt="cardImage" className="img-fluid imageCardCerita " onLoad={() => setLoading(true)} />
        </div>
        <div className="p-2">
          <div className="d-flex flex-wrap justify-content-between">
            <span className="daerahCerita">{data.asalDaerah}</span>
            <span>
              {token &&
                (!isFavorite ? (
                  <TbBookmarkPlus className="iconBookmark" onClick={() => addFavorite(data.ceritaId)} />
                ) : (
                  <MdBookmarkRemove className="iconBookmark" onClick={() => deleteFavorite(data.ceritaId)} />
                ))}
              {!token && <TbBookmarkPlus className="iconBookmark" onClick={() => navigate('/login')} />}
            </span>
          </div>
          <div className="kotakTitleCeritaCard">
            <a href={`/detailcerita/${data.ceritaId}`} className="titleCerita">
              {data.titleCerita}
            </a>
            <div className="d-flex flex-wrap">
              {data.genre.map((data, i) => (
                <span className="daerahCerita me-2" key={i}>
                  {data.genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
