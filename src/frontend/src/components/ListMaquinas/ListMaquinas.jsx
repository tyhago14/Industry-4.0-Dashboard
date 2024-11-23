import "./ListMaquinas.css";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import Grid from "@mui/material/Grid";
import { FaTemperatureLow } from "react-icons/fa";
import { MdPrecisionManufacturing } from "react-icons/md";
import { BiTimer } from "react-icons/bi";
import { Link, useLocation, useParams } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import Tooltip from "@mui/material/Tooltip";
import { HiOutlineCpuChip } from "react-icons/hi2";


const imagens =
[
  "https://s3.envato.com/files/279593525/WarehouseRobot2020_R11.jpg",
  "https://www.whiteclouds.com/wp-content/uploads/2021/08/industrial-model-material-handling-1200w-1.jpg",
  "https://i.ytimg.com/vi/74BYDqSb-PM/maxresdefault.jpg"
];



const app2 = initializeApp(
  {
    databaseURL: "https://esi4-dev-812ba.europe-west1.firebasedatabase.app/",
  },
  "app2"
);

const database2 = getDatabase(app2);


function ListMaquinas() {

  const { userID } = useParams()
  const location = useLocation();
  const [Maquinas, setMaquinas] = useState([]);
  const NomeCelula = location.state.Celula; 
  const NomeEmpresa = location.state.Empresa

  useEffect(() => {
    const pathRef = ref(database2, `users/${userID}/data/${location.state.Empresa}/${location.state.Celula}`);
    const listener = onValue(pathRef, (snapshot) => {
      if (!snapshot.exists()) {
        console.log("No data available");
        return;
      }

      const maquina = Object.entries(snapshot.child("Maquinas").val()).map(([MaquinaNome, MaquinaObj]) => {
        return {
          MaquinaNome,
          state: {
            alarmValue: MaquinaObj.state.alarm.Value,
            bagmachineValue: MaquinaObj.state.bagmachine.Value,
            machineValue: MaquinaObj.state.machine.Value,
          }
        };
      });
      setMaquinas(maquina);
    });

    return () => {
      listener();
    };
  }, [userID, location.state.Empresa, location.state.Celula]);


  return (
    <div>
    <div className="listaMaquinasBox"> 
    <div className="titulo-listMaquinas"> <HiOutlineCpuChip/> Máquina(s)</div>
    {/* {Array.from({ length: MaquinaNames.length}).map((_, index2) => ( */}
    {Maquinas.map((maquina) => (
      <React.Fragment key={maquina.MaquinaNome}>
        <div className="container">
          <Link to={`/dashboard/${userID}/${maquina.MaquinaNome}`} state={{Empresa:NomeEmpresa, Celula: NomeCelula, Maquina: maquina.MaquinaNome }}  >  
            <div className="card2">
              <div className="card2-header">
                <img src={imagens[0]} alt="" />
              </div>
              <div className="card2-body2">
                <div className="subtitulo-Maquinas"> {maquina.MaquinaNome}</div>
                <div className="box2">
                  <Tooltip title="Alarm" placement="right" arrow>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={3}>
                        <div className="box3" estado={maquina.state.alarmValue}>
                          <MdPrecisionManufacturing size={30} />
                        </div>
                      </Grid>
                      <Grid item xs={9}>
                        <div className="texto" estado={maquina.state.alarmValue}> </div>
                      </Grid>
                    </Grid>
                  </Tooltip>
                </div>
                <div className="box2">
                  <Tooltip title="Bagsmachine" placement="right" arrow>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={3}>
                        <div className="box3" estado={maquina.state.bagmachineValue}>
                          <FaTemperatureLow size={30} />
                        </div>
                      </Grid>
                      <Grid item xs={9}>
                        <div className="texto" estado={maquina.state.bagmachineValue}></div>
                      </Grid>
                    </Grid>
                  </Tooltip>
                </div>
                <div className="box2">
                  <Tooltip title="Machine" placement="right" arrow>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={3}>
                        <div className="box3" estado={maquina.state.machineValue}>
                          <BiTimer size={30} />
                        </div>
                      </Grid>
                      <Grid item xs={9}>
                        <div className="texto" estado={maquina.state.machineValue}></div>
                      </Grid>
                    </Grid>
                  </Tooltip>
                </div>
              </div>
            </div>
         </Link>  
        </div>
      </React.Fragment>
    ))}



    </div>
    </div>
    
  ); 
}
export default ListMaquinas;


 






