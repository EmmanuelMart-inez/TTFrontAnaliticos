import React from "react";
import { useFormikContext, Formik, Form, Field, getIn } from "formik";
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
    label: "Básica",
  },
  {
    value: "premio",
    label: "Premio",
  },
  {
    value: "encuesta",
    label: "Encuesta",
  },
];

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(3),
  },
}));

export default function NotificacionForm(props) {
  const classes = useStyles();
  const {
    values,
    errors,
    touched,
    handleBlur,
    setFieldTouched,
    setFieldValue,
    handleSubmit,
  } = useFormikContext();

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
            disabled={props.editar}
            value={values.notificaciones.value}
            onChange={(event) => {
              setFieldValue("notificaciones.value", event.target.value);
            }}
            helperText="Por favor seleccione algún tipo de notificación"
            variant="outlined"
          >
            {notificaciones.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="titulo"
            label="Título"
            name={values.titulo}
            value={values.titulo}
            helperText={
              "Qué quieres que diga el encabezado de esta notificación. Es lo primero que verán los clientes"
            }
            onChange={(event) => {
              setFieldValue("titulo", event.target.value);
            }}
            error={Boolean(errors.titulo)}
            onFocus={() => setFieldTouched("titulo")}
          />
          {errors.titulo && touched.titulo && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {errors.titulo}
            </div>
          )}
        </Grid>
        <Grid item xs={6}>
          <ImagePreview
            icono={values.icono}
            setFieldValue={setFieldValue}
            values={values}
            subirIconoButtonTag="Seleccionar ícono"
            iconoFormikname="icono"
            aspectRatioFraction={4 / 3.5}
          />
          {/* {`${getIn(errors, 'icono.status')} ${getIn(errors, 'icono.filename')} ${getIn(errors, 'icono')}`}
          {getIn(errors, 'icono.status') && touched.titulo && touched.contenido && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {errors.icono}
            </div>
          )} */}
        </Grid>
        {/* TODO: Resolver después */}
        {/* <Grid item xs={6}>
          <ImagePreview
            icono={values.iconoDisplay}
            setFieldValue={setFieldValue}
            values={values}
            subirIconoButtonTag="Seleccionar imagen de detalles"
            iconoFormikname="iconoDisplay"
            aspectRatioFraction={4/3}
          />
        </Grid> */}
        {values.notificaciones.value === "ninguna" || (
          <Grid item xs={6}>
            <TextField
              label="Texto del accionador"
              name={values.textoAccionador}
              value={values.textoAccionador}
              onChange={(event) => {
                setFieldValue("textoAccionador", event.target.value);
              }}
              helperText="Qué quieres que diga el botón que llevará al usuario a responder la encuesta"
              error={Boolean(errors.textoAccionador)}
              onFocus={() => setFieldTouched("textoAccionador")}
            />
            {errors.textoAccionador && touched.textoAccionador && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.textoAccionador}
              </div>
            )}
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
            onChange={(event) => {
              setFieldValue("contenido", event.target.value);
            }}
            helperText="Cuerpo, mensaje o descripción de la notificación. ¿Qué quieres notificar?"
            error={Boolean(errors.contenido)}
            onFocus={() => setFieldTouched("contenido")}
          />
          {errors.contenido && touched.contenido && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {errors.contenido}
            </div>
          )}
        </Grid>
        <Grid item xs={6}>
          <SelectArrayChips disabled={props.editar} />
        </Grid>
        {values.notificaciones.value == "encuesta" && (
          <Grid item xs={6}>
            <TextField
              label="Puntos"
              value={values.encuesta.puntos}
              onChange={(event) => {
                setFieldValue("encuesta.puntos", event.target.value);
              }}
              helperText="Beneficio que obtiene un participante por responder tu encuesta. Recuerda que esto es un gana-gana. ¿Cuántos puntos quieres otorgar por la respuesta de esta encuesta?"
              // error={Boolean(errors.puntos)}
              // onFocus={() => setFieldTouched("encuesta.puntos")}
            />
            {/* {errors.puntos && touched.puntos && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.puntos}
              </div> 
            )} */}
          </Grid>
        )}
        {values.notificaciones.value == "premio" && (
          <Grid item xs={6}>
            <TextField
              label="Puntos"
              value={values.puntos}
              onChange={(event) => {
                setFieldValue("puntos", event.target.value);
              }}
              helperText="Beneficio que obtiene un participante por premio. Recuerda que esto es un gana-gana. ¿Cuántos puntos quieres otorgar de premio?"
              // error={Boolean(errors.puntos)}
              // onFocus={() => setFieldTouched("encuesta.puntos")}
            />
            {/* {errors.puntos && touched.puntos && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.puntos}
              </div> 
            )} */}
          </Grid>
        )}
      </Grid>
    </form>
  );
}
