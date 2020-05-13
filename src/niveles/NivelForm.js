import React, { useState, withStyles } from "react";

import { useFormikContext, Formik, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { DisplayFormikState } from "../forms/formik-helper";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import AlertDialogProgressResend from "../home/AlertDialogResend";
import NotificacionListGridGallery from "../birthdays/NotificacionListGridGallery";
import PremioListGridGallery from "../birthdays/PremioListGridGallery";

import axios from "axios";
import { apiUrl } from "../shared/constants";

const trigggerSello = [
  {
    value: "cantidad",
    label: "Cantidad a comprar $"
  },
  {
    value: "producto",
    label: "Producto a comprar"
  }
];

const numSellos = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
];

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: theme.spacing(3)
  }
}));

export default function NivelForm() {
  const classes = useStyles();
  const [openAlert, setOpenAlert] = React.useState(false);
  const [addLevelForm, setAddLevelForm] = React.useState(false);

  function getFormatedJustIds(array){
      return array.map((i) => i.value)
  }

  return (
    <Formik
      initialValues={{
        id_notificacion: "",
        dias_vigencia: "",
        max_canjeos: "",
        num_puntos: "",
        id_promocion: ""
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
                  .post(
                    `${apiUrl}/niveles`,
                    {
                      num_puntos: values.num_puntos,
                      dias_vigencia: values.dias_vigencia,
                      max_canjeos: values.max_canjeos,
                      id_notificacion: values.id_notificacion,
                      id_promocion: values.id_promocion,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json"
                      }
                    }
                  )
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
                {"Añadir nuevo nivel"}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-select-Npuntos"
              label="Número de puntos"
              value={values.num_puntos}
              onChange={event => {
                let value = parseInt(event.target.value, 10);
                setFieldValue("num_puntos", value);
              }}
              helperText="Por favor seleccione algún número"
            >
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-select-Npuntos"
              label="Dias de vigencia"
              value={values.trigger}
              onChange={event => {
                let value = parseInt(event.target.value, 10);
                setFieldValue("dias_vigencia", value);
              }}
              helperText="Número de días que tendrá el participante para canjear el premio después de obtenerlo"
            >
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-select-Ncanjeos"
              label="Máximo número de canjeos"
              value={values.max_canjeos}
              onChange={event => {
                let value = parseInt(event.target.value, 10);
                setFieldValue("max_canjeos", value);
              }}
              helperText="Número de veces que se podrá canjear la bonificacion de este nivel"
            >
            </TextField>
          </Grid>
          <Grid item xs={6}>
              <TextField
                id="outlined-select-currency"
                select
                label="Seleccionar notificación"
                name="notificaciones"
                // disabled={props.editar}
                value={values.id_notificacion}
                // onChange={event => {
                //   // setFieldValue("notificaciones.value", event.target.value);
                //   setFormState(prevState => ({ ...prevState, 'id_notificacion': "5e7bdf4da36b5ac9b43604a"}));
                //   console.log (values.id_notificacion);
                // }}
                helperText="Por favor seleccione algún tipo de notificación"
                variant="outlined"
              >
                <NotificacionListGridGallery
                  value={values.id_notificacion}
                  label={"seleccion"}
                  handleChange={n => {
                    console.log(n);
                    setFieldValue("id_notificacion", n);
                  }}
                >
                  {values.id_notificacion}
                </NotificacionListGridGallery>
              </TextField>
            </Grid>
            <PremioListGridGallery
              value={values.id_promocion}
              handleChange={n => {
                console.log(n);
                setFieldValue("id_promocion", n);
              }}
            />
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
