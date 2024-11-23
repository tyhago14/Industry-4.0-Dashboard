import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./OTP.css";
import { auth } from "../../firebase";
import { useState } from "react";
import { checkOTP } from "../../firebase";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

function OTP() {
  const [OTPvalue, setOTP] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const uid = auth.currentUser.uid;
  const [setsuccess] = useState("");

  const goDashboard = () => {
    navigate("/Dashboard");
  };

  const handleKeyDown = (event) => {
    console.log("User pressed: ", event.key);
    if (event.key === "Enter") {
      checkOTP(uid, OTPvalue).then(function (value) {
        setsuccess(value);
      });
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return (
    <div className="body2">
      <div className="otp__container">
        <h4>Bem-vindo a ESI 4.0</h4>
        <h5>Insira a chave de ativação para continuar</h5>
        <input
          type="password"
          minLength={6}
          maxLength={6}
          fontSize="x-large"
          className="otp__textBox"
          value={OTPvalue}
          onChange={(e) => setOTP(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div id="otp-error-holder">
          <p id="otp-error"></p>
          <div className="logo-details">
            <a href="#top">
              {" "}
              <FaRegArrowAltCircleLeft
                className="iconleftarrow"
                id="btn"
                onClick={() => {
                  goDashboard();
                }}
              />{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OTP;
