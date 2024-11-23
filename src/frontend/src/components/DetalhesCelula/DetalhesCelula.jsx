import "./DetalhesCelula.css";
import React, { useState, useEffect, /* useContext */ } from "react";
import { initializeApp } from "firebase/app";
import Grid from "@mui/material/Grid";
import { MdDynamicForm, MdPrecisionManufacturing } from "react-icons/md";
import { BiTimer } from "react-icons/bi";
import { useLocation, useParams } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import Tooltip from "@mui/material/Tooltip";
import { /*  ChartsEnergia, ChartsOEE, */  Piechart } from "../Charts/Charts";
import { SlEnergy } from "react-icons/sl";
import { BsPlug } from "react-icons/bs";
import { HiOutlineCpuChip } from "react-icons/hi2";
//import {  callCloudFunction  } from "../../firebase";
import ListMaquinas from "../../components/ListMaquinas/ListMaquinas";
//import { AppContext } from "../../GlobalState"; 

const app2 = initializeApp(
  {
    databaseURL: "https://esi4-dev-812ba.europe-west1.firebasedatabase.app/",
  },
  "app2"
);

const database2 = getDatabase(app2);

function DestalhesCelula() {
  const { userID } = useParams();
  const id = userID;
  const location = useLocation();
  const [Celula, setCelula] = useState([]);
  const [NrMaquinas, setNrMaquinas] = useState();
  //const [DadosHistoricos, setDadosHistoricos] = useState([]); 
/*   const { state, actions } = useContext(AppContext);
  const { count, DadosHistoricos } = state;
  const { increment, decrement } = actions; */

  useEffect(() => {

    const pathRef = ref(
      database2,
      `users/${userID}/data/${location.state.Empresa}/${location.state.Celula}`
    );
    const listener = onValue(pathRef, (snapshot) => {
      if (!snapshot.exists()) {
        console.log("No data available");
        return;
      }
      const Celula = snapshot.child("CelulaData").val();
      const NrMaquinas = Object.keys(snapshot.child("Maquinas").val()).length;
      console.log(NrMaquinas);
      console.log(Celula);
      setCelula(Celula);
      setNrMaquinas(NrMaquinas);
    });

    return () => {
      listener();
    };
  }, [id,userID, location.state.Empresa, location.state.Celula]);

  return (
    <div>
{/*           <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div> */}
      <div className="containerCelula">
        <div className="cardCelula" estadocelula={Celula["EstadoAtual"]}>
          <div className="card-body">
            <div className="titulo-celula">
              {" "} 
              <MdDynamicForm/> Célula: {location.state.Celula}{" "}
            </div>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={2}>
                <div className="caixa-box2-celula ">
                  <div className="box4-celula">
                    <div className="CelulaTextSubtitulo">OEE</div>
                    <Piechart Percentagem={Celula["OEE"]} />
                    <div className="energia2">{Celula["OEE"]}</div>
                  </div>

                  <div className="box2-celula">
                    <Tooltip title="Energia a consumir" placement="right" arrow>
                      <Grid container alignItems="center">
                        <Grid item xs={3}>
                          <div className="box32">
                            <SlEnergy size={30} />
                          </div>
                        </Grid>
                        <Grid item xs={9}>
                          <div className="texto2">
                            {Celula["ConsumoEnergia"]} Watts
                          </div>
                        </Grid>
                      </Grid>
                    </Tooltip>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} lg={2}>
                <div className="caixa-box2-celula2 ">
                  <div className="box2-celula">
                    <Tooltip title="Estado da célula" placement="right" arrow>
                      <Grid container alignItems="center">
                        <Grid item xs={3}>
                          <div className="box32">
                            <BsPlug size={30} />
                          </div>
                        </Grid>
                        <Grid item xs={9}>
                          <div className="texto2">{Celula["EstadoAtual"]}</div>
                        </Grid>
                      </Grid>
                    </Tooltip>
                  </div>

                  <div className="box2-celula">
                    <Tooltip title="Tempo de trabalho" placement="right" arrow>
                      <Grid container alignItems="center">
                        <Grid item xs={3}>
                          <div className="box32">
                            <BiTimer size={30} />
                          </div>
                        </Grid>
                        <Grid item xs={9}>
                          <div className="texto2">
                            {Celula["HorasTrabalho"]} Minutos
                          </div>
                        </Grid>
                      </Grid>
                    </Tooltip>
                  </div>

                  <div className="box2-celula">
                    <Tooltip title="Modo de operação" placement="right" arrow>
                      <Grid container alignItems="center">
                        <Grid item xs={3}>
                          <div className="box32">
                            <MdPrecisionManufacturing size={30} />
                          </div>
                        </Grid>
                        <Grid item xs={9}>
                          <div className="texto2">{Celula["ModoOperação"]}</div>
                        </Grid>
                      </Grid>
                    </Tooltip>
                  </div>

                  <div className="box2-celula">
                    <Tooltip title="Número de maquinas" placement="right" arrow>
                      <Grid container alignItems="center">
                        <Grid item xs={3}>
                          <div className="box32">
                            <HiOutlineCpuChip size={30} />
                          </div>
                        </Grid>
                        <Grid item xs={9}>
                          <div className="texto2">{NrMaquinas} Máquina(s)</div>
                        </Grid>
                      </Grid>
                    </Tooltip>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <div className="box-celula">
                  <div className="CelulaTextSubtitulo">OEE </div>
                    {/* <ChartsOEE OEEDados={DadosHistoricos[1]}/> */} 
                </div>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <div className="box-celula">
                  <div className="CelulaTextSubtitulo">Energia (w)</div>
                   {/* <ChartsEnergia EnergiaDados={DadosHistoricos[0]} />  */}
                </div>
              </Grid>
            </Grid>
          </div>
          <ListMaquinas/>
        </div>
      </div>
    </div>
  );
}
export default DestalhesCelula;
