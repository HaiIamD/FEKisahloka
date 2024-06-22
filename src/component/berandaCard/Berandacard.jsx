import React, { useState } from 'react';
import { TbBookmarkPlus } from 'react-icons/tb';
import { MdBookmarkRemove } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function Berandacard({ data, index, userId, token }) {
  const navigate = useNavigate();

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
      setIsFavorite(true);
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
        setIsFavorite(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="cardCerita col-3 my-4 p-2" key={index}>
        <div className="borderRecomendation">
          <img src={data.imageCerita} alt="cardImage" className="img-fluid imageCardCerita" />
        </div>
        <div className="p-2">
          <div className="d-flex flex-wrap justify-content-between">
            <span className="daerahCerita text-light">{data.asalDaerah}</span>
            {token &&
              (!isFavorite ? (
                <TbBookmarkPlus className="iconBookmark" onClick={() => addFavorite(data.ceritaId)} />
              ) : (
                <MdBookmarkRemove className="iconBookmark" onClick={() => deleteFavorite(data.ceritaId)} />
              ))}
            {!token && <TbBookmarkPlus className="iconBookmark" onClick={() => navigate('/login')} />}
          </div>
          <a href={`/detailcerita/${data.ceritaId}`} className="titleCerita text-light">
            {data.titleCerita}
          </a>
          <div className="d-flex flex-wrap">
            {data.genre.map((data, i) => (
              <span className="daerahCerita me-2 text-light" key={i}>
                {data.genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Berandacard;
