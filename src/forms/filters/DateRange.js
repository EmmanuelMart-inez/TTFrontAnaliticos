import React from 'react';
import ReactDOM from 'react-dom';
import { DateRangePicker } from "rsuite";
import {addDays, format, formatDistance, formatRelative, subDays } from 'date-fns'; // choose your lib

// import default style
import "rsuite/lib/styles/index.less"; // or 'rsuite/dist/styles/rsuite-default.css'
import "rsuite/dist/styles/rsuite-default.css";

export default function DateRange() {
    return <DateRangePicker placeholder={"Seleccione un rango de fechas"}  locale={{
        sunday: 'Do',
        monday: 'Lu',
        tuesday: 'Ma',
        wednesday: 'Mi',
        thursday: 'Ju',
        friday: 'Vi',
        saturday: 'Sá',
        ok: 'OK',
        today: 'Hoy',
        yesterday: 'Ayer',
        last7Days: 'Últimos 7 días'
      }} 
      ranges={[]}
      onOk={(event)=>console.log(event)}
    //   TODO: Agregar ranges, ver la documentación
      />;
     
}


// import React from "react";
// import ReactDOM from "react-dom";
// import { Button, DateRangePicker } from "rsuite";

// // import default style
// import "rsuite/lib/styles/index.less"; // or 'rsuite/dist/styles/rsuite-default.css'
// import "rsuite/dist/styles/rsuite-default.css";

// function App() {
//   return <DateRangePicker placeholder={"Seleccione un rango de fechas"} />;
// }

// ReactDOM.render(<App />, document.getElementById("root"));
