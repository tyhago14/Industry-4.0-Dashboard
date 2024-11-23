import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth,verifyemail } from "../../firebase";
import "./SignupEmail.css";
function Register() {
  const [user, loading] = useAuthState(auth);

  const handleClick = () => {
    console.log(user.emailVerified);
    window.location.reload(true);
  };

  useEffect(() => {
    if (loading) return;
    if (user && user.emailVerified) {
      // Redirect to home page
      verifyemail(user.uid);
    }
    //if (user) navigate("/Dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  return (
    <div>
      <div className="loginflex">
        <div className="left">
          <div className="register__container">
            <h3>Foi enviado um e-mail de confirmação, será impossível concluir o registo sem aceder ao link nele contido</h3>
            <button className="register__btn" onClick={handleClick}>
              CONCLUIR REGISTO
            </button>
          </div>
        </div>

        <div className="right"></div>
      </div>
    </div>
  );
}
export default Register;
