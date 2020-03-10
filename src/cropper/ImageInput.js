import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  input: {
    display: "none"
  }
}));

export default function CircularIntegration(props) {
  const classes = useStyles();

  return (
    <>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        name={`icono`}
        type="file"
        onChange={props.handleButtonInputImage}
      />
      <label htmlFor="contained-button-file">{props.children}</label>{" "}
    </>
  );
}
