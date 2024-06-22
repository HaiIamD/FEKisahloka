import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loginpage from './page/Loginpage/Loginpage';
import Registerpage from './page/Registerpage/Registerpage';
import Beranda from './page/Beranda/Beranda';
import Tentangkami from './page/Tentangkami/Tentangkami';
import Detailcerita from './page/Detailcerita/Detailcerita';
import Reading from './page/Reading/Reading';
import Bookmark from './page/Bookmark/Bookmark';
import Daftarcerita from './page/Daftarcerita/Daftarcerita';
import { useEffect, useState } from 'react';
import Phonetabletview from './component/phoneTabletView/Phonetabletview';

function App() {
  const mode = useSelector((state) => state.mode);
  const token = useSelector((state) => state.token);
  const [isPC, setIsPC] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsPC(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="app" data-theme={mode}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isPC ? <Beranda /> : <Phonetabletview />} />
          <Route path="/login" element={isPC ? <Loginpage /> : <Phonetabletview />} />
          <Route path="/register" element={isPC ? <Registerpage /> : <Phonetabletview />} />
          <Route path="/bookmark" element={isPC ? <Bookmark /> : <Phonetabletview />} />
          <Route path="/daftarcerita" element={isPC ? <Daftarcerita /> : <Phonetabletview />} />
          <Route path="/tentangkami" element={isPC ? <Tentangkami /> : <Phonetabletview />} />
          <Route path="/detailcerita/:ceritaId" element={isPC ? <Detailcerita /> : <Phonetabletview />} />
          <Route path="/reading/:ceritaId" element={isPC ? <Reading /> : <Phonetabletview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
