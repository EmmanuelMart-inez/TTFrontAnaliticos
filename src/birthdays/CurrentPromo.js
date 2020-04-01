import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import CircularProgress from "@material-ui/core/CircularProgress";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import useBubbletownApi from "../helpers/useBubbletownApi";
import NotificacionCard from "./NotificacionCard";
import PromoCard from "./PromoCard";

export default function CurrentPromo() {
  const { data: notificaciones, loading } = useBubbletownApi({
    path: `birthday`
  });
  const parseISOString = s => {
    var b = s.split(/\D+/);
    var time = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    return <>{time.toLocaleDateString() + " " + time.toLocaleTimeString()}</>;
  };

  if (loading) return <CircularProgress />;
  return (
    <>
      <NotificacionCard notificacionId={notificaciones[0].id_notificacion} />
      <PromoCard promoId={notificaciones[0].id_promocion} />
    </>
  );
}
