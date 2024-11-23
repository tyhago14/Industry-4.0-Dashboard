import React, { useEffect} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import "../../components/Sidebar/Sidebar";
import {  auth } from "../../firebase";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import ListCelulas from "../../components/ListCelulas/ListCelulas";
import { checklicense,checkemail } from "../../firebase";

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    checklicense().then((result) => {
      if (result === true) {
        navigate("/OTP");
      }
    });
    checkemail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  

  return (
    <Sidebar ParentPage="Dashboard">
      <Navbar CurrentPage="Dashboard">
          <ListCelulas/>
      </Navbar>
    </Sidebar>
  );
}

export default Dashboard;
