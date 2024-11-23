import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css"
import { Breadcrumbs, Typography, Link } from "@mui/material";
import { MdSearch, MdNotifications, MdHelp } from "react-icons/md";
import { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import NotificationItem from "./Items/Notifitem/NotificationItem"
import 'react-notifications/lib/notifications.css';
import { NotificationManager, NotificationContainer } from "react-notifications";
import { getCurrentUserName } from "../../firebase";
import { MdOutlineAreaChart, MdManageAccounts, MdDynamicForm, MdOutlineSettingsSuggest, MdGroups, MdGroupAdd, MdOutlineEditCalendar } from "react-icons/md";
import { HiOutlineCpuChip } from "react-icons/hi2";
import logo from './assets/FactoryPulse.svg'

const Navbar = ({CurrentPage, children}) => {

    const navigate = useNavigate();
    const location = useLocation();
    let NomeCelula = null
    let NomeMaquina = null
    const [search,setSearch] = useState("");
    const [openMenu, setOpenMenu] = useState(false);
    const handleOpenMenu = (event) => setOpenMenu(event.currentTarget); 
    const handleCloseMenu = () => setOpenMenu(false);
    const [Nome, setName] = useState();

    const NameActualPage = CurrentPage;
    let ComponentBreadcrumbs = null;
    let iconBreadcrumbs = null;
    let BreadcrumbsCheck = 0;   
    if(NameActualPage !== "Célula" && NameActualPage !== "Máquina" ){
        BreadcrumbsCheck = 1
        if(NameActualPage === "Dashboard"){
            iconBreadcrumbs = <MdOutlineAreaChart/>
        }
        if(NameActualPage === "Conta"){
            iconBreadcrumbs = <MdManageAccounts/>
        }
        if(NameActualPage === "Definições"){
            iconBreadcrumbs = <MdOutlineSettingsSuggest/>
        }
        if(NameActualPage === "Clientes"){
            iconBreadcrumbs = <MdGroups/>
        }
        if(NameActualPage === "Funcionários"){
            iconBreadcrumbs = <MdGroupAdd/>
        }
        if(NameActualPage === "Agenda"){
            iconBreadcrumbs = <MdOutlineEditCalendar/>
        }
    }

    const goDash = () => {
        navigate("/dashboard");
      };
  
      const goAccount = () =>{  
          navigate("/account");
      }
  
      const goCelula = () => {
          navigate(-1);
      };


    if(NameActualPage === "Célula"){
        if(location.state){
            BreadcrumbsCheck = 2
            NomeCelula = location.state.Celula;
        } else {
            window.location.href = "/dashboard";
        }
    }
    if(NameActualPage === "Máquina"){
        if(location.state){
            BreadcrumbsCheck = 3
            NomeCelula = location.state.Celula;
            NomeMaquina = location.state.Maquina;
        } else {
            window.location.href = "/dashboard";
        }
    }


    useEffect(() => {
        getCurrentUserName((Name) => {
            setName(Name);
        });
    }, []);




    if(BreadcrumbsCheck === 1){
        ComponentBreadcrumbs =
        <div>          
            <img src={logo} alt="Logo" className="logo-img"  />
            <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="text.primary">{iconBreadcrumbs} {NameActualPage}</Typography>
                </Breadcrumbs>
            </div>
        </div>
    }

    if(BreadcrumbsCheck === 2){
        ComponentBreadcrumbs =
        <div>
            <img src={logo} alt="Logo" className="logo-img" />
            <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit">
                        <div style={{ cursor: "pointer" }} onClick={goDash}>
                            {" "}<MdOutlineAreaChart/> Dashboard{" "}
                        </div>
                    </Link>
                    <Typography color="text.primary"><MdDynamicForm/> Célula {NomeCelula} </Typography>
                </Breadcrumbs>
            </div>
        </div>
    }

    if(BreadcrumbsCheck === 3){
        ComponentBreadcrumbs =
        <div>
          <img src={logo} alt="Logo" className="logo-img"  />

            <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit">
                <div style={{ cursor: "pointer" }} onClick={goDash}>
                    {" "}<MdOutlineAreaChart/> Dashboard{" "}
                </div>
                </Link>
                <Link underline="hover" color="inherit">
                <div style={{ cursor: "pointer" }} onClick={goCelula}>
                    {" "}<MdDynamicForm/> {NomeCelula}{" "}
                </div>
                </Link>

                <Typography color="text.primary"> <HiOutlineCpuChip/> {NomeMaquina}</Typography>
            </Breadcrumbs>
            </div>
        </div>
    }



    const handleKeyDownSearch = (event,search) => {
        if (event.key === 'Enter') {
        handleSearch(search);
    }};
    
    
    const handleSearch = search => {
        if (search === 'OTP' || search === 'login' || search ==='signup' || search ==='reset' || search ==='dashboard' ||search === 'account' ||search === 'home' ||search === 'energia' || search ==='geral' || search ==='produtividade' ||search === 'definicoes' ) {
          navigate('../'+search); //run search function with enter button press
        }
        else if (!search && !search.value){
          NotificationManager.error('A barra de pesquisa está vazia');
        }
        else if (search === ''){
          NotificationManager.error('A barra de pesquisa está vazia');
        }
        else {
          NotificationManager.info(search);
        }
    };

      // Render the notifications menu
  const renderMenu = () => (
    <Menu
        className="notifmenu"
        anchorEl={openMenu}
        anchorReference={null}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        open={Boolean(openMenu)}
        onClose={handleCloseMenu}
        sx={{ mt: 3 }}>

      <NotificationItem
            color = "standard error"
            title={["Temperatura muito alta!"]}
            date="1 day"
            source = "Motor 3"
            onClick={handleCloseMenu}/>
      <NotificationItem
            color = "standard warning"
            title={["Perda de sinal"]}
            date="2 days"
            source = "Célula: unit0"
            onClick={handleCloseMenu}/>
       <NotificationItem
            color = "standard success"
            title={["Objetivo alcançado"]}
            source = "Célula: unit3"
            date="25 minutos atrás"
            onClick={handleCloseMenu}/>
        <NotificationItem
            color = "standard info"
            title={["Valor superior ao normal"]}
            source = "Máquina: device4 "
            date="13 minutos atrás"
            onClick={handleCloseMenu}/>
        <NotificationItem
            color = "standard"
            title={["Notificação"]}
            source = "Célula: unit1"
            date="10 minutos atrás"
            onClick={handleCloseMenu}/>
    </Menu>
  );
    


    return (
        <div>
            <div className="navbar-left">
                {ComponentBreadcrumbs}
               
            </div>
            <div className="navbar-right">
                <div className="search-all">
                    <div className="navbar-search">
                        <MdSearch size={40} className="navbar-iconSearch" onClick = {() => handleSearch(search)}/>
                        <input className="navbar-searchTerm" id = "searchfield" type="text" required  placeholder="Pesquisar..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown = {event => handleKeyDownSearch(event,search) }/>
                    </div>

                </div>
                    <div className="navbar-help">
                        <MdHelp size={30} className="navbar-icon"/>
                    </div>
                <div className="navbar-notif">
                    <MdNotifications size={30} className="navbar-icon" onClick={handleOpenMenu}/>
                    {renderMenu()}
                </div>
                <div className="name-icon" onClick={goAccount}>
                    <div className="navbar-UserName">
                        {Nome}
                    </div>
                    <div>
                        <MdManageAccounts size={30}/>
                    </div>
                </div>

                
            </div>
            <section className="home-section">
                 <main>{children}</main>
            <NotificationContainer/>
            </section>
        </div>
    );
}

export default Navbar;