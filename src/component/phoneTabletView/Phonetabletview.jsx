import React from 'react';
import './Phonetabletview.css';

function Phonetabletview() {
  return (
    <>
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center ">
        <img src="../assets/mascot.png" alt="mascot image" className="img-fluid imgPhoneTablet" />
        <p className="teksPhoneTablet mt-3">Sorry Kisahloka is only available in Desktop Mode </p>
      </div>
    </>
  );
}

export default Phonetabletview;
