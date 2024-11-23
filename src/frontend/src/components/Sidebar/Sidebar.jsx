import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { getCurrentUserRole, logout } from "../../firebase";
import logo from './assets/images/Esi-branco.svg'
import { MdLogout, MdOutlineAreaChart, MdManageAccounts, MdGroups, MdGroupAdd, MdOutlineEditCalendar } from "react-icons/md";
import { useEffect, useState } from "react";

const Sidebar = ({children}) => {

    const [SeeAllUsers , SetSeeAllUsers] = useState(false);
    const [AddUserStandard, SetAddUserStandard] = useState(false);
    let SeeAllUsersComponent = null;
    let AddUserStandardComponent = null;

    useEffect(() =>{
        getCurrentUserRole((role) =>{
            console.log(role)
            if(role === "admin"){
                SetSeeAllUsers(true);
                SetAddUserStandard(true);
            }
            else if(role === "leader") {
                SetAddUserStandard(true);
            }
        });
    }, []);

    const navigate = useNavigate();
    const goDash = () =>{  
      navigate("/dashboard");
    }
    const goConta = () =>{  
      navigate("/account");
    }
/*     const goDefinicoes = () =>{  
        navigate("/definicoes");
    } */
    const goClientes = () =>{  
        navigate("/users");
    }
    const goSignupUser = () =>{  
        navigate("/funcionarios");
    }
    const goAgenda = () => {
        navigate("/agenda");
    }
    
    if (SeeAllUsers) {
        SeeAllUsersComponent =                     
        <li className="sidebar2-item">
            <a href="#top" className="sidebar2-link" onClick={goClientes}>
                <MdGroups size={40}/>
                <span className="link-text">Clientes</span>
            </a>
        </li>
    }
   
    if (AddUserStandard) {
        AddUserStandardComponent =                     
        <li className="sidebar2-item">
            <a href="#top" className="sidebar2-link" onClick={goSignupUser}>
                <MdGroupAdd size={40}/>
                <span className="link-text">Funcionários</span>
            </a>
        </li>
    }

    return(
        <div>
            
            <nav className="sidebar2">
                <ul className="sidebar2-nav">
                    <li className="sidebar2-logo">
                        <a href="#top" id="SB2" onClick={goDash}>  
                        <img src={logo} alt="Logo" className='icon' height = "50"  />
                        </a>
                    </li>

                    <li className="sidebar2-item">
                        <a href="#top" className="sidebar2-link" onClick={goDash}>
                            <MdOutlineAreaChart size={40}/> 
                            <span className="link-text">Dasboards</span>
                        </a>
                    </li>

                    <li className="sidebar2-item">
                        <a href="#top" className="sidebar2-link" onClick={goConta}>
                            <MdManageAccounts size={40}/> 
                            <span className="link-text">Conta</span>
                        </a>
                    </li>

                    <li className="sidebar2-item">
                        <a href="#top" className="sidebar2-link" onClick={goAgenda}>
                            <MdOutlineEditCalendar size={40}/>
                            <span className="link-text">Agenda</span>
                        </a>
                    </li>

                    {SeeAllUsersComponent}
                    
                    {AddUserStandardComponent}

                    <li className="sidebar2-item">
                        <a href="#top" className="sidebar2-link" onClick={logout}>
                            <MdLogout size={40}/> 
                            <span className="link-text">SAIR</span>
                        </a>
                    </li>
                </ul>
            </nav>
            

            <section className="home-section2">
                <main>{children}</main>
            </section>
        </div>
    );
}
export default Sidebar;