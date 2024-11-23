import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  registerUserWithEmailAndPassword,
  getCreatedUsers,
  deleteUser,
} from "../../firebase";
import "./Funcionarios.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

function Funcionarios() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordconfirm, setPasswordconfirm] = useState("");
  const [user, loading] = useAuthState(auth);
  const [createdUsers, setCreatedUsers] = useState([]);

  const handleKeyDownPassConfirm = (event) => {
    if (event.key === "Enter") {
      register(); //run register function with enter button press
    }
  };

  const handleKeyDownEnterNext = (event, paramid) => {
    if (event.key === "Enter") {
      //when enter is pressed, selects next element depending on the hardcoded id passed in paramid

      if (paramid === "fullnameregister") {
        document.getElementById("emailregister").focus();
      } else if (paramid === "emailregister") {
        document.getElementById("passregister").focus();
      } else if (paramid === "passregister") {
        document.getElementById("passconfirmregister").focus();
      }
    }
  };

  const register = () => {
    const registerErrorName = document.getElementById("login-error-name");
    const registerErrorPasswordConf = document.getElementById(
      "login-error-password-confirm"
    );
    if (!name) {
      //Blank name error
      registerErrorName.style.opacity = 1;
      registerErrorName.innerHTML = "Nome inválido";
    } else {
      registerErrorName.style.opacity = 0;
    }

    if (password !== passwordconfirm) {
      //Passwords don't match error
      registerErrorPasswordConf.style.opacity = 1;
      registerErrorPasswordConf.innerHTML = "As palavras-passe não coincidem";
    } else {
      registerErrorPasswordConf.style.opacity = 0;
      registerUserWithEmailAndPassword(
        auth.currentUser.uid,
        name,
        email,
        password
      );
    }
  };

  const handleDeleteUser = async (uid) => {
    try {
      await deleteUser(uid);
      // User deleted successfully
    } catch (error) {
      // An error occurred while deleting the user
      console.error(error);
    }
  };

  useEffect(() => {
    if (loading) return;
    getCreatedUsers(auth.currentUser.uid).then((users) => {
      console.log(users);
      setCreatedUsers(users);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  return (
    <Sidebar ParentPage="Dashboard">
      <Navbar CurrentPage="Funcionários">
        <div>
          <div className="adicionar-utilizador-box">
            <div className="func-titulo">Adicionar utilizadores</div>
            <div className="func-row">
              <div className="func-inputName">
                <div className="func-subTitulo">Nome Completo</div>
                <input
                  id="fullnameregister"
                  type="text"
                  className="register__textBox"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(event) =>
                    handleKeyDownEnterNext(event, "fullnameregister")
                  }
                />
                <div id="login-error-name-holder">
                  <p id="login-error-name"></p>
                </div>
              </div>
              <div className="func-inputName">
                <div className="func-subTitulo">Email</div>
                <input
                  id="emailregister"
                  type="text"
                  className="register__textBox"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(event) =>
                    handleKeyDownEnterNext(event, "emailregister")
                  }
                />
                <div id="login-error-email-holder">
                  <p id="login-error-email"></p>
                </div>
              </div>
            </div>

            <div className="func-row">
              <div className="func-inputName">
                <div className="func-subTitulo">Palavra-Passe</div>
                <input
                  id="passregister"
                  type="password"
                  className="register__textBox"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(event) =>
                    handleKeyDownEnterNext(event, "passregister")
                  }
                />
                <div id="login-error-password-holder">
                  <p id="login-error-password"></p>
                </div>
              </div>
              <div className="func-inputName">
                <div className="func-subTitulo">Confirme a palavra-passe</div>
                <input
                  id="passconfirmregister"
                  type="password"
                  className="register__textBox"
                  value={passwordconfirm}
                  onChange={(e) => setPasswordconfirm(e.target.value)}
                  onKeyDown={handleKeyDownPassConfirm}
                />
                <div id="login-error-password-confirm-holder">
                  <p id="login-error-password-confirm"></p>
                </div>
              </div>
            </div>
            <button className="func-register__btn" onClick={register}>
              Criar Conta
            </button>
          </div>
        </div>

        <div className="adicionar-utilizador-box2">
          <div className="func-titulo">Os meus utilizadores</div>
          <table className="func-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {createdUsers
                .sort((a, b) =>
                  a.name && b.name ? a.name.localeCompare(b.name) : 0
                )
                .map((user) => (
                  <tr key={user.user_name}>
                    <td>{user.user_name}</td>
                    <td>{user.user_email}</td>
                    <td>
                      <button className="func-apagar" onClick={() => handleDeleteUser(user.user_uid)}>
                        Apagar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Navbar>
    </Sidebar>
  );
}
export default Funcionarios;
