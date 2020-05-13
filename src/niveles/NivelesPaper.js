import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import NivelForm from "./NivelForm";
import ConfigNivelForm from "./ConfigNivelForm";
import NivelCardButton from "./AddButton/NivelCardButton";
import NivelCardList from "./NivelCardList";

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

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <NivelCardButton
            onClick={() => {
              setAddForm(!addForm);
              console.log(addForm);
            }}
          />
        </Grid>
        <Grid item xs={10}>
          <NivelCardList />
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <ConfigNivelForm />
          </Paper>
        </Grid>
        {addForm && (
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <NivelForm />
            </Paper>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
