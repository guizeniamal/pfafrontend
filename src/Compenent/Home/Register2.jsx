import React from 'react';
import { FaUserNurse } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { Link, createSearchParams, useNavigate } from 'react-router-dom';
import Menu from './Menu';

function Register2() {
  const navigate = useNavigate();

  const handleGoToRegister = (role) => {
    navigate({
      pathname: "/register",
      search: createSearchParams({
        role: role
      }).toString()
    });
  }

  return (
    <>
      <Menu />
      <div className="container-fluid py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 text-center">
              <h1 className="display-4 mb-4">Choisissez votre espace</h1>
              <p className="lead">Inscrivez-vous en tant que médecin ou patient pour accéder à nos services.</p>
            </div>
          </div>
          <div className="row justify-content-center mt-5">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card border-0 shadow">
                <div className="card-body text-center">
                  <button onClick={() => handleGoToRegister('doctor')} className="btn btn-lg btn-primary rounded-circle mb-3">
                    <FaUserNurse size={50} />
                  </button>
                  <h4 className="mb-3">Espace Médecin</h4>
                  <p className="text-muted">Inscription Médecin</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card border-0 shadow">
                <div className="card-body text-center">
                  <button onClick={() => handleGoToRegister('patient')} className="btn btn-lg btn-primary rounded-circle mb-3">
                    <BsPersonCircle size={50} />
                  </button>
                  <h4 className="mb-3">Espace Patient</h4>
                  <p className="text-muted">Inscription Patient</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register2;
