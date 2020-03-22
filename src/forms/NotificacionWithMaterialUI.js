import React from "react";
import ReactDOM from "react-dom";
import { useFormikContext, Formik, Field, FieldArray } from "formik";
import Thumb from "../cropper/Thumb";
import { DisplayFormikState } from "./formik-helper";
import axios from "axios";

import MuiTextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

import NotificacionForm from "./new-notificacion";
import EncuestaForm from "./new-encuesta";
import EncuestaPagesForm from "./new-encuestapagina";
import PremioForm from "./new-premio";
import FormButtons from "./formButtons";

import * as Yup from "yup";

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
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  title: {
    marginBottom: theme.spacing(3)
  }
}));

const steps = ["Crear notificaciÃ³n", "Especializar notificaciÃ³n"];

const Basic = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [pageCounter, setPageCounter] = React.useState(0);

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
        return <NotificacionForm />;
      case 1:
        return (
          <>
            <EncuestaForm pageCounter={pageCounter} activeStep={activeStep} />
            <Box m={5} />
            <EncuestaPagesForm
              pageCounter={pageCounter}
              activeStep={activeStep}
            />
          </>
        );
      case 3:
        return <PremioForm pageCounter={pageCounter} activeStep={activeStep} />;
      default:
        return (
          <NotificacionForm pageCounter={pageCounter} activeStep={activeStep} />
        );
    }
  };

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
          stepSurvey: 0,
          sendProgress: 0,
          isCompleted: false,
          titulo: "",
          premio: {
            titulo: "",
            textoAccionador: "",
            contenido: "",
            fechaExpiracion: ""
          },
          icono: {
            file: null,
            fileUrl: null,
            filename: "image_cropped",
            fileUrlCropped: null,
            fileCropped: null,
            downloadUrl: null,
            status: "",
            isCroppedCompleted: false
          },
          iconoMiniatura: {
            file: null,
            fileUrl: null,
            filename: "image_cropped",
            fileUrlCropped: null,
            fileCropped: null,
            downloadUrl: null,
            status: "",
            isCroppedCompleted: false
          },
          iconoDetalles: {
            file: null,
            fileUrl: null,
            filename: "image_cropped",
            fileUrlCropped: null,
            fileCropped: null,
            downloadUrl: null,
            status: "",
            isCroppedCompleted: false
          },
          encuesta: {
            idEncuesta: "",
            titulo: "",
            categoria: "",
            // fechaCreacion: "",
            metrica: "",
            // puntos: null,
            paginas: [
              {
                titulo: "",
                // subcategoria: "",
                tipo: "multiple",
                metrica: "",
                opciones: [
                  {
                    icon:
                      "https://www.bubbletown.me/download/notificacionIcon1.png",
                    // {
                    //   file: null,
                    //   fileUrl: null,
                    //   filename: "image_cropped",
                    //   fileUrlCropped: null,
                    //   fileCropped: null,
                    //   status: "",
                    //   downloadUrl: null,
                    //   isCroppedCompleted: false
                    // },
                    calificacion: "",
                    rubrica: ""
                  }
                ]
              }
            ]
          },
          textoAccionador: "",
          contenido: "",
          // fechaLanzamiento: "",
          segmentacion: "todos",
          indexFiltro: 0,
          indexCollection: 0,
          indexField: 0,
          indexTipo: 0,
          indexScale: 0,
          filtros: [
            {
              req: {
                document: "participante_model",
                field: "fecha_antiguedad",
                tipo: "actual",
                method: "filter_by_date",
                scale: "años",
                scale_value: 0,
                date_start: "2020-03-22T05:29:13.324Z"
              },
              res: {
                label: "Por datos del Participante",
                matchTotal: 21,
                participantes: [
                  "5e2ebdc0f9c441ad287a064a",
                  "5e2ed9e0003caf06257cf6ec",
                  "5e2ed9e6003caf06257cf6ed",
                  "5e2ed9eb003caf06257cf6ee",
                  "5e43d0d0b7097366d17f56ab",
                  "5e43d2328fc98907c9417fc3",
                  "5e43d2398fc98907c9417fc4",
                  "5e43d2ae366c11d9a92a7a46",
                  "5e43d31daec9e7fc1bd04414",
                  "5e43f412ac081c0915b66b43",
                  "5e44b756f3a5cd209779d791",
                  "5e44b7ca2607e7b16583cda8",
                  "5e4580bfc0e44d96ad23b7bd",
                  "5e4587069095295048d32a0d",
                  "5e4587dc1e9cec20d8d052a9",
                  "5e4587f01e9cec20d8d052aa",
                  "5e4589c4aa0ebd38ab7b9310",
                  "5e458af1a68ecb3ca541361c",
                  "5e458b5897704b00e3c7d438",
                  "5e598a2ff18ccabdd2cc3822",
                  "5e598a38f18ccabdd2cc3823"
                ]
              }
            },
            {
              req: {
                document: "venta_model",
                field: "total",
                tipo: "=",
                inputType: "1",
                method: "filter_by_float",
                float1: 80
              },
              res: {
                label: "Por datos del ticket de venta",
                matchTotal: 2,
                participantes: [
                  "5e462b2f174d02be8e6fabb0",
                  "5e6f6e1a210261e9f3c2b15d"
                ]
              }
            }
          ],
          participantesFor: [],
          // link: "",
          puntos: "",
          notificaciones: {
            value: "encuesta"
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
                <FieldArray
                  name="encuesta.paginas"
                  render={arrayHelpers => (
                    <FormButtons
                      // editar={true}
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
};

export default Basic;
