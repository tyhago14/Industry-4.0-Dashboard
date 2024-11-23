import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import {checkemail } from "../../firebase";
import "./Definicoes.css";

function Definicoes() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    checkemail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return (
    <Sidebar ParentPage="Definições">
      <Navbar CurrentPage="Definições">

      </Navbar>
    </Sidebar>
  );
}
export default Definicoes;
