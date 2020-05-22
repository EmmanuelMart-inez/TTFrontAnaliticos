import React from "react";
import { useFormikContext } from "formik";
import { makeStyles } from "@material-ui/core/styles";

import ImagePreview from "./ImagePreviewFormik";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(3),
  },
}));

export default function NotificacionForm(props) {
  const classes = useStyles();
  const { values, setFieldValue, handleSubmit } = useFormikContext();

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
            onChange={(event) => {
              setFieldValue("premio.titulo", event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-select-Npuntos"
            label="Máximo número de canjeos"
            value={values.premio.vidas}
            onChange={(event) => {
              let value = parseInt(event.target.value, 10);
              if (isNaN(value)) value = event.target.value;
              setFieldValue("premio.vidas", value);
            }}
            helperText="Número de veces que se podrá canjear la bonificacion de este nive. Por favor ingrese algún número"
          ></TextField>
        </Grid>
        {/* <Grid item xs={6}>
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
        </Grid> */}
        <Grid item xs={6}>
          <ImagePreview
            icono={values.iconoMiniatura}
            setFieldValue={setFieldValue}
            values={values}
            subirIconoButtonTag="Seleccionar imagen miniatura"
            iconoFormikname="iconoMiniatura"
            aspectRatioFraction={99 / 105}
          />
        </Grid>
        <Grid item xs={6}>
          <ImagePreview
            icono={values.iconoDetalles}
            setFieldValue={setFieldValue}
            values={values}
            subirIconoButtonTag="Seleccionar imagen detalles"
            iconoFormikname="iconoDetalles"
            aspectRatioFraction={224 / 431}
          />
        </Grid>
      </Grid>
    </form>
  );
}
