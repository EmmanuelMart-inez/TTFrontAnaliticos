import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import NivelForm from "./NivelForm";
import ConfigNivelForm from "./ConfigNivelForm";
import NivelCardButton from "./AddButton/NivelCardButton";
import NivelCardList from "./NivelCardList";

import { useFormikContext, Formik, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { DisplayFormikState } from "../forms/formik-helper";

import axios from "axios";
import { apiUrl } from "../shared/constants";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: "center",
    // color: theme.palette.text.secondary
  },
}));

export default function NivelesPaper() {
  const classes = useStyles();
  const [addForm, setAddForm] = React.useState(false);
  const [editForm, setEditForm] = React.useState(false);

  return (
    <Formik
      initialValues={{
        _id: "",
        id_notificacion: "",
        dias_vigencia: "",
        max_canjeos: "",
        num_puntos: "",
        id_promocion: "",
        editar: false,
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
        resetForm
        /* and other goodies */
      }) => (
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <NivelCardButton
                onClick={() => {
                  setAddForm(!addForm);
                  setFieldValue("editar", false);
                  resetForm();
                  console.log(addForm);
                }}
              />
            </Grid>
            <Grid item xs={10}>
              <NivelCardList />
            </Grid>
            {(addForm || values.editar) && (
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <NivelForm />
                </Paper>
              </Grid>
            )}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <ConfigNivelForm />
              </Paper>
            </Grid>
          </Grid>
        </div>
      )}
    </Formik>
  );
}
