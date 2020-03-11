import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAgree = () => {
    // props.setFieldValue("isCompleted", false);
    props.action();
  };

  const handleClose = () => {
    // props.setFieldValue("isCompleted", false);
    props.close();
  };



  return (
    <div>
      {/* {handleOpenClose} */}
      <Dialog
        open={props.switch}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.titulo}</DialogTitle>
        <DialogContent
          style={{
            textAlign: "center"
          }}
        >
          {props.selectFromGalleryComponent}
          <div class="ui horizontal divider">Imágenes almacenadas</div>
          {props.selectFromServer}
          <DialogContentText id="alert-dialog-description">
            {props.body}
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            {props.disagree}
          </Button>
          <Button onClick={handleAgree} color="primary" autoFocus>
            {props.agree}
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
