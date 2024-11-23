import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { auth } from "../../firebase";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./Maquina.css";


import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import GridMaquina from "../../components/GridMaquina/GridMaquina";

const app2 = initializeApp(
  {
    databaseURL: "https://esi4-dev-812ba.europe-west1.firebasedatabase.app/",
  },
  "app2"
);
const database2 = getDatabase(app2);

function Maquina() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const { userID } = useParams();
  const location = useLocation();
  if(!location.state) window.location.href = "/dashboard";

  const NomeEmpresa = location.state.Empresa
  const NomeCelula = location.state.Celula;
  const NomeMaquina = location.state.Maquina;
  const [Maquinas, setMaquinas] = useState([]) ; 

    useEffect(() => {
      if (loading) return;
      if (!user) return navigate("/");

      const pathRef = ref(database2, `users/${userID}/data/${NomeEmpresa}/${NomeCelula}/Maquinas/${NomeMaquina}`);
      const listener = onValue(pathRef, (snapshot) => {
        if (!snapshot.exists()) {
          console.log("No data available");
          return;
        }

        const maquina = Object.entries(snapshot.val()).reduce((acc, [MaquinaCategoria, MaquinaInfoObj]) => {
          acc[MaquinaCategoria] = {
            MaquinaInfo: {
              alarmValue: MaquinaInfoObj.alarm.Value,
              bagmachineValue: MaquinaInfoObj.bagmachine.Value,
              machineValue: MaquinaInfoObj.machine.Value,
            }
          };
          console.log(acc)
          return acc;
        }, {});
        
        setMaquinas(maquina);
      });
  
      return () => {
        listener();
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, loading]);

  return (
    <Sidebar ParentPage="Dasboard">
      <Navbar CurrentPage="Máquina">
        <GridMaquina/>
      <div>
          <Box>
            <Grid
              container
              spacing={4}
              justifyContent="flex-start"
              paddingTop={1}
            >
              <Grid item xs={5}>
                <div className="box">
                  <h2> Estado </h2>
                  <br></br>
                  <Grid   container
                  spacing={4}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center">

                          <Grid item xs={4}> 
                        <div className="textoCentro"> Alarm </div> 
                          <div estado={Maquinas["state"]?.MaquinaInfo.alarmValue} className="box22"> 
                            
                          </div>  
                        </Grid>

                        <Grid item xs={4}>
                          <div className="textoCentro"> Bagsmachine </div> 
                          <div estado={Maquinas["state"]?.MaquinaInfo.bagmachineValue} className="box22"> 
                       
                            
                          </div>  
                        </Grid>

                        <Grid item xs={4}> 
                          <div className="textoCentro"> Machine </div> 
                          <div estado={Maquinas["state"]?.MaquinaInfo.machineValue}className="box22"> 
                          </div>  
                        </Grid> 

 
          
                  </Grid>
                  <br></br>
                  <br></br>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className="box">
                  <h2> Comunicações</h2>
                  <br></br>
                  <Grid   container
                  spacing={4}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center">

                        <Grid item xs={6}> 
                        <div className="textoCentro"> Machine </div> 
                        <div estado={null} className="box22"> 
                            
                          </div>  
                        </Grid>

          
                  </Grid>
                  <br></br>
                  <br></br>
                </div>
              </Grid>

            </Grid>
          </Box>
        
      </div>
      </Navbar>
    </Sidebar>
  );
}
export default Maquina;
