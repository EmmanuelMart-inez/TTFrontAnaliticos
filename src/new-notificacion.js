import React from "react";
import { useFormikContext, Formik, Form, Field } from "formik";
import { makeStyles } from "@material-ui/core/styles";

import ImagePreview from "./ImagePreview";
import { DisplayFormikState } from "./formik-helper";
import AlertDialog from "./AlertDialog";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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

const segmentacion = [
  {
    value: "todos",
    label: "Ninguna"
  },
  {
    value: "metrica",
    label: "Por mÃ©trica"
  },
  {
    value: "montocompra",
    label: "Monto de compra"
  },
  {
    value: "productocompra",
    label: "Al comprar determinado un producto"
  }
];

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: theme.spacing(3)
  }
}));

export default function NotificacionForm() {
  const classes = useStyles();
  const { values, setFieldValue, handleSubmit } = useFormikContext();
  const [showAlert, setShowAlert] = React.useState(false);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={classes.title}>
            <Typography variant="h5" color="inherit">
              Nueva Notificación
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
          <TextField
            id="standard-select-currency"
            select
            label="Segmentar destinatarios"
            value={values.segmentacion}
            onChange={event => {
              setFieldValue("segmentacion", event.target.value);
            }}
            helperText="Si desea segmentar los destinatarios a quienes va dirigida esta notificaciÃ³n"
          >
            {segmentacion.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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
