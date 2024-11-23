import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Users.css";
import { auth } from "../../firebase";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { getallUsers, deleteUser} from "../../firebase";

const handleDeleteUser = async (uid) => {
  try {
    await deleteUser(uid);
    // User deleted successfully
  } catch (error) {
    // An error occurred while deleting the user
    console.error(error);
  }
};

function Users() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  var [data, setData] = useState([]);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    function getUsers() {
      const data = getallUsers(auth.currentUser.uid);
      data.then(console.log);
      data.then(function (value) {
        setData(value);
      }); //extracting value from the promise, when it gets fullfilled
    }
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return (
    <Sidebar ParentPage="Clientes">
      <Navbar CurrentPage="Clientes">
        <div className="users-box">
          <div className="users-subtitle">Os meus Clientes</div>
          <table className="User-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Código de ativação</th>
                <th>Cargo</th>
                <th>Estado da conta</th>
                <th>Morada</th>
                <th>Telefone</th>
                <th>NIF</th>
                <th>Ação</th>
                <th>Funcionários</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data).map(([id, value]) => (
                <tr key={id}>
                  <td>{value.name}</td>
                  <td>{value.email}</td>
                  <td>{value.activation}</td>
                  <td>{value.role}</td>
                  <td>{value.licensekey}</td>
                  <td>{value.address}</td>
                  <td>{value.phone}</td>
                  <td>{value.NIF}</td>
                  <td>
                    {" "}
                    <button
                      className="users-edit-btn"
                      onClick={() => handleDeleteUser(id)}
                    >
                      Apagar
                    </button>
                  </td>
                  <td>
                    {(value.role === "leader" || value.role === "admin") && (
                      <select className="users-info">
                        <option value="" disabled selected hidden>
                          Mostrar Lista
                        </option>
                        {console.log(value.createdusers)}
                        {value.createdusers &&
                          Object.entries(value.createdusers).map(([id, user]) => (
                            <option value={user.user_name}>
                              {user.user_name}
                            </option>
                          ))}
                      </select>
                    )}
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
export default Users;
