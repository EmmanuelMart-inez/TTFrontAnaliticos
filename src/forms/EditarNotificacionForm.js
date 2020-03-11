import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useFormikContext, Formik, Field, FieldArray } from "formik";
import { DisplayFormikState } from "./formik-helper";
import axios from "axios";
import { useAsync } from "react-async";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import NotificacionForm from "./new-notificacion";
import EncuestaForm from "./new-encuesta";
import EncuestaPagesForm from "./new-encuestapagina";
import PremioForm from "./new-premio";
import FormButtons from "./formButtons";

import * as Yup from "yup";

// const useDataApi = (initialUrl, initialData) => {
//   const [data, setData] = useState(initialData);
//   const [url, setUrl] = useState(initialUrl);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);
//   useEffect(() => {
//     const fetchData = async () => {
//       setIsError(false);
//       setIsLoading(true);
//       try {
//         const result = await axios(url);
//         setData(result.data);
//       } catch (error) {
//         setIsError(true);
//       }
//       setIsLoading(false);
//     };
//     fetchData();
//   }, [url]);
//   return [{ data, isLoading, isError }, setUrl];
// };

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  }
}));

const Basic = props => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [pageCounter, setPageCounter] = React.useState(0);
  const [isfetching, setIsfetching] = React.useState(true);
  const [isLoad, setIsLoad] = React.useState(false);
  const [response, setResponse] = React.useState("");

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNextPage = () => {
    setPageCounter(pageCounter + 1);
    // if(pageCounter > values.encuesta.paginas.lenght)
    console.log(pageCounter);
  };

  const addSteps = value => {
    setActiveStep(activeStep + value);
  };

  const handleBackPage = () => {
    setPageCounter(pageCounter - 1);
    console.log(pageCounter);
  };

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <NotificacionForm editar={true} />;
      case 1:
        return (
          <>
            <EncuestaForm
              editar={true}
              pageCounter={pageCounter}
              activeStep={activeStep}
            />
            <Box m={5} />
            <EncuestaPagesForm
              editar={true}
              pageCounter={pageCounter}
              activeStep={activeStep}
            />
          </>
        );
      case 3:
        return (
          <PremioForm
            editar={true}
            pageCounter={pageCounter}
            activeStep={activeStep}
          />
        );
      default:
        return (
          <NotificacionForm
            editar={true}
            pageCounter={pageCounter}
            activeStep={activeStep}
          />
        );
    }
  };

  // Then we'll fetch user data from this API
  // const loadNot = async id =>
  //   await fetch("https://jsonplaceholder.typicode.com/users")
  //     .then(res => (res.ok ? res : Promise.reject(res)))
  //     .then(res => res.json());

  // // var e = editInitialValuesState(props.id);
  // // console.log(e);
  // // Implementar enpoints : get, put:editar, delete:eliminar,
  // const [query, setQuery] = useState("redux");
  // const [{ data, isLoading, isError }, doFetch] = useDataApi(
  //   `https://bubbletown.me/admin/notificaciones/${props.id}/acciones/ninguna`,
  //   { hits: [] }
  // );

  if (props.id) {
    var a = undefined;
    if (isfetching)
      axios
        .get(
          `https://bubbletown.me/admin/notificaciones/${
            props.id
          }/acciones/ninguna`,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          axios
            .get(
              `https://bubbletown.me/admin/notificaciones/${
                props.id
              }/acciones/${res.data.notificacion.tipo_notificacion}`,
              {
                headers: {
                  "Content-Type": "application/json"
                }
              }
            )
            .then(res => {
              console.log(res);
              console.log(res.data);
              // Handling undefined or diferents tipes of not
              if (typeof res.data.premio === "undefined") {
                res.data.premio = {
                  nombre: "",
                  mensaje: "",
                  fecha: "",
                  puntos: ""
                };
                console.log(res.premio);
              }
              if (typeof res.data.encuesta === "undefined") {
                res.data.encuesta = {
                  paginas: []
                };
                console.log(res.premio);
              } else
                res.data.encuesta.paginas.map(function(p) {
                  console.log(p);
                  if (p.tipo === "opcion multiple")
                    return (p.tipo = "multiple");
                });
              setResponse(res.data);
              setIsfetching(false);
              // setFieldValue("sendProgress", 2);
            })
            .catch(e => {
              console.log(e);
              // setFieldValue("sendProgress", 3);
            });
          // setFieldValue("sendProgress", 2);
        })
        .catch(e => {
          console.log(e);
          // setFieldValue("sendProgress", 3);
        });

    if (!isfetching)
      return (
        <div>
          {/* <CssBaseline/> */}
          {/* SendProgress status:
          0: sin enviar(inicial),
          1: loading,
          2: enviado con exito
          3: Error
      */}
          <Formik
            initialValues={{
              id: props.id,
              stepSurvey: 0,
              sendProgress: 0,
              isCompleted: false,
              titulo: response.notificacion.titulo,
              premio: {
                titulo: response.premio.nombre,
                contenido: response.premio.mensaje,
                fechaExpiracion: response.premio.fecha
              },
              icono: {
                file: null,
                fileUrl: response.notificacion.imagenIcon,
                filename: "image_cropped.png",
                fileUrlCropped: null,
                fileCropped: null,
                downloadUrl: response.notificacion.imagenIcon,
                status: "fetched",
                isCroppedCompleted: false
              },
              iconoMiniatura: {
                file: null,
                fileUrl: null,
                filename: "image_cropped.png",
                fileUrlCropped: null,
                fileCropped: null,
                downloadUrl: response.premio.imagen_icon,
                status: "",
                isCroppedCompleted: false
              },
              iconoDetalles: {
                file: null,
                fileUrl: null,
                filename: "image_cropped.png",
                fileUrlCropped: null,
                fileCropped: null,
                downloadUrl: response.premio.imagen_display,
                status: "",
                isCroppedCompleted: false
              },
              encuesta: {
                idEncuesta: response.encuesta._id,
                titulo: response.encuesta.titulo,
                categoria: response.encuesta.categoria,
                // fechaCreacion: "",
                metrica: response.encuesta.metrica,
                // puntos: null,
                paginas: response.encuesta.paginas
              },
              textoAccionador: response.notificacion.bar_text,
              contenido: response.notificacion.mensaje,
              // fechaLanzamiento: "",
              segmentacion: "todos",
              // link: "",
              puntos: response.premio.puntos,
              notificaciones: {
                value: response.notificacion.tipo_notificacion
                // value: "ninguna"
              }
            }}
            validationSchema={Yup.object({
              titulo: Yup.string()
                .min(1, "Must be 15 characters or less")
                .required("Required")
              // email: Yup.string()
              //   .email("Invalid email addresss`")
              //   .required("Required"),
              // imagenes: Yup.array()
              //   .min(2, "Agrega al menos dos imagenes")
              //   .of(
              //     Yup.object().shape({
              //       status: Yup.string()
              //         .matches(/(200)/)
              //         .required()
              //     })
              //   )
              // file: Yup.mixed().required("Required")
            })}
            onSubmit={(values, { setSubmitting }) => {
              //   setTimeout(() => {
              //     alert(
              //       JSON.stringify(
              //         {
              //           values
              //         },
              //         null,
              //         2
              //       )
              //     );
              //     setSubmitting(false);
              //   }, 400);
            }}
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
              <div className={classes.layout}>
                <Paper className={classes.paper} elevation={15}>
                  <Grid container spacing={1}>
                    {getStepContent(activeStep)}
                    {/* {props.res.data} */}
                    <FieldArray
                      name="encuesta.paginas"
                      render={arrayHelpers => (
                        <FormButtons
                          editar={true}
                          arrayHelpers={arrayHelpers}
                          activeStep={activeStep}
                          handleNext={handleNext}
                          handleBack={handleBack}
                          handleNextPage={handleNextPage}
                          handleBackPage={handleBackPage}
                          addSteps={addSteps}
                          pageCounter={pageCounter}
                          pageArraySize={values.encuesta.paginas.length}
                        
                        />
                      )}
                    />
                    {/* {values.encuesta.paginas.length} */}
                    <Grid item xs={12}>
                      <DisplayFormikState {...values} />
                    </Grid>
                  </Grid>
                </Paper>
              </div>
            )}
          </Formik>
        </div>
      );
    else return <LinearProgress />;
  } else return <LinearProgress />;
};

export default Basic;
