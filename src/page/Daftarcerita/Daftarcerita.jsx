import { useEffect, useRef, useState } from 'react';
import './Daftarcerita.css';
import Navbar from '../../component/Navbar/Navbar';
import { FiSearch } from 'react-icons/fi';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { IoCloseCircle } from 'react-icons/io5';
import Footer from '../../component/Footer/Footer';
import Pagination from '../../component/Pagination/Pagination';
import Card from '../../component/Card/Card';
import dropdown from '../../state/dropdownlist.json';
import { setJenisCeritaRedux, setSearchRedux } from '../../state/redux';
import { useDispatch, useSelector } from 'react-redux';

function Daftarcerita() {
  const token = useSelector((state) => state?.token);
  const userId = useSelector((state) => state?.user?._id);
  const jenis = useSelector((state) => state.jeniscerita);
  const searchNav = useSelector((state) => state.search);
  const navbarBackground = useRef(null);
  const dispatch = useDispatch();
  const [atBodyDaftarCerita, setAtBodyDaftarCerita] = useState(false);
  // Cerita from Api
  const [allCerita, setAllCerita] = useState([]);
  const [daftarCerita, setDaftarCerita] = useState([]);
  const [loading, setLoading] = useState(false);
  // Filter state like search dll
  const [search, setSearch] = useState(searchNav);

  // Drop Down Active
  const [dropDownActiveJenis, setDropDownActiveJenis] = useState(false);
  const [dropDownActiveGenre, setDropDownActiveGenre] = useState(false);
  const [dropDownActiveDaerah, setDropDownActiveDaerah] = useState(false);
  const [dropDownActiveUrutkan, setDropDownActiveUrutkan] = useState(false);
  // Const value dropDown
  const [jenisCerita, setJenisCerita] = useState(jenis);
  const [genreCerita, setGenreCerita] = useState('');
  const [asalCerita, setAsalCerita] = useState('');
  const [urutkanBerdsarkan, setUrutkanBerdasarkan] = useState('');

  // Fatch Api from Database
  const getCeritaFavoriteFilter = async () => {
    let url = `${import.meta.env.VITE_GETALL_CERITA_FILTER}?`;
    try {
      if (search) {
        url += `search=${search}&`;
      }
      if (jenisCerita) {
        url += `jenisCerita=${jenisCerita}&`;
      }
      if (genreCerita) {
        url += `genre=${genreCerita}&`;
      }
      if (asalCerita) {
        url += `asalDaerah=${asalCerita}&`;
      }

      // Hapus tanda & yang terakhir jika tidak ada parameter yang ditambahkan
      if (url.endsWith('&')) {
        url = url.slice(0, -1);
      }
      const fetchData = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'guestKisahloka',
        },
      });
      const data = await fetchData.json();
      setAllCerita(data.Data);
      dispatch(
        setJenisCeritaRedux({
          jeniscerita: '',
        })
      );

      dispatch(
        setSearchRedux({
          search: '',
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Onkeydown Browse Enter
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      getCeritaFavoriteFilter();
      const target = document.getElementById('targetSearch');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    function handleScroll() {
      if (navbarBackground.current) {
        const { top } = navbarBackground.current.getBoundingClientRect();
        setAtBodyDaftarCerita(top <= 0);
      }
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    getCeritaFavoriteFilter();
  }, [jenisCerita, genreCerita, asalCerita]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    if (urutkanBerdsarkan === 'Terbaru') {
      const sortedData = allCerita.slice().sort((a, b) => {
        return Date.parse(a.created_at) - Date.parse(b.created_at);
      });
      setAllCerita(sortedData.reverse());
    } else if (urutkanBerdsarkan === 'Terpopuler') {
      const dataTerpopuler = allCerita.slice().sort((a, b) => {
        // Pastikan properti favorite ada dan merupakan array
        const favoritesA = a.favorite || [];
        const favoritesB = b.favorite || [];

        // Kembalikan perbandingan berdasarkan panjang array favorite
        return favoritesB.length - favoritesA.length;
      });
      setAllCerita(dataTerpopuler);
    }
  }, [urutkanBerdsarkan]);

  return (
    <>
      <Navbar atBodyDaftarCerita={atBodyDaftarCerita} />
      <div className="relativeDaftarCerita">
        <div className="stickDaftarCerita">
          <div
            className="bgHeroSectionDaftarCerita d-flex flex-column justify-content-center align-items-center"
            style={{ backgroundImage: "url('assets/daftarCerita.png')" }}
          >
            <span className="titleDaftarCerita">Temukan Cerita Nusantara</span>
            <span className="subTitleDaftarCerita ">
              Kisahloka telah mengumpulkan lebih dari ratusan cerita dari seluruh nusantara. Temukan uniknya keragaman kisah nusantara disini.
            </span>
            {/* Search Bar */}
            <div className="d-flex flex-wrap align-items-center searchBar col-6 rounded-5 ">
              <FiSearch className="col-1" size={20} />
              <input
                type="text"
                placeholder="Cari Judul Cerita"
                className="inputSearchBar col-11 py-1"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
            </div>
            {/* Drop Down Side */}
            <div className="col-6 d-flex flex-wrap justify-content-between mt-3 mb-5">
              {/* Jenis Cerita */}
              <div className="col-3 dropDown">
                <div
                  className={`mx-1 ${
                    jenisCerita == '' ? 'dropDownSide' : 'activeSelectedDropdown'
                  }  d-flex flex-wrap align-items-center justify-content-between rounded-5`}
                  onClick={() => {
                    setDropDownActiveJenis(!dropDownActiveJenis);
                    setDropDownActiveGenre(false);
                    setDropDownActiveDaerah(false);
                    setDropDownActiveUrutkan(false);
                  }}
                >
                  {jenisCerita == '' && <span>Pilih Jenis Cerita</span>}
                  {!jenisCerita == '' && <span>{jenisCerita}</span>}
                  {!dropDownActiveJenis && jenisCerita ? (
                    <IoCloseCircle size={17} onClick={() => setJenisCerita('')} />
                  ) : dropDownActiveJenis ? (
                    <FaAngleUp />
                  ) : (
                    <FaAngleDown />
                  )}
                </div>
                {dropDownActiveJenis && (
                  <div className="dropDownList col-12 p-2 rounded-2 mt-2">
                    {dropdown?.jenisCerita?.map((data, i) => (
                      <div
                        className="dropDownLabel mt-1 p-2 rounded-2"
                        key={i}
                        onClick={() => {
                          setJenisCerita(data.label);
                          setDropDownActiveJenis(!dropDownActiveJenis);
                        }}
                      >
                        {data.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Genre Cerita */}
              <div className="col-3 dropDown">
                <div
                  className={`mx-1 ${
                    genreCerita == '' ? 'dropDownSide' : 'activeSelectedDropdown'
                  }  d-flex flex-wrap align-items-center justify-content-between rounded-5`}
                  onClick={() => {
                    setDropDownActiveGenre(!dropDownActiveGenre);
                    setDropDownActiveJenis(false);
                    setDropDownActiveDaerah(false);
                    setDropDownActiveUrutkan(false);
                  }}
                >
                  {genreCerita == '' && <span>Pilih Genre Cerita</span>}
                  {!genreCerita == '' && <span>{genreCerita}</span>}
                  {!dropDownActiveJenis && genreCerita ? (
                    <IoCloseCircle size={17} onClick={() => setGenreCerita('')} />
                  ) : dropDownActiveGenre ? (
                    <FaAngleUp />
                  ) : (
                    <FaAngleDown />
                  )}
                </div>
                {dropDownActiveGenre && (
                  <div className="dropDownList col-12 p-2 rounded-2 mt-2">
                    {dropdown?.genreCerita?.map((data, i) => (
                      <div
                        className="dropDownLabel mt-1 p-2 rounded-2"
                        key={i}
                        onClick={() => {
                          setGenreCerita(data.label);
                          setDropDownActiveGenre(!dropDownActiveGenre);
                        }}
                      >
                        {data.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Asal Daerah */}
              <div className="col-3 dropDown">
                <div
                  className={`mx-1 ${
                    asalCerita == '' ? 'dropDownSide' : 'activeSelectedDropdown'
                  }  d-flex flex-wrap align-items-center justify-content-between rounded-5`}
                  onClick={() => {
                    setDropDownActiveDaerah(!dropDownActiveDaerah);
                    setDropDownActiveGenre(false);
                    setDropDownActiveJenis(false);
                    setDropDownActiveUrutkan(false);
                  }}
                >
                  {asalCerita == '' && <span>Pilih Asal Daerah</span>}
                  {!asalCerita == '' && <span>{asalCerita}</span>}
                  {!dropDownActiveJenis && asalCerita ? (
                    <IoCloseCircle size={17} onClick={() => setAsalCerita('')} />
                  ) : dropDownActiveDaerah ? (
                    <FaAngleUp />
                  ) : (
                    <FaAngleDown />
                  )}
                </div>
                {dropDownActiveDaerah && (
                  <div className="dropDownList col-12 p-2 rounded-2 mt-2">
                    {dropdown?.daerahCerita?.map((data, i) => (
                      <div
                        className="dropDownLabel mt-1 p-2 rounded-2"
                        key={i}
                        onClick={() => {
                          setAsalCerita(data.label);
                          setDropDownActiveDaerah(!dropDownActiveDaerah);
                        }}
                      >
                        {data.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Urutkan Berdasarkan */}
              <div className="col-3 dropDown">
                <div
                  className={`mx-1 ${
                    urutkanBerdsarkan == '' ? 'dropDownSide' : 'activeSelectedDropdown'
                  }  d-flex flex-wrap align-items-center justify-content-between rounded-5`}
                  onClick={() => {
                    setDropDownActiveUrutkan(!dropDownActiveUrutkan);
                    setDropDownActiveGenre(false);
                    setDropDownActiveJenis(false);
                    setDropDownActiveDaerah(false);
                  }}
                >
                  {urutkanBerdsarkan == '' && <span>Urut Berdasarkan</span>}
                  {!urutkanBerdsarkan == '' && <span>{urutkanBerdsarkan}</span>}
                  {!dropDownActiveUrutkan && urutkanBerdsarkan ? (
                    <IoCloseCircle size={17} onClick={() => setUrutkanBerdasarkan('')} />
                  ) : dropDownActiveUrutkan ? (
                    <FaAngleUp />
                  ) : (
                    <FaAngleDown />
                  )}
                </div>
                {dropDownActiveUrutkan && (
                  <div className="dropDownList col-12 p-2 rounded-2 mt-2">
                    {dropdown?.urutBerdasarkan?.map((data, i) => (
                      <div
                        className="dropDownLabel mt-1 p-2 rounded-2"
                        key={i}
                        onClick={() => {
                          setUrutkanBerdasarkan(data.label);
                          setDropDownActiveUrutkan(!dropDownActiveUrutkan);
                        }}
                      >
                        {data.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Card Side  */}
      <div className="col-12 bodySectionDaftarCerita d-flex flex-wrap justify-content-center" ref={navbarBackground}>
        <div className="container d-flex flex-wrap justify-content-center align-items-center kotakCardCerita" id="targetSearch">
          {/* Card Side Condition if find cerita will display length >0 if not will display length == 0 */}
          {daftarCerita.length > 0 &&
            daftarCerita.map((data, i) => <Card data={data} index={i} key={i} setLoading={setLoading} userId={userId} token={token} />)}
          {daftarCerita.length == 0 && (
            <div>
              <img src="/assets/mascot.png" alt="Mascot" className="img-fluid imgMascot" />
              <span className="noFoundText">Sorry, the story could not be found </span>
            </div>
          )}
        </div>
        <div className="col-5 text-center my-5">
          <Pagination items={allCerita} setDaftarCerita={setDaftarCerita} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Daftarcerita;
