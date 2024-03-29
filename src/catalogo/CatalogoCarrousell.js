import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import CatalogoForm from "./CatalogoForm";
import VerticalImageGrid from "./VerticalImageGrid";

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

export default function AyudaCarrousell() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <VerticalImageGrid />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <CatalogoForm />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
