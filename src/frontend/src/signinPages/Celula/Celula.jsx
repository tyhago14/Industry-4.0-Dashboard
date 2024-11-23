import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./Celula.css";
import DestalhesCelula from "../../components/DetalhesCelula/DetalhesCelula";

function Celula() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return (
    <Sidebar ParentPage="Dashboard">
      <Navbar CurrentPage="Célula">
        <div>
          <DestalhesCelula/>
        </div>
      </Navbar>
    </Sidebar>
  );
}
export default Celula;
