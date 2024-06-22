import React, { useEffect, useState } from 'react';
import './Registerpage.css';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdEyeOff } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Registerpage() {
  const navigate = useNavigate();

  const [seePass, setSeePass] = useState(false);
  const [seePassConfirmation, setSeePassConfirmation] = useState(false);
  const [checkPass, setCheckPass] = useState(false);

  // Inputan
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passConf, setpassConf] = useState('');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    try {
      const fetchData = await fetch(`${import.meta.env.VITE_REGISTER_API}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'guestKisahloka',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await fetchData.json();
      if (fetchData.ok) {
        toast(data);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(checkPass);
  useEffect(() => {
    if (password === passConf) {
      setCheckPass(false);
    } else {
      setCheckPass(true);
    }
  }, [passConf]);

  return (
    <>
      <ToastContainer />

      <div className="registerPage d-flex flex-wrap">
        <div className="col-7 d-flex flex-wrap  leftLoginPage py-3">
          <div className="col-12 px-5  align-items-center">
            <Link to={'/'} className=" d-flex align-items-center text-decoration-none text-light">
              <FaArrowLeft className="me-2" /> Kembali
            </Link>
          </div>
          <div className="col-12 d-flex  justify-content-center">
            <img src="assets/register.png" alt="imageLogin" className="img-fluid imageLogin" />
          </div>
        </div>
        <div className="col-5 rightLoginPage d-flex justify-content-center align-items-center">
          <form onSubmit={register} className="col-9 d-flex flex-column justify-content-center align-items-center ">
            <h3 className="titleLogin">Kisahloka</h3>
            <span className="subTitleLogin">Masukin Akun Dulu</span>
            <span className="subTitleLogin">agar bisa menikmati seluruh fitur Kisahloka</span>
            <div className="col-12 d-flex flex-column my-2 mt-5 kotakInput">
              <label htmlFor="username" className="labelInput">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="inputan"
                placeholder="Masukkan Username "
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="col-12 d-flex flex-column my-2 mt-4 kotakInput">
              <label htmlFor="email" className="labelInput">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="inputan"
                placeholder="Masukkan email "
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <IoMdEyeOff size={20} style={{ cursor: 'pointer' }} onClick={() => setSeePass(!seePass)} />
              </div>
            </div>

            <div className={`col-12 d-flex flex-column my-2 mt-4  ${checkPass ? ' kotakPasswrong' : 'kotakInput'}`}>
              <label htmlFor="confPassword" className="labelInput">
                Confirm Password
              </label>
              <div className="d-flex flex-wrap justify-content-between align-items-center">
                <input
                  type={seePassConfirmation ? 'text' : 'password'}
                  id="confPassword"
                  className="inputan col-11"
                  placeholder="Konfirmasi Password"
                  required
                  value={passConf}
                  onChange={(e) => setpassConf(e.target.value)}
                />
                <IoMdEyeOff size={20} style={{ cursor: 'pointer' }} onClick={() => setSeePassConfirmation(!seePassConfirmation)} />
              </div>
            </div>

            <div className="col-12 d-flex flex-wrap my-2 mt-3">
              <input type="checkbox" className="checkBox me-3" onChange={() => setIsCheckboxChecked(!isCheckboxChecked)} /> Saya menyetujui{' '}
              <span className="mx-2 DaftarLink">Syarat</span> dan
              <span className="mx-2 DaftarLink">Kebijakan privasi</span>
            </div>

            <button
              className={`col-12 ${isCheckboxChecked && !checkPass ? 'buttonRegister' : 'buttonAbstractRegister'} py-3`}
              disabled={!isCheckboxChecked || checkPass}
              type="submit"
            >
              Daftar
            </button>
            <span className="mt-3">
              Sudah mempunyai akun ?
              <Link to={'/login'} className="DaftarLink ms-2">
                Masuk
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}

export default Registerpage;
