import React from 'react';
import { MdBookmarkRemove } from 'react-icons/md';

function Favoritecard({ data, index, userId, token, setFavoriteCerita }) {
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
        setFavoriteCerita((prevFavorites) => prevFavorites.filter((favorite) => favorite.ceritaId !== ceritaId));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div key={index} className="cardCerita col-3  p-2">
        <div className="borderRecomendation">
          <img src={data.imageCerita} alt="cardImage" className="img-fluid imageCardCerita" />
        </div>
        <div className="p-2">
          <div className="d-flex flex-wrap justify-content-between">
            <span className="daerahCerita">{data.asalDaerah}</span>
            <span>
              <MdBookmarkRemove className="iconBookmark" onClick={() => deleteFavorite(data.ceritaId)} />
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

export default Favoritecard;
