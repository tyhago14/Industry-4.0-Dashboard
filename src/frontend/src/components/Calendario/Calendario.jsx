import "./Calendario.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/pt";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import pt from 'date-fns/locale/pt';
import { useState } from "react";

function Calendario() {
    const localizer = momentLocalizer(moment);
    registerLocale('pt', pt)

  const messages = {
    next: "Seguinte",
    previous: "Anterior",
    today: "Hoje",
    month: "Mês",
    week: "Semana",
    day: "Dia",
    date: "Data",
    time: "Horas",
    event: "Evento",
  };

  const customViews = {
    month: true,
    week: true,
    agenda: true,
  };

  const customViews2 = {
    month: true,
    agenda: true,
  };

  const myEventsList = [
    {
      title: "Reunião",
      start: new Date(2023, 4, 17, 5),
      end: new Date(2023, 4, 17, 7),
    },
    {
      title: "EMAF 2023",
      start: new Date(2023, 4, 31, 10),
      end: new Date(2023, 4, 31, 19),
    },
    {
      title: "EMAF 2023",
      start: new Date(2023, 5, 1, 10),
      end: new Date(2023, 5, 1, 19),
    },
    {
      title: "EMAF 2023",
      start: new Date(2023, 5, 2, 10),
      end: new Date(2023, 5, 2, 19),
    },
    {
      title: "EMAF 2023",
      start: new Date(2023, 5, 3, 10),
      end: new Date(2023, 5, 3, 19),
    },
  ];

  const [newEvent, setNewEvent] = useState({
    title: " ",
    start: new Date(),
    end: new Date(),
  });
  const [allEvents, setallEvent] = useState(myEventsList);

  function addEvent() {
    setallEvent([...allEvents, newEvent]);
  }


  return (
    <div>
    <div className="agenda-box">
      <div>
        <div className="cal-titulo">Adicionar marcação </div>
        <div className="cal-row">
          <div className="cal-inputName">
            <div className="cal-subtitulo">Assunto</div>
            <input className="cal__textBox" type="text" placeholder="Manutenção..." onChange={(e)=>setNewEvent({...newEvent,title:e.target.value})}></input>
          </div>
          <div className="cal-inputName">
            <div className="cal-subtitulo">Data do inicio</div>
            <div className="cal__textBox2" style={{ display: 'flex', justifyContent: 'center' }}>
              <div>
                <DatePicker
                  className="cal__datePicker"
                  selected={newEvent.start}
                  onChange={(start) => setNewEvent({ ...newEvent, start })}
                  showTimeSelect
                  dateFormat="Pp"
                  locale="pt"
                  inputProps={{readOnly: true}}
                />
                
              </div>
            </div>

          </div>
          <div className="cal-inputName">
            <div className="cal-subtitulo">Data do fim</div>
            <div className="cal__textBox2" style={{ display: 'flex', justifyContent: 'center' }}>
              <div>
            <DatePicker
              className="cal__datePicker"
              selected={newEvent.end}
              onChange={(end) => setNewEvent({ ...newEvent, end })}
              showTimeSelect
              dateFormat="Pp"
              locale="pt"
            />
            </div>
            </div>
          </div>
          <div className="cal-inputName">
            <div className="cal-subtitulo">Cliente</div>
            <div className="cal__textBox">
              <select className="cal_select" name="empresas" id="empresas">
                <option value="volvo">NexTech Solutions</option>
                <option value="saab">InnovateX Enterprises</option>
                <option value="opel">AlphaNova Industries</option>
                <option value="audi">QuantumLeap Innovations</option>
              </select>
            </div>

          </div>
        </div>
        <button className="register__btn" onClick={addEvent}>
          {" "}+ Adicionar{" "}
        </button>
      </div>
    </div>
   <div className="agenda-box">
      <div className="calendario">
        <div className="cal-titulo">Próximos agendamentos</div>
        <div className="cal-normal" >
          <Calendar
            localizer={localizer}
            events={allEvents}
            culture="pt"
            messages={messages}
            views={customViews}
            startAccessor="start"
            endAccessor="end"
          />
        </div>
        <div className="cal-small" >
          <Calendar
            localizer={localizer}
            events={allEvents}
            culture="pt"
            messages={messages}
            views={customViews2}
            startAccessor="start"
            endAccessor="end"
          />
        </div>


      </div>
    </div>
    </div>
  );
}
export default Calendario;
