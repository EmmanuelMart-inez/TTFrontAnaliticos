import React, { useState, withStyles } from "react";

import { useFormikContext, Formik, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { DisplayFormikState } from "../forms/formik-helper";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ImagePreview from "../forms/ImagePreviewFormik";
import MenuItem from "@material-ui/core/MenuItem";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import NotificacionListGridGallery from "./BonificacionForm/NotificacionListGridGallery";
import PremioListGridGallery from "./BonificacionForm/PremioListGridGallery";

import AlertDialogProgressResend from "../home/AlertDialogResend";
import ReactSelectMultiAnimated from "./ReactSelectMulti";
import DateRange from "../forms/filters/DateRange";

import axios from "axios";
import { apiUrl } from "../shared/constants";

const trigggerSello = [
  {
    value: "cantidad",
    label: "Cantidad a comprar $",
  },
  {
    value: "producto",
    label: "Producto a comprar",
  },
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
  { value: 9, label: "9" },
  { value: 10, label: "10" },
];

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(3),
  },
}));

export default function SellosForm() {
  const classes = useStyles();
  const [openAlert, setOpenAlert] = React.useState(false);

  function getFormatedJustIds(array) {
    return array.map((i) => i.value);
  }

  return (
    <Formik
      initialValues={{
        titulo: "Tarjeta de lealtad del mes de Abril",
        descripcion: "Por cada bebida que compras acumulas una estrella, al acumular 8 bebidas te regalamos una!",
        num_sellos: 0,
        fecha_inicio: "2020-04-03T06:00:00.000Z",
        fecha_fin: "2020-05-03T06:00:00.000Z",
        trigger: 'cantidad',
        cantidad_trigger: 0,
        producto: [],
        iconoOn: {
          file: null,
          fileUrl: "http://127.0.0.1:5001/download/stamp_off.png",
          filename: "image_cropped",
          fileUrlCropped: "http://127.0.0.1:5001/download/stamp_off.png",
          fileCropped: null,
          downloadUrl: "http://127.0.0.1:5001/download/stamp_off.png",
          status: "",
          isCroppedCompleted: false
        },
        iconoOff: {
          file: null,
          fileUrl: "http://127.0.0.1:5001/download/stamp_off.png",
          filename: "image_cropped",
          fileUrlCropped: null,
          fileCropped: null,
          downloadUrl: "http://127.0.0.1:5001/download/stamp_on.png",
          status: "",
          isCroppedCompleted: false
        },
        id_promocion: "5e701fba1377db6386eb11da",
        id_notificacion: "5ea5ee49192170cfe4045289"
        // titulo: "",
        // descripcion: "",
        // num_sellos: 0,
        // fecha_inicio: "",
        // fecha_fin: "",
        // cantidad_trigger: 0,
        // producto: [],
        // iconoOn: {
        //   file: null,
        //   fileUrl: null,
        //   filename: "image_cropped",
        //   fileUrlCropped: null,
        //   fileCropped: null,
        //   downloadUrl: null,
        //   status: "",
        //   isCroppedCompleted: false,
        // },
        // iconoOff: {
        //   file: null,
        //   fileUrl: null,
        //   filename: "image_cropped",
        //   fileUrlCropped: null,
        //   fileCropped: null,
        //   downloadUrl: null,
        //   status: "",
        //   isCroppedCompleted: false,
        // },
        // id_promocion: "",
        // id_notificacion: "",
      }}
      validationSchema={Yup.object({
        titulo: Yup.string()
          .min(1, "Must be 15 characters or less")
          .required("Required"),
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
        setFieldValue,
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
                  .put(
                    `${apiUrl}/tarjetasellos`,
                    {
                      fecha_inicio: values.fecha_inicio,
                      fecha_fin: values.fecha_fin,
                      num_sellos: values.num_sellos,
                      titulo: values.titulo,
                      descripcion: values.descripcion,
                      icono_off: values.iconoOff.downloadUrl,
                      icono_on: values.iconoOn.downloadUrl,
                      producto: getFormatedJustIds(values.producto),
                      cantidad_trigger: values.cantidad_trigger,
                      id_notificacion: values.id_notificacion,
                      id_promocion: values.id_promocion,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  )
                  .then((res) => {
                    if (res.status === 200) return 2;
                    else return 3;
                  })
                  .catch((e) => {
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
                {"Configuracion de la tarjeta de sellos"}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Título"
              multiline
              rowsMax="6"
              name={values.titulo}
              value={values.titulo}
              onChange={(event) => {
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
              onChange={(event) => {
                setFieldValue("descripcion", event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-select-Nsellos"
              select
              label="Número de sellos"
              value={values.trigger}
              onChange={(event) => {
                let value = parseInt(event.target.value, 10);
                setFieldValue("num_sellos", value);
              }}
              helperText="Por favor seleccione algún número"
              variant="outlined"
            >
              {numSellos.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <Typography
              style={{ height: "16px", marginBottom: "5px", color: "#757575" }}
              color="inherit"
            >
              Vigencia
            </Typography>
            <DateRange
              setFieldValue={setFieldValue}
              field1={"fecha_inicio"}
              field2={"fecha_fin"}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-select-triggerSello"
              select
              label="Forma de obtener un sello"
              //   disabled={props.editar}
              value={values.trigger}
              onChange={(event) => {
                setFieldValue("trigger", event.target.value);
              }}
              helperText="Por favor seleccione algún de disparador"
              variant="outlined"
            >
              {trigggerSello.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {values.trigger === "cantidad" && (
            <Grid item xs={6}>
              <TextField
                label="Ingrese la cantidad"
                type="number"
                rowsMax="6"
                name={values.cantidad_trigger}
                value={values.cantidad_trigger}
                onChange={(event) => {
                  let value = parseInt(event.target.value, 10);
                  setFieldValue("cantidad_trigger", value);
                }}
                helperText="Pesos ($)"
              />
            </Grid>
          )}
          {values.trigger === "producto" && (
            <Grid item xs={6}>
              <ReactSelectMultiAnimated
                handleChange={(value) => {
                  // this is going to call setFieldValue and manually update values.topcis
                  setFieldValue("producto", value);
                }}
                value={values.productos}
              />
            </Grid>
          )}
          <Grid item xs={6}>
            <ImagePreview
              icono={values.iconoOn}
              setFieldValue={setFieldValue}
              values={values}
              subirIconoButtonTag="Seleccionar sello ON"
              iconoFormikname="iconoOn"
            />
          </Grid>
          <Grid item xs={6}>
            <ImagePreview
              icono={values.iconoOff}
              setFieldValue={setFieldValue}
              values={values}
              subirIconoButtonTag="Seleccionar sello OFF"
              iconoFormikname="iconoOff"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" color="inherit">
              Bonificacion de la tarjeta de sellos
            </Typography>
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
                handleChange={(n) => {
                  // setFormState((prevState) => ({
                  //   ...prevState,
                  //   id_notificacion: n,
                  // }));
                  console.log(n);
                  setFieldValue("id_notificacion", n);
                }}
              >
                {values.id_notificacion}
              </NotificacionListGridGallery>
            </TextField>
          </Grid>
          <PremioListGridGallery
            value={values.promocion}
            handleChange={(n) => {
              // setFormState((prevState) => ({ ...prevState, promocion: n }));
              // console.log(n);
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
