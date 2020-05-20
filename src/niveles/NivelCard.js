import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import AlertDialogProgressResend from "../home/AlertDialogResend";

import axios from "axios";
import { apiUrl } from "../shared/constants";

const useStyles = makeStyles({
  root: {
    // display: "flex",
    // flexWrap: "wrap",
    // justifyContent: "space-around",
    // overflow: "hidden",
    // // backgroundColor: theme.palette.background.paper,
    maxWidth: 150,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const [openAlert, setOpenAlert] = React.useState(false);

  const parseISOString = (s) => {
    if (!s) return s;
    var b = s.split(/\D+/);
    var time = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    return <>{time.toLocaleDateString() + " " + time.toLocaleTimeString()}</>;
  };

  return (
    <Card className={classes.root}>
      {openAlert && (
        <AlertDialogProgressResend
          titulo="Confirmar acción"
          body="Esta seguro de que desea eliminar este elemento"
          agree="Aceptar"
          disagree="Cancelar"
          switch={openAlert}
          action={async () =>
            await axios
              .delete(
                `${apiUrl}/niveles/${props._id}`,
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
      <CardContent>
        <Typography variant="h5" component="h2">
          Nivel: {props.num_puntos}
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Días de vigencia: {props.dias_vigencia}
        </Typography>
        <Typography variant="body2" component="p">
          Fecha de creación: {parseISOString(props.fecha_creacion)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" disabled>
          Editar
        </Button>
        <Button size="small"
          onClick={() => setOpenAlert(true)}
        >Eliminar</Button>
      </CardActions>
    </Card>
  );
}
