import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Account.css";
import { auth } from "../../firebase";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { AccountValues } from "../../firebase";
import logo from './assets/images/Esi-azul.svg'
import { checkemail } from "../../firebase";

function Account() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [userData, setUserData] = useState();


  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    checkemail();
    //AccountValues(auth.currentUser.uid)
    AccountValues((userData) => {
      setUserData(userData);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return (
    <Sidebar ParentPage="Conta">
      <Navbar CurrentPage="Conta">
      <div className="conta-box">
        <div className="conta-box-flex">
        <div className="conta-box-left">
        <img className="logoEmpresa" src={logo} alt="Empresa Logo" />
          <div className="conta-nameInput">
            <div className="conta-subTitulo">
              Nome
            </div>
            <div className="conta-info">
              <span> {userData?.name}</span>
            </div>
          </div>
          <div className="conta-nameInput">
            <div className="conta-subTitulo">
              E-mail
            </div>
            <div className="conta-info">
            <span>{userData?.email}</span>
            </div>
          </div>
          <div className="conta-nameInput">
            <div className="conta-subTitulo">
              Cargo
            </div>
            <div className="conta-info">
            <span>{userData?.role}</span>
            </div>
          </div>


        </div>

        <div className="conta-box-right">
          <div className="conta-nameInput">
            <div className="conta-subTitulo">
              Estado da conta
            </div>
            <div className="conta-info">
              <span>{userData?.licensekey}</span>
            </div>
          </div>
          <div className="conta-nameInput">
            <div className="conta-subTitulo">
              UserID
            </div>
            <div className="conta-info">
              <span>{userData?.uid}</span>
            </div>
          </div>
          <div className="conta-nameInput">
            <div className="conta-subTitulo">
              Morada
            </div>
            <div className="conta-info">
              <span>{userData?.address}</span>
            </div>
          </div>
          <div className="conta-nameInput">
            <div className="conta-subTitulo">
              Contacto
            </div>
            <div className="conta-info">
              <span>{userData?.phone}</span>
            </div>
          </div>
          <div className="conta-nameInput">
            <div className="conta-subTitulo">
              NIF
            </div>
            <div className="conta-info">
              <span>{userData?.NIF}</span>
            </div>
          </div>
        </div>
        </div>
        <div className="btn-center">
          <button className="conta-editarBtn" >
              Editar campos
            </button>
        </div>

      </div>
      </Navbar>
    </Sidebar>
  );
}
export default Account;
