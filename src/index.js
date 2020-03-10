import React from "react";
import ReactDOM from "react-dom";
import NotificacionForm from "./forms/NotificacionWithMaterialUI";
import Drawer from "./navegation/Drawer";

import { Router, Switch, Route, Link } from "react-router-dom";
import history from "./history";
// import Croppeer from "./CropperView";
// import DialogCustom from "./ModalDialog";

function App() {
  // return <NotificacionForm />;
  return (
    <Router history={history}>
      <Drawer />
    </Router>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
