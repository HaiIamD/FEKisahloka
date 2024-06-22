import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { IoSearch } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CiLogout } from 'react-icons/ci';
import { setLogout, setSearchRedux } from '../../state/redux';

function Navbar({ atBody, atBodyDaftarCerita }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropDownProfile, setDropDownProfile] = useState(false);
  const [inBeranda, setInBeranda] = useState(false);
  const [searchNav, setSearchNav] = useState('');
  const token = useSelector((state) => state?.token);
  const username = useSelector((state) => state?.user?.userName);
  const location = useLocation();

  const isBeranda = location.pathname === '/';
  const isDaftarCerita = location.pathname === '/daftarcerita';

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      dispatch(
        setSearchRedux({
          search: searchNav,
        })
      );
      navigate('/daftarcerita');
    }
  };

  useEffect(() => {
    setInBeranda(isBeranda);
  }, [isBeranda]);
  return (
    <>
      {inBeranda || isDaftarCerita ? (
        <div
          className={`col-12  ${atBody || atBodyDaftarCerita ? 'NavbarWithBgBeranda' : 'NavbarBeranda'}
          } px-5 py-3 d-flex flex-wrap justify-content-between `}
        >
          <div className="col-6 d-flex align-items-center ">
            <span className={`${atBody || atBodyDaftarCerita ? 'titleNavbarBerandaBody' : 'titleNavbarBeranda'}  me-5`}>Kisahloka</span>
            <Link to={'/'} className={`${atBody || atBodyDaftarCerita ? 'isiNavbarBody' : 'isiNavbarBeranda'} mx-4`}>
              Beranda
            </Link>
            <Link to={'/daftarcerita'} className={`${atBody || atBodyDaftarCerita ? 'isiNavbarBody' : 'isiNavbarBeranda'} mx-4`}>
              Daftar Cerita
            </Link>
            <Link to={'/bookmark'} className={`${atBody || atBodyDaftarCerita ? 'isiNavbarBody' : 'isiNavbarBeranda'} mx-4`}>
              Bookmark
            </Link>
            <Link to={'/tentangkami'} className={`${atBody || atBodyDaftarCerita ? 'isiNavbarBody' : 'isiNavbarBeranda'} mx-4`}>
              Tentang Kami
            </Link>
          </div>
          <div className="col d-flex align-items-center justify-content-end">
            {isDaftarCerita ? (
              ''
            ) : (
              <div className="inputanSerchNavbar d-flex flex-wrap align-items-center mx-2">
                <IoSearch className="col" />
                <input
                  type="text"
                  className="inputan inputanSearch col-10"
                  placeholder="Cari Cerita ..."
                  value={searchNav}
                  onChange={(e) => setSearchNav(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
              </div>
            )}

            {token && (
              <div className="dropdownProfile">
                <img src="/assets/Avatars.png" alt="Avatar Image" className="img-fluid ms-3 avatar" onClick={() => setDropDownProfile(!dropDownProfile)} />
                {dropDownProfile && (
                  <div className="profileSection p-3 d-flex flex-column justify-content-between ">
                    <div className="z-3">
                      <p className="titleProfile">Hello , {username} </p>
                      <p>Yuk jelajahi cerita nusantara bareng aku </p>
                      <Link to={'/daftarcerita'} className="textLinkProfile">
                        Jelajahi Cerita Lainnya
                      </Link>
                    </div>
                    <hr className="col-8" />
                    <div>
                      <div
                        className="d-flex flex-wrap align-items-center justify-content-center buttonLogout col-4 py-1 rounded-3"
                        onClick={() => dispatch(setLogout())}
                      >
                        <CiLogout size={22} className="me-1" /> Keluar
                      </div>
                    </div>
                    <img src="../assets/mascot.png" alt="mascot" className="imgMascotLogo img-fluid" />
                  </div>
                )}
              </div>
            )}

            {!token && (
              <>
                <Link to={'/login'} className={`${atBody || atBodyDaftarCerita ? 'masukBodyText' : 'masukText'}  mx-2`}>
                  Masuk
                </Link>
                <Link to={'/register'} className={`${atBody || atBodyDaftarCerita ? 'buttonBodyDaftar' : 'buttonDaftar'}  mx-2`}>
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`col-12  NavbarWithBgBeranda
        } px-5 py-3 d-flex flex-wrap justify-content-between `}
        >
          <div className="col-6 d-flex align-items-center ">
            <span className={`titleNavbarBerandaBody  me-5`}>Kisahloka</span>
            <Link to={'/'} className={`isiNavbarBody mx-4`}>
              Beranda
            </Link>
            <Link to={'/daftarcerita'} className={`isiNavbarBody mx-4`}>
              Daftar Cerita
            </Link>
            <Link to={'/bookmark'} className={`isiNavbarBody mx-4`}>
              Bookmark
            </Link>
            <Link to={'/tentangkami'} className={`isiNavbarBody mx-4`}>
              Tentang Kami
            </Link>
          </div>
          <div className="col d-flex align-items-center justify-content-end">
            <div className="inputanSerchNavbar d-flex flex-wrap align-items-center mx-2">
              <IoSearch className="col" />
              <input
                type="text"
                className="inputan inputanSearch col-10"
                placeholder="Cari Cerita ..."
                value={searchNav}
                onChange={(e) => setSearchNav(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
            </div>

            {token && (
              <div className="dropdownProfile">
                <img src="/assets/Avatars.png" alt="Avatar Image" className="img-fluid ms-3 avatar" onClick={() => setDropDownProfile(!dropDownProfile)} />
                {dropDownProfile && (
                  <div className=" profileSection p-3 d-flex flex-column justify-content-between">
                    <div className="z-3">
                      <p className="titleProfile">Hello , {username} </p>
                      <p>Yuk jelajahi cerita nusantara bareng aku </p>
                      <Link to={'/daftarcerita'} className="textLinkProfile">
                        Jelajahi Cerita Lainnya
                      </Link>
                    </div>
                    <hr className="col-8" />
                    <div>
                      <div
                        className="d-flex flex-wrap align-items-center justify-content-center buttonLogout col-4 py-1 rounded-3"
                        onClick={() => dispatch(setLogout())}
                      >
                        <CiLogout size={22} className="me-1" /> Keluar
                      </div>
                    </div>
                    <img src="../assets/mascot.png" alt="mascot" className="imgMascotLogo img-fluid" />
                  </div>
                )}
              </div>
            )}

            {!token && (
              <>
                <Link to={'/login'} className={`masukBodyText  mx-2`}>
                  Masuk
                </Link>
                <Link to={'/register'} className={`buttonBodyDaftar mx-2`}>
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
