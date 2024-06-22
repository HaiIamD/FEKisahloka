import React, { useState } from 'react';
import './Loginpage.css';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdEyeOff } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../state/redux.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Loginpage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [seePass, setSeePass] = useState(false);
  const [ingatSaya, setIngatSaya] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    try {
      const fetchData = await fetch(`${import.meta.env.VITE_LOGIN_API}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'guestKisahloka',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await fetchData.json();
      if (fetchData.ok) {
        dispatch(
          setLogin({
            user: data.user,
            token: data.token,
          })
        );
        navigate('/bookmark');
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="loginPage d-flex flex-wrap">
        <div className="col-7 d-flex flex-wrap  leftLoginPage py-3">
          <div className="col-12 px-5  align-items-center">
            <Link to={'/'} className=" d-flex align-items-center text-decoration-none text-light">
              <FaArrowLeft className="me-2" /> Kembali
            </Link>
          </div>
          <div className="col-12 d-flex  justify-content-center">
            <img src="assets/login.png" alt="imageLogin" className="img-fluid imageLogin" />
          </div>
        </div>
        <div className="col-5 rightLoginPage d-flex justify-content-center align-items-center">
          <div className="col-9 d-flex flex-column justify-content-center align-items-center ">
            <h3 className="titleLogin">Kisahloka</h3>
            <span className="subTitleLogin">Masukin Akun Dulu</span>
            <span className="subTitleLogin">agar bisa menikmati seluruh fitur Kisahloka</span>
            <form className="col-12" onSubmit={login}>
              <div className="col-12 d-flex flex-column my-2 mt-5 kotakInput">
                <label htmlFor="email" className="labelInput">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="inputan"
                  placeholder="Masukkan email kamu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 d-flex flex-column my-2 mt-4 kotakInput">
                <label htmlFor="password" className="labelInput">
                  Password
                </label>
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                  <input
                    type={seePass ? 'text' : 'password'}
                    id="password"
                    className="inputan col-11"
                    placeholder="Masukkan Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <IoMdEyeOff size={20} style={{ cursor: 'pointer' }} onClick={() => setSeePass(!seePass)} />
                </div>
              </div>
              <div className="col-12 d-flex flex-wrap my-2 mt-3">
                <input type="checkbox" className="checkBox me-3" onChange={() => setIngatSaya(!ingatSaya)} /> Ingat Saya
              </div>
              <button
                className={`col-12 ${ingatSaya && password !== '' && email !== '' ? 'buttonLogin' : 'buttonAbstractLogin'} py-3`}
                type="submit"
                disabled={!ingatSaya}
              >
                Masuk
              </button>
            </form>
            <span className="mt-3">
              Belum mempunyai akun ?
              <Link to={'/register'} className="DaftarLink ms-2">
                Daftar
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loginpage;
