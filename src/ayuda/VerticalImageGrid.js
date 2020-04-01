import React, { useState, withStyles } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import image from "./gallery.png";
import useBubbletownApi from "../helpers/useBubbletownApi";
import CircularProgress from "@material-ui/core/CircularProgress";
import AlertDialogProgressResend from "../home/AlertDialogResend";
import axios from "axios";
import { apiUrl } from "../shared/constants";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    // flexWrap: 'nowrap',
    width: 600,
    height: 720,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  }
  //   title: {
  //     color: theme.palette.primary.light,
  //   },
  //   titleBar: {
  //     background:
  //       'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  //   },
}));

// const deleteItem = async itemId =>
// };

export default function SingleLineGridList() {
  const classes = useStyles();
  const [openAlert, setOpenAlert] = React.useState(false);
  const [ayudaId, setAyudaId] = React.useState(false);
  const gridRef = React.useRef();
  const { data: Ayuda, loading } = useBubbletownApi({
    path: `ayuda`
  });

  if (loading) return <CircularProgress />;
  return (
    <div className={classes.root}>
      {openAlert && (
        <AlertDialogProgressResend
          titulo="Confirmar eliminación"
          body="Esta seguro de que desea eliminar este elemento?"
          agree="Aceptar"
          disagree="Cancelar"
          switch={openAlert}
          action={async () => 
            await axios
              .delete(`${apiUrl}/ayuda/${ayudaId}`)
              .then(res => {
                if (res.status === 200) {
                  console.log(Ayuda.Ayuda = Ayuda.Ayuda.filter(a => a._id !== ayudaId));
                  return 2;}
                else return 3;
              })
              .catch(e => {
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
      <GridList cellHeight={200} className={classes.gridList} cols={1} ref={gridRef}>
        <div class="ui divided items">
          {Ayuda.Ayuda.map(tile => (
            <div key={tile._id} class="item" style={{ marginBottom: "20px" }}>
              <div class="ui tiny image">
                <img src={tile.imagen_icon} alt={tile.titulo} />
              </div>
              <div class="middle aligned content">
                <div class="ui right floated">
                  <i
                    class="red right close link icon"
                    onClick={() => {
                      setAyudaId(tile._id);
                      console.log(tile._id);
                      setOpenAlert(true);
                    }}
                  ></i>
                </div>
                <div class="header">{tile.titulo}</div>
                <div class="description">{tile.descripcion}</div>
              </div>
            </div>
          ))}
        </div>
      </GridList>
    </div>
  );
}
