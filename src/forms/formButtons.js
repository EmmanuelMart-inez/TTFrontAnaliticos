import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";

import { useFormikContext } from "formik";

import axios from "axios";

import AlertDialogControlled from "../shared/AlertDialogProgress";
const useStyles = makeStyles(theme => ({
  actionsButtons: {
    marginTop: "15px"
  },
  buttondown: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(0)
  }
}));

export default function FormButtons(props) {
  const classes = useStyles();
  const {
    values,
    submitForm,
    handleChange,
    setFieldValue,
    handleSubmit,
    isSubmitting,
    onSubmit,
    isValid,
    setSubmitting
  } = useFormikContext();
  // const p = useFormikContext();
  // console.log(p);

  // function sendEditar(){
  //
  //
  //
  //
  // }
  //

  function sendFormBasica(props) {
    var url;
    if (!props.editar) {
      url = "https://bubbletown.me/notificaciones";
      axios
        .post(
          `${url}`,
          {
            titulo: values.titulo,
            mensaje: values.contenido,
            // fecha: "2019-12-19T05:28:40.247",
            imagenIcon: `https://bubbletown.me/download/${values.icono.downloadUrl}`,
            // bar_text: values.textoAccionador,
            tipo_notificacion: values.notificaciones.value
            // link: "5e3540ffdb5584c6403a6332",
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          // console.log(res);
          // console.log(res.data);
          setFieldValue("sendProgress", 2);
        })
        .catch(e => {
          console.log(e);
          setFieldValue("sendProgress", 3);
        });
    } else {
      url = `https://bubbletown.me/admin/notificaciones/${values.id}/acciones/${values.notificaciones.value}`;
      axios
        .put(
          `${url}`,
          {
            notificacion: {
              titulo: values.titulo,
              mensaje: values.contenido,
              // fecha: "2019-12-19T05:28:40.247",
              imagenIcon: `${values.icono.downloadUrl}`,
              // bar_text: values.textoAccionador,
              tipo_notificacion: values.notificaciones.value
              // link: "5e3540ffdb5584c6403a6332",
            }
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          // console.log(res);
          // console.log(res.data);
          setFieldValue("sendProgress", 2);
        })
        .catch(e => {
          console.log(e);
          setFieldValue("sendProgress", 3);
        });
    }
  }

  function sendFormPremio() {
    var url;
    if (!props.editar) {
      axios
        .post(
          `https://bubbletown.me/premios`,
          {
            nombre: values.premio.titulo,
            // fecha: "2019-12-19T05:28:40.247",
            imagen_icon: `${values.iconoMiniatura.downloadUrl}`,
            imagen_display: `${values.iconoDetalles.downloadUrl}`,
            // imagen_icon: `https://bubbletown.me/download/${values.iconoMiniatura.downloadUrl}`,
            // imagen_display: `https://bubbletown.me/download/${values.iconoDetalles.downloadUrl}`,
            puntos: parseInt(values.puntos, 1) || 0 //opcional

            // link: "5e3540ffdb5584c6403a6332",
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          // console.log(res);
          if (res.status === 200)
            axios
              .post(
                `https://bubbletown.me/notificaciones`,
                {
                  titulo: values.premio.titulo,
                  mensaje: values.premio.contenido,
                  // fecha: "2019-12-19T05:28:40.247",
                  imagenIcon: `${values.icono.downloadUrl}`,
                  // imagenIcon: `https://bubbletown.me/download/${values.icono.downloadUrl}`,
                  bar_text: values.textoAccionador,
                  textoAccionador: values.notificaciones.textoAccionador,
                  tipo_notificacion: values.notificaciones.value
                },
                {
                  headers: {
                    "Content-Type": "application/json"
                  }
                }
              )
              .then(res => {
                // console.log(res);
                // console.log(res.data);
                setFieldValue("sendProgress", 2);
              })
              .catch(e => {
                console.log(e);
                setFieldValue("sendProgress", 3);
              });
          // else Show a error message
        })
        .catch(e => {
          console.log(e);
          setFieldValue("sendProgress", 3);
        });
    } else {
      url = `https://bubbletown.me/admin/notificaciones/${values.id}/acciones/${values.notificaciones.value}`;
      axios
        .put(
          url,
          {
            notificacion: {
              titulo: values.premio.titulo,
              mensaje: values.premio.contenido,
              // fecha: "2019-12-19T05:28:40.247",
              imagenIcon: `${values.icono.downloadUrl}`,
              bar_text: values.textoAccionador,
              textoAccionador: values.notificaciones.textoAccionador,
              tipo_notificacion: values.notificaciones.value
            }, //opcional
            premio: {
              nombre: values.premio.titulo,
              // fecha: "2019-12-19T05:28:40.247",
              imagen_icon: `${values.iconoMiniatura.downloadUrl}`,
              imagen_display: `${values.iconoDetalles.downloadUrl}`,
              puntos: parseInt(values.puntos, 1) || 0
            }
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          if (res.status === 200) setFieldValue("sendProgress", 2);
          // else Show a error message
        })
        .catch(e => {
          console.log(e);
          setFieldValue("sendProgress", 3);
        });
    }
  }

  function sendFormEncuesta() {
    var url;
    if (!props.editar) {
      values.encuesta.paginas.map((pag, index) => {
        pag.opciones.map(ops => {
          ops.icon = ops.icon.downloadUrl;
          // "https://www.bubbletown.me/download/" + ops.icon.downloadUrl;
          // ops.icon.downloadUrl ||
          // "https://www.bubbletown.me/download/defaultencuesta.png";
        });
      });

      axios
        .post(
          `https://bubbletown.me/encuesta`,
          {
            titulo: values.encuesta.titulo,
            categoria: values.encuesta.categoria,
            metrica: values.encuesta.metrica,
            // puntos: values.encuesta.puntos,
            paginas: values.encuesta.paginas,
            // fecha: "2019-12-19T05:28:40.247",
            // imagen_icon: `https://bubbletown.me/download/${
            //   values.iconoMiniatura.downloadUrl
            // }`,
            // imagen_display: `https://bubbletown.me/download/${
            //   values.iconoDetalles.downloadUrl
            // }`,
            puntos: parseInt(values.puntos, 1) || 0 //opcional

            // link: "5e3540ffdb5584c6403a6332",
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          // console.log(res);
          if (res.status === 200) var idEncuesta = res.data.ObjectId._id;
          // console.log(idEncuesta);
          axios
            .post(
              `https://bubbletown.me/notificaciones`,
              {
                titulo: values.titulo,
                mensaje: values.contenido,
                // fecha: "2019-12-19T05:28:40.247",
                imagenIcon: `${values.icono.downloadUrl}`,
                bar_text: values.textoAccionador,
                textoAccionador: values.notificaciones.textoAccionador,
                tipo_notificacion: values.notificaciones.value,
                link: idEncuesta
              },
              {
                headers: {
                  "Content-Type": "application/json"
                }
              }
            )
            .then(res => {
              // console.log(res);
              // console.log(res.data);
              setFieldValue("sendProgress", 2);
            })
            .catch(e => {
              console.log(e);
              setFieldValue("sendProgress", 3);
            });

          // else Show a error message
        })
        .catch(e => {
          console.log(e);
          setFieldValue("sendProgress", 3);
        });
    } else {
      values.encuesta.paginas.map((pag, index) => {
        if (pag.tipo == "emoji"){
          pag.opciones.map(ops => {
            ops.icon = ops.icon.downloadUrl;
            // !ops.icon.downloadUrl;
            // ops.icon.downloadUrl =
            //   "https://www.bubbletown.me/download/defaultencuesta.png";
          });}
        if (pag.tipo == "multiple"){
          pag.opciones.map(ops => {
            ops.icon = "https://www.bubbletown.me/download/null.png";
            // !ops.icon.downloadUrl;
            // ops.icon.downloadUrl =
            //   "https://www.bubbletown.me/download/defaultencuesta.png";
          });}
      });
      url = `https://bubbletown.me/admin/notificaciones/${values.id}/acciones/${values.notificaciones.value}`;
      axios
        .put(
          url,
          {
            notificacion: {
              titulo: values.titulo,
              mensaje: values.contenido,
              // fecha: "2019-12-19T05:28:40.247",
              imagenIcon: `${values.icono.downloadUrl}`,
              bar_text: values.textoAccionador,
              textoAccionador: values.notificaciones.textoAccionador,
              tipo_notificacion: values.notificaciones.value
              // link: idEncuesta
            }, //opcional
            encuesta: {
              titulo: values.encuesta.titulo,
              categoria: values.encuesta.categoria,
              metrica: values.encuesta.metrica,
              // puntos: values.encuesta.puntos,
              paginas: values.encuesta.paginas,
              puntos: parseInt(values.puntos, 1) || 0 //opcional
            }
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          if (res.status === 200) setFieldValue("sendProgress", 2);
          // else Show a error message
        })
        .catch(e => {
          console.log(e);
          setFieldValue("sendProgress", 3);
        });
    }
  }

  switch (values.notificaciones.value) {
    case "ninguna":
      return (
        <>
          <AlertDialogControlled
            titulo="Confirmar envío"
            body="Esta seguro de que desea enviar la notificación?"
            agree="Aceptar"
            disagree="Cancelar"
            setFieldValue={setFieldValue}
            sendProgress={values.sendProgress}
            switch={values.isCompleted}
            action={() => sendFormBasica(props)}
          />
          <Grid item xs={4} />
          <Grid item xs={2}>
            <Button
              className={classes.buttondown}
              color="primary"
              type="button"
              disabled={props.editar ? true : isSubmitting}
            >
              cancelar
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              className={classes.buttondown}
              color="primary"
              type="button"
              disabled={props.editar ? true : isSubmitting}
            >
              vista previa
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              className={classes.buttondown}
              color="primary"
              type="submit"
              onClick={() => setFieldValue("isCompleted", true)}
              disabled={isSubmitting}
            >
              Finalizar
            </Button>
          </Grid>
        </>
      );
    case "premio":
      switch (props.pageCounter) {
        case 0:
          return (
            <>
              <Grid item xs={6} />
              <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="button"
                  disabled={props.editar ? true : isSubmitting}
                  onClick={() => {
                    props.addSteps(-3);
                  }}
                >
                  Regresar
                </Button>
              </Grid>

              <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="button"
                  disabled={props.editar ? true : true}
                >
                  vista previa
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="submit"
                  onClick={() => {
                    props.addSteps(3);
                    // console.log(props.activeStep);
                    props.handleNextPage();
                  }}
                  disabled={isSubmitting}
                >
                  Siguiente
                </Button>
              </Grid>
            </>
          );
        case 1:
          return (
            <>
              <AlertDialogControlled
                titulo="Confirmar envío"
                body="Esta seguro de que desea enviar este premio?"
                agree="Aceptar"
                disagree="Cancelar"
                setFieldValue={setFieldValue}
                switch={values.isCompleted}
                sendProgress={values.sendProgress}
                action={sendFormPremio}
              />
              <Grid item xs={6} />
              <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    props.addSteps(-3);
                    props.handleBackPage();
                  }}
                >
                  Regresar
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="button"
                  disabled={props.editar ? true : true}
                >
                  vista previa
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="submit"
                  onClick={() => {
                    // sendFormPremio();
                    setFieldValue("isCompleted", true);
                  }}
                  disabled={isSubmitting}
                >
                  Finalizar
                </Button>
              </Grid>
            </>
          );
        default:
          return;
      }
    case "encuesta":
      switch (props.activeStep) {
        case 0:
          return (
            <>
              <Grid item xs={6} />
              <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="button"
                  disabled={props.editar ? true : isSubmitting}
                  onClick={props.handleBack}
                >
                  Regresar
                </Button>
              </Grid>

              <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="button"
                  disabled={props.editar ? true : true}
                >
                  vista previa
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="submit"
                  onClick={props.handleNext}
                  disabled={isSubmitting}
                >
                  Siguiente
                </Button>
              </Grid>
            </>
          );
        case 1:
          return (
            <Grid container justify="flex-end">
              <AlertDialogControlled
                titulo="Confirmar envío"
                body="Esta seguro de que desea enviar esta encuesta?"
                agree="Aceptar"
                disagree="Cancelar"
                setFieldValue={setFieldValue}
                switch={values.isCompleted}
                action={sendFormEncuesta}
                sendProgress={values.sendProgress}
              />

              <Grid item xs={2} />
              {/* {props.pageCounter === 0 && ( */}
              <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="button"
                  disabled={isSubmitting}
                  onClick={props.handleBack}
                >
                  Regresar
                </Button>
              </Grid>
              {/* )} */}
              {props.pageCounter > 0 && (
                <Grid item xs={2}>
                  <Button
                    className={classes.buttondown}
                    color="primary"
                    type="button"
                    disabled={isSubmitting}
                    onClick={props.handleBackPage}
                  >
                    Página anterior
                  </Button>
                </Grid>
              )}
              <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    if (props.pageCounter + 2 > props.pageArraySize) {
                      props.arrayHelpers.push({
                        titulo: "",
                        tipo: "multiple",
                        metrica: "",
                        opciones: [
                          {
                            icon: "",
                            calificacion: "",
                            rubrica: null
                          }
                        ]
                      });
                    }
                    props.handleNextPage();
                  }}
                >
                  Hay más páginas?
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="button"
                  disabled={props.editar ? true : true}
                >
                  vista previa
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  className={classes.buttondown}
                  color="primary"
                  type="submit"
                  onClick={
                    () => setFieldValue("isCompleted", true)
                    // props.handleNext
                  }
                  disabled={isSubmitting}
                >
                  Finalizar
                </Button>
              </Grid>
            </Grid>
          );
        default:
          return <></>;
      }
    // TODO: Mover estos botones a el formulario dado que cada pagina
    // representa un estado diferente del mismo
    default:
      return <></>;
    // throw new Error("Unknown step");
  }
}
