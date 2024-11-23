import "./ListCelulas.css";
import React, { useState, useEffect, /* useContext */ } from "react";
import { initializeApp } from "firebase/app";
import Grid from "@mui/material/Grid";
import { MdPrecisionManufacturing, MdPerson } from "react-icons/md";
import { BiTimer } from "react-icons/bi";
import { Link } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import Tooltip from "@mui/material/Tooltip";
import { Piechart } from "../Charts/Charts";
import { BsPlug } from "react-icons/bs";
import { HiOutlineCpuChip } from "react-icons/hi2";
import { getCurrentUserID, getCurrentUserRole } from "../../firebase";
import { SlEnergy } from "react-icons/sl";
//import { AppContext } from "../../GlobalState";



const app2 = initializeApp(
  {
    databaseURL: "https://esi4-dev-812ba.europe-west1.firebasedatabase.app/",
  },
  "app2"
);

const database2 = getDatabase(app2);

function ListCelulas() {

  const [Clientes, setClientes] = useState([]);
/*   const { state, actions } = useContext(AppContext);
  const { DadosHistoricos } = state;
  const { callDados } = actions;
 */
  useEffect(() => {

      getCurrentUserRole((role) => {
        if(role === "admin")
        {
          console.log(role);
          const pathRef = ref(database2, "users/" );
          onValue(pathRef, (snapshot) => {
            console.log(snapshot.val());
            if (!snapshot.exists()) {
              console.log("No data available");
              return;
            }else{
              console.log("Data available");
              let Clientes = [];
              Object.entries(snapshot.val()).forEach(([uid, userDataObj ]) => {
                if(!userDataObj.data) return;

                const userUID = uid;
                const clienteNome = userDataObj.name;
                const celulas = [];
                const NomeEmpresa = Object.keys(userDataObj.data)[0];
                console.log(userUID,clienteNome,NomeEmpresa)
                const ArrayNomeCelulas= [];
                Object.entries(userDataObj.data[NomeEmpresa]).forEach(([celulaName, celulaObject]) => {
                  console.log(celulaName,celulaObject)
                  ArrayNomeCelulas.push(celulaName);
                  celulas.push({
                    NomeCelula: celulaName,
                    NrMaquinas: Object.keys(celulaObject.Maquinas).length,
                    NomeEmpresa: NomeEmpresa,
                    ConsumoEnergia: celulaObject.CelulaData.ConsumoEnergia,
                    EstadoAtual: celulaObject.CelulaData.EstadoAtual,
                    HorasTrabalho: celulaObject.CelulaData.HorasTrabalho,
                    ModoOperação: celulaObject.CelulaData.ModoOperação
                  });
                });
                
                Clientes.push({ userUID, clienteNome, celulas });
                setClientes(Clientes);
              });
            }
          });       
          
        }
        else if(role === "leader" || role === "standard")
        {
          console.log(role);
          getCurrentUserID((uid) =>{

            const pathRef = ref(database2, "users/" + uid);
            onValue(pathRef, (snapshot) => {
              if (!snapshot.exists() || !snapshot.child("data").exists()) {
                console.log("No data available");
                return;
              }else{
                console.log("Data available");
                
                const userData = snapshot.val();          
                const userUID = uid;
                const clienteNome = userData.name;
                let Clientes = [];
                const NomeEmpresa = Object.keys(userData.data)[0];
                const celulas = [];
                Object.entries(snapshot.child("data").child(NomeEmpresa).val()).forEach(([celulaName, celulaObject]) => {       
                  celulas.push({
                    NomeCelula: celulaName,
                    NrMaquinas: Object.keys(celulaObject.Maquinas).length,
                    NomeEmpresa: NomeEmpresa, 
                    ConsumoEnergia: celulaObject.CelulaData.ConsumoEnergia,
                    EstadoAtual: celulaObject.CelulaData.EstadoAtual,
                    HorasTrabalho: celulaObject.CelulaData.HorasTrabalho,
                    ModoOperação: celulaObject.CelulaData.ModoOperação
                  });
                });
                
                Clientes.push({ userUID, clienteNome, celulas });
                setClientes(Clientes);
              }
            });       
          });
        }
    });
  }, []);

    
 
  
  return (
    <div> 
{/*       {DadosHistoricos}
      <button onClick={callDados}>Call-Dados</button> */}
      {Array.from({length: Clientes.length}).map((_, index) => (
        <React.Fragment key={index}>
    <div className="UserName"> <MdPerson/> {Clientes[index]?.clienteNome} </div>
    <section className="container2">
    {Array.from({ length: Clientes[index].celulas.length}).map((_, index2) => (
      <React.Fragment key={`${index}-${index2}`}>
        <div className="card" estadocelula={Clientes[index]?.celulas[index2]?.EstadoAtual} >
          <Link to={`/dashboard/${Clientes[index]?.userUID}`} 
            state={{
              Celula: Clientes[index]?.celulas[index2]?.NomeCelula,
              Empresa: Clientes[index]?.celulas[index2]?.NomeEmpresa  }}>

              <div className="card-body">
                <div className="titulo-celula"> Célula: {Clientes[index]?.celulas[index2]?.NomeCelula} </div>
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={6} md={6} >
               
                    <div className="caixa-box2-celula ">
                        <div className="box4-celula">
                            <div className="energia">
                                OEE
                            </div>
                            <Piechart/>
                            <div className="energia2">
                            44.0
                            </div>
                        </div>
                       
                      
                          <div className="box2-celula">
                            <Tooltip title="Energia a consumir" placement="right" arrow>
                              <Grid container spacing={1} alignItems="center">
                                <Grid item xs={3}>
                                  <div className="box32" >
                                    <SlEnergy size={30} />
                                  </div>
                                </Grid>
                                <Grid item xs={9}>
                                <div className="texto2-dado" > 
                                  {Clientes[index]?.celulas[index2]?.ConsumoEnergia} Watts
                                  </div>
                                </Grid>
                              </Grid>
                            </Tooltip>
                          </div>
                      </div>
                  
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                   
                  <div className="caixa-box2-celula ">
                      <div className="box2-celula">
                        <Tooltip title="Estado da célula" placement="right" arrow>
                          <Grid container spacing={1} alignItems="center">
                            <Grid item xs={3}>
                              <div className="box32" >
                                <BsPlug size={30} />
                              </div>
                            </Grid>
                            <Grid item xs={9}>
                            <div className="texto2-dado" > 
                            {Clientes[index]?.celulas[index2]?.EstadoAtual} 
                              </div>
                            </Grid>
                          </Grid>
                        </Tooltip>
                      </div>
                
                      
                      <div className="box2-celula">
                        <Tooltip title="Tempo de trabalho" placement="right" arrow>
                          <Grid container spacing={1} alignItems="center">
                            <Grid item xs={3}>
                            <div className="box32" >
                                <BiTimer size={30} />
                              </div>
                            </Grid>
                            <Grid item xs={9}>
                            <div className="texto2-dado" > 
                            {Clientes[index]?.celulas[index2]?.HorasTrabalho}  Minutos
                              </div>
                            </Grid>
                          </Grid>
                        </Tooltip>
                      </div>
                      
             
                      <div className="box2-celula">
                        <Tooltip title="Modo de operação" placement="right" arrow>
                          <Grid container spacing={1} alignItems="center">
                            <Grid item xs={3}>
                            <div className="box32" >
                                <MdPrecisionManufacturing size={30} />
                              </div>
                            </Grid>
                            <Grid item xs={9}>
                            <div className="texto2-dado" > 
                            {Clientes[index]?.celulas[index2]?.ModoOperação} 
                              </div>
                            </Grid>
                          </Grid>
                        </Tooltip>
                      </div>
              
                      <div className="box2-celula">
                        <Tooltip title="Número de maquinas" placement="right" arrow>
                          <Grid container spacing={1} alignItems="center">
                            <Grid item xs={3}>
                            <div className="box32" >
                                <HiOutlineCpuChip size={30} />
                              </div>
                            </Grid>
                            <Grid item xs={9}>
                            <div className="texto2-dado" > 
                            {Clientes[index]?.celulas[index2]?.NrMaquinas}  Máquina(s)
                              </div>
                            </Grid>
                          </Grid>
                        </Tooltip>
                      </div> 
                    
                      </div>
                    </Grid>
                    
                </Grid>



              </div>
          </Link>
            </div>
      </React.Fragment>
    ))}
        </section>
  </React.Fragment>
))}


    </div>

    
  );
}
export default ListCelulas;


 






