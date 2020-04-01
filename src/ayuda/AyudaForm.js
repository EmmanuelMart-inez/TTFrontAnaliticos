import React, { useState, withStyles } from "react";

import Grid from "@material-ui/core/Grid";
import ImagePreview from "../forms/ImagePreviewFormik";
import TextField from "@material-ui/core/TextField";
import { useFormikContext, Formik, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { DisplayFormikState } from "../forms/formik-helper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Box from "@material-ui/core/Box";

import AlertDialogProgressResend from "../home/AlertDialogResend";

import axios from "axios";
import { apiUrl } from "../shared/constants";

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: theme.spacing(3)
  }
}));

export default function AyudaForm() {
  const classes = useStyles();
  const [openAlert, setOpenAlert] = React.useState(false);
  return (
    <Formik
      initialValues={{
        titulo: "",
        descripcion: "",
        icono: {
          file: null,
          fileUrl: null,
          filename: "image_cropped",
          fileUrlCropped: null,
          fileCropped: null,
          downloadUrl: null,
          status: "",
          isCroppedCompleted: false
        }
      }}
      validationSchema={Yup.object({
        titulo: Yup.string()
          .min(1, "Must be 15 characters or less")
          .required("Required")
      })}
      onSubmit={(values, { setSubmitting }) => {}}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue
        /* and other goodies */
      }) => (
        <Grid container spacing={3}>
          {openAlert && (
            <AlertDialogProgressResend
              titulo="Confirmar acción"
              body="Esta seguro de que desea guardar este elemento"
              agree="Aceptar"
              disagree="Cancelar"
              switch={openAlert}
              action={async () =>
                await axios
                  .post(`${apiUrl}/ayuda`, 
                  {
                    imagen_icon: values.icono.fileUrl,
                    titulo: values.titulo,
                    descripcion: values.descripcion
                  }
                  ,{
                    headers: {
                      "Content-Type": "application/json"
                    }
                  })
                  .then(res => {
                    if (res.status === 200) return 2;
                    else return 3;
                  })
                  .catch(e => {
                    console.log(e);
                    return 3;
                    // setFieldValue("sendProgress", 3);
                  })
              }
              close={() => {
                setOpenAlert(false);
                console.log("click cerrar");
                return 2;
              }}
            />
          )}
          <Grid item xs={12}>
            <div className={classes.title}>
              <Typography variant="h6" color="inherit">
                {"Nuevo elemento de Ayuda"}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Título"
              multiline
              rowsMax="4"
              name={values.titulo}
              value={values.titulo}
              onChange={event => {
                setFieldValue("titulo", event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Descripción"
              multiline
              rowsMax="6"
              name={values.descripcion}
              value={values.descripcion}
              onChange={event => {
                setFieldValue("descripcion", event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <ImagePreview
              icono={values.icono}
              setFieldValue={setFieldValue}
              values={values}
              subirIconoButtonTag="Seleccionar ícono"
              iconoFormikname="icono"
            />
          </Grid>
          <Grid item xs={12}>
            <Box p={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={() => {
                  setOpenAlert(true);
                }}
              >
                Guardar
              </Button>
            </Box>
            <DisplayFormikState {...values} />
          </Grid>
        </Grid>
      )}
    </Formik>
  );
}
