import React from "react";
import { useFormikContext} from "formik";
import { makeStyles } from "@material-ui/core/styles";

// import { DisplayFormikState } from "./formik-helper";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function EncuestaForm(props) {
  const { values, setFieldValue, handleSubmit } = useFormikContext();

  // console.log("page:", props.pageCounter, "   step:", props.activeStep);

  // if (props.activeStep === 0)
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" color="inherit">
            {props.editar ? "" : "Nueva encuesta"}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Título"
            name="Título"
            value={values.encuesta.titulo}
            multiline
            rowsMax="4"
            onChange={event => {
              setFieldValue("encuesta.titulo", event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Categoría"
            name="Categoría"
            value={values.encuesta.categoria}
            multiline
            rowsMax="2"
            onChange={event => {
              setFieldValue("encuesta.categoria", event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Métrica"
            name={values.encuesta.metrica}
            value={values.encuesta.metrica}
            multiline
            rowsMax="2"
            onChange={event => {
              setFieldValue("encuesta.metrica", event.target.value);
            }}
          />
        </Grid>
      </Grid>
    </form>
  );
  // else return <EncuestaPage pageCounter={props.pageCounter} />;
}
