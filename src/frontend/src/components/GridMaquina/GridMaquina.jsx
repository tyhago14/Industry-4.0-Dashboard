import "./GridMaquina.css";
import { Charts1, Charts2, ChartsEnergia, Piechart } from "../Charts/Charts";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState, /* useContext */ } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { initializeApp } from "firebase/app";
//import { AppContext } from "../../GlobalState"; 
  
const app2 = initializeApp(
    {
        databaseURL: "https://esi4-dev-812ba.europe-west1.firebasedatabase.app/",
    },
    "app2"
    );
    const database2 = getDatabase(app2);
    


function GridMaquina(){

/*     const { state, actions } = useContext(AppContext);
    const { count } = state;
    const { increment, decrement } = actions; */

    const { userID } = useParams();
    const location = useLocation();
    if(!location.state) window.location.href = "/dashboard";

    const NomeEmpresa = location.state.Empresa
    const NomeCelula = location.state.Celula;
    const NomeMaquina = location.state.Maquina;
    const [Maquinas, setMaquinas] = useState([]) ; 

    useEffect(() => {
  
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
            return acc;
          }, {});
          
          setMaquinas(maquina);
        });
    
        return () => {
          listener();
        };
  
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        <div>
        <section className="basic-grid">
            <div className="gridBox card-superwide">
                    <div className="gridBox-text"> Geral  </div>
                    {Maquinas["state"]?.MaquinaInfo.alarmValue}
            </div>
            <div className="gridBox card-wide card-tall">
                <div className="gridBox-text"> Motores  </div>
                <table className="motoresTable" >
                    <tr>
                        <th>Nome</th>
                        <th>Posição</th>
                        <th>Temperatura</th>
                    </tr>
                    <tr>
                        <td>motorA1</td>
                        <td>-1</td>
                        <td>23 ºC</td>
                    </tr>
                    <tr>
                        <td>motorA2</td>
                        <td>-91</td>
                        <td>23 ºC</td>
                    </tr>
                    <tr>
                        <td>motorA3</td>
                        <td>104</td>
                        <td>23 ºC</td>
                    </tr>
                    <tr>
                        <td>motorA4</td>
                        <td>-1</td>
                        <td>23 ºC</td>
                    </tr>
                    <tr>
                        <td>motorA5</td>
                        <td>48</td>
                        <td>23 ºC</td>
                    </tr>
                    <tr>
                        <td>motorA6</td>
                        <td>0</td>
                        <td>23 ºC</td>
                    </tr>
                </table>
            </div>
            <div className="gridBox card-wide  ">
                <div className="gridBox-text"> Energia  </div>
                <ChartsEnergia userID={userID} />
            </div>

            <div className="gridBox">
                <div className="gridBox-text"> OEE  </div>
                <Piechart Percentagem={0.44} />
                <div className="gridBox-subtext"> 44.0  </div>            
            </div>

            <div className="gridBox ">
                <div className="gridBox-text"> Comunicações </div>
{/*                 <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div> */}
            </div>
            

            <div className="gridBox card-wide">
                <div className="gridBox-text"> Índice de produtividade da célula  </div>
                <Charts2/>
            </div>
            <div className="gridBox card-wide">
                <div className="gridBox-text"> Eficiência da máquina (%)  </div>
                <Charts1/>
            </div>
 
        </section>

        </div>
    );

}
export default GridMaquina;