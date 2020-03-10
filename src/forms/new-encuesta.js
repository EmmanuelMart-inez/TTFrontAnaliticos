import React from "react";
import { useFormikContext, Formik, Form, Field } from "formik";
import { makeStyles } from "@material-ui/core/styles";

import ImagePreview from "../cropper/ImagePreview";
import { DisplayFormikState } from "./formik-helper";
import AlertDialog from "../shared/AlertDialog";
import EncuestaPage from "./new-encuestapagina";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: theme.spacing(3)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 220
  }
}));

export default function EncuestaForm(props) {
  const classes = useStyles();
  const { values, setFieldValue, handleSubmit } = useFormikContext();
  const [showAlert, setShowAlert] = React.useState(false);

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
