import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../../firebase";
import "./Reset.css";
function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const handleKeyDownEmailReset = (event) => {
    if (event.key === "Enter") {
      sendPasswordReset(email); //run sendpasswordreset function with enter button press
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  return (
    <div>
      <div className="loginflex">
        <div className="left">
          <div className="reset__container">
            <h1>Recupere a sua palavra-passe</h1>
            <h3>EMAIL</h3>
            <input
              type="text"
              className="reset__textBox"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDownEmailReset}
            />
            <div id="login-error-email-holder">
              <p id="login-error-email"></p>
            </div>
            <div className="linkRight">
              <Link to="/signup">Não tem conta? Crie uma agora</Link>
            </div>
            <button
              className="reset__btn"
              onClick={() => sendPasswordReset(email)}
            >
              Enviar Email
            </button>
          </div>
        </div>

        <div className="right"></div>
      </div>
    </div>
  );
}
export default Reset;
