import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import esLocale from "date-fns/locale/es";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  KeyboardDatePicker,
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

export default function CalendarTimePicker(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
      {/* <DatePicker value={selectedDate} onChange={handleDateChange} />
      <TimePicker value={selectedDate} onChange={handleDateChange} /> */}
      {/* <KeyboardDatePicker
        autoOk
        variant="inline"
        inputVariant="outlined"
        label="Fecha de expiraciÃ³n"
        format="MM/dd/yyyy"
        value={selectedDate}
        InputAdornmentProps={{ position: "start" }}
        onChange={date => handleDateChange(date)}
      /> */}
      <KeyboardDateTimePicker
        // label="Fecha de expiraciÃ³n"
        value={props.value}
        onChange={date => {
          handleDateChange(date);
          props.setFieldValue(`${props.field}`, date);
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
