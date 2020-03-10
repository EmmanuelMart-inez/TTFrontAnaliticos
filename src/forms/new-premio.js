import React from "react";
import { useFormikContext, Formik, Form, Field } from "formik";
import { makeStyles } from "@material-ui/core/styles";

import ImagePreview from "../cropper/ImagePreview";
import { DisplayFormikState } from "./formik-helper";
import AlertDialog from "../shared/AlertDialog";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Calendar from "./calendarField";

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
    label: "Por métrica"
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

export default function NotificacionForm(props) {
  const classes = useStyles();
  const { values, setFieldValue, handleSubmit } = useFormikContext();
  const [showAlert, setShowAlert] = React.useState(false);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={classes.title}>
            <Typography variant="h5" color="inherit">
              {props.editar ? "" : "Nuevo Premio"}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Tí­tulo.*"
            name={values.premio.titulo}
            value={values.premio.titulo}
            onChange={event => {
              setFieldValue("premio.titulo", event.target.value);
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="filled-textarea"
            label="Contenido.*"
            multiline
            variant="outlined"
            rows="3"
            name={values.premio.contenido}
            value={values.premio.contenido}
            onChange={event => {
              setFieldValue("premio.contenido", event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <ImagePreview
            icono={values.iconoMiniatura}
            setFieldValue={setFieldValue}
            values={values}
            subirIconoButtonTag="Seleccionar imagen miniatura"
            iconoFormikname="iconoMiniatura"
          />
        </Grid>
        <Grid item xs={6}>
          <ImagePreview
            icono={values.iconoDetalles}
            setFieldValue={setFieldValue}
            values={values}
            subirIconoButtonTag="Seleccionar imagen detalles"
            iconoFormikname="iconoDetalles"
          />
        </Grid>
      </Grid>
    </form>
  );
}
