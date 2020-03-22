import React from "react";
import { useFormikContext, Formik, Form, Field } from "formik";
import { makeStyles } from "@material-ui/core/styles";

import ImagePreview from "./ImagePreviewFormik";
import { DisplayFormikState } from "./formik-helper";
import AlertDialog from "../shared/AlertDialog";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CheckBox from "./filters/CheckBox";
import SelectArrayChips from "./filters/FilterChips/SelectArrayChips";

const notificaciones = [
  {
    value: "ninguna",
    label: "Básica"
  },
  {
    value: "premio",
    label: "Premio"
  },
  {
    value: "encuesta",
    label: "Encuesta"
  }
];


const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: theme.spacing(3)
  }
}));

export default function NotificacionForm(props) {
  const classes = useStyles();
  const { values, setFieldValue, handleSubmit } = useFormikContext();
  const [showAlert, setShowAlert] = React.useState(false);
  const [metrica, setMetrica] = React.useState(0);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={classes.title}>
            <Typography variant="h5" color="inherit">
              {props.editar ? "" : "Nueva Notificación"}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-select-currency"
            select
            label="Tipo de notificación"
            name="notificaciones"
            value={values.notificaciones.value}
            onChange={event => {
              setFieldValue("notificaciones.value", event.target.value);
            }}
            helperText="Por favor seleccione algún tipo de notificación"
            variant="outlined"
          >
            {notificaciones.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Título"
            name={values.titulo}
            value={values.titulo}
            onChange={event => {
              setFieldValue("titulo", event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <ImagePreview
            icono={values.icono}
            setFieldValue={setFieldValue}
            values={values}
            subirIconoButtonTag="Seleccionar ícono"
            iconoFormikname="icono"
          />
        </Grid>
        {values.notificaciones.value === "ninguna" || (
          <Grid item xs={6}>
            <TextField
              label="Texto del accionador"
              name={values.textoAccionador}
              value={values.textoAccionador}
              onChange={event => {
                setFieldValue("textoAccionador", event.target.value);
              }}
            />
          </Grid>
        )}
        <Grid item xs={6}>
          <TextField
            id="outlined-multiline-static"
            className={classes.title}
            label="Contenido"
            multiline
            rowsMax="4"
            name={values.contenido}
            value={values.contenido}
            onChange={event => {
              setFieldValue("contenido", event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectArrayChips />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Puntos"
            value={values.puntos}
            onChange={event => {
              setFieldValue("puntos", event.target.value);
            }}
          />
        </Grid>
      </Grid>
    </form>
  );
}
