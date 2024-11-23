import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./Agenda.css";
import Calendario from "../../components/Calendario/Calendario";
import { checkemail } from "../../firebase";


function Agenda() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();


  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    checkemail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return (
    <Sidebar ParentPage="Agenda">
        <Navbar CurrentPage="Agenda">
            <Calendario/>
        </Navbar>
    </Sidebar>
  );
}
export default Agenda;
