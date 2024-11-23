import "./Charts.css";
import React, { Component, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { AreaChart, Area } from "recharts";
import GaugeChart from 'react-gauge-chart'
import { useEffect } from "react";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const data2 = [
  {
    name: "08h",
    Peças: 2400,
  },
  {
    name: "09h",
    Peças: 1398,
  },
  {
    name: "10h",
    Peças: 9800,
  },
  {
    name: "11h",
    Peças: 3908,
  },
  {
    name: "12h",
    Peças: 4800,
  },
  {
    name: "13h",
    Peças: 3800,
  },
  {
    name: "14h",
    Peças: 4300,
  },
];

const data3 = [
  {
    name: "08h",
    ef: 0.5,
  },
  {
    name: "09h",
    ef: 0.3,
  },
  {
    name: "10h",
    ef: 0.9,
  },
  {
    name: "11h",
    ef: 0.5,
  },
  {
    name: "12h",
    ef: 0.55,
  },
  {
    name: "13h",
    ef: 0.53,
  },
  {
    name: "14h",
    ef: 0.6,
  },
];




export function Piechart(props) {
  const valor = props.Percentagem;
  return(
      <GaugeChart id="gauge-chart1"
      textColor = {"#8884d8"} 
      colors={['#e03c32', '#ffd301', '#7bb662']}
      percent = {valor}
      hideText = {true}/>     
  );
  }



export function Charts2() {
  return (
    <div className="box-width">
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            width={200}
            height={300}
            data={data2}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="Peças" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ChartsEnergia(props) {

  const [energia, setEnergia] = useState([]);
  useEffect(() => {
      setEnergia(props.EnergiaDados)
    },[props.EnergiaDados]);

/*   const values = energia.map(([_, value]) => value);
  const maxValue = Math.max(...values);
  const yAxisMax = Math.round(maxValue * 1.05); */
  
  return (
    <div className="box-width">
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={energia}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey={([timestamp]) => timestamp} />
            <YAxis domain={[0, 1000]} /> 
            <Tooltip />
            <Area
              type="monotone"
              dataKey={([, value]) => value}
              stroke="#000000"
              fill="#007fff"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ChartsOEE(props) {
  const [OEE, setOEE] = useState([]);
  useEffect(() => {
    setOEE(props.OEEDados)
    },[props.OEEDados]);
  
  return (
    <div className="box-width">
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={OEE}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey={([timestamp]) => timestamp} />
            <YAxis domain={[0, 1]} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey={([, value]) => value}
              stroke="#000000"
              fill="#ffd301"
            />

          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


export function Charts1() {
  return (
    <div className="box-width">
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data3}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="ef"
              stroke="#3ab827"
              fill="#3ab827"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function Charts3() {
  return (
    <div className="box">
      <h2> Produtividade </h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <AreaChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="pv"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="amt"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function Charts4() {
  return (
    <div className="box-width">
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
          <BarChart
            width={800}
            height={700}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" stackId="a" fill="#8884d8" />
            <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
            <Bar dataKey="uv" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function Charts5() {
  return (
    <div className="box">
      <MovingChart nb_bar={10} />
    </div>
  );
}

class MovingChart extends Component {
  randomDataArray(nb_elem) {
    var data_bar = [];
    for (var i = 0; i < nb_elem; i++) {
      data_bar.push({
        name: "core " + i,
        freq: Math.round(Math.random() * 1000),
        freq2: Math.round(Math.random() * 1000),
      });
    }
    return data_bar;
  }

  constructor(props) {
    super(props);
    this.state = {
      nb_bar: props.nb_bar,
      data: this.randomDataArray(props.nb_bar),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 2500);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      data: this.randomDataArray(this.props.nb_bar),
    });
  }

  render() {
    return (
      <BarChart width={450} height={340} data={this.state.data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Bar dataKey="freq" fill="#8884d8" />
        <Bar dataKey="freq2" fill="#8214d8" />
      </BarChart>
    );
  }
}
