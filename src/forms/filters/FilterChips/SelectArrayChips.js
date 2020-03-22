import React, { useEffect } from "react";
import axios from "axios";
import {
  segmentacion,
  segmentacion_metrica,
  rangoTiempo,
  rangoNumeros,
  rangoStrings,
  escalaTiempo
} from "./constants";
import BadgedChip from "./BadgedChip";

import {
  createMuiTheme,
  makeStyles,
  withStyles
} from "@material-ui/core/styles";

import { useFormikContext, Formik, Form, Field, FieldArray } from "formik";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CheckBox from "../CheckBox";
import DateRange from "../DateRange";
import RangoPicker from "../RangoPicker";
import Callendar from "../../calendarField";
import Chip from "@material-ui/core/Chip";
import Badge from "@material-ui/core/Badge";
import DoneIcon from "@material-ui/icons/Done";
import FaceIcon from "@material-ui/icons/Face";
import { green, orange } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const useStyles1 = makeStyles(theme => ({
  // root: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   flexWrap: 'wrap',
  //   padding: theme.spacing(0.5),
  // },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

const StyledBadge = withStyles(theme => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: "#81c784"
  }
}))(Badge);

const matchBadgetTheme = createMuiTheme({
  palette: {
    secondary: {
      main: green[500]
    }
  }
});

export default function SelectArrayChips() {
  const classes = useStyles();
  const classesChip = useStyles1();
  const [indexFiltro, setIndexFiltro] = React.useState(0);
  // const [indexCollection, setIndexCollection] = React.useState(0);
  // e = empty
  const [eCollection, seteCollection] = React.useState("");
  // const [indexField, setIndexField] = React.useState(0);
  const [eField, seteField] = React.useState("");
  // const [indexTipo, setIndexTipo] = React.useState(0);
  const [eTipo, seteTipo] = React.useState("");
  // const [indexScale, setIndexScale] = React.useState(0);
  const [eScale, seteScale] = React.useState("");
  const [total, setTotal] = React.useState([]);
  // const [filterForm, setFilterForm]  = React.useState([]);
  const { values, setFieldValue, handleSubmit } = useFormikContext();

  useEffect(() => {
    getAllParticipantesFiltered(values.filtros);
    document.title = `You Updated ${values.filtros.length} times`;
  }, [values.filtros]); // Solo se vuelve a ejecutar si count cambia

  // Siempre existe el indice correspondiente
  const getIndex = function(array1, matchString) {
    for (var index in array1)
      if (array1[index].value === matchString) {
        console.log(index);
        return index;
      }
  };

  // El API no retorna ids duplicados
  const getAllParticipantesFiltered = function(filtrosArray) {
    // var pArray = [];

    if (filtrosArray.length === 0) {
      setFieldValue("participantesFor", []);
      return;
    }
    if (
      filtrosArray[filtrosArray.length - 1].res === undefined ||
      (filtrosArray[filtrosArray.length - 1].res.participantes === undefined &&
        filtrosArray.length === 1)
    )
      return;
    var array_intersection = filtrosArray[0].res.participantes;
    for (var p in filtrosArray) {
      console.log("hay for");
      if (p.res !== undefined && p.res.participantes !== undefined) {
        console.log("hay parti");
        array_intersection = array_intersection.filter(function(x) {
          if (p.res.participantes.indexOf(x) != -1) return true;
        });
      }
    }
    setFieldValue("participantesFor", array_intersection);
  };

  const handleSendFilter = function(
    jsonFilter,
    setFieldValue,
    indexFiltro,
    values
  ) {
    const url = "http://127.0.0.1:5001/filtrado";
    axios
      .post(url, [jsonFilter], {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (res.status == 200) {
          setFieldValue(
            `filtros.${indexFiltro}.res.matchTotal`,
            res.data[0].total
          );
          setFieldValue(
            `filtros.${indexFiltro}.res.participantes`,
            res.data[0].participantes
          );
        } else {
        }
        console.log(res);
        console.log(res.data);
        // setFieldValue("sendProgress", 2);
      })
      .catch(e => {
        console.log(e);
        // setFieldValue("sendProgress", 3);
      });
  };

  const handleDelete = function(index, filtros, arrayHelpers) {
    // getAllParticipantesFiltered(filtros, filtros[0].res.participantes);
  };

  return (
    <>
      <FieldArray
        name="filtros"
        render={arrayHelpers => (
          <div>
            {values.filtros && values.filtros.length > 0
              ? values.filtros.map((filtro, index) => (
                  <div key={index}>
                    <BadgedChip
                      key={index}
                      badgetContent={filtro.res.matchTotal || ""}
                      label={filtro.res.label || ""}
                      onDelete={async () => {
                        await arrayHelpers.remove(index);
                        // handleDelete(index, values.filtros, arrayHelpers);
                      }}
                      className={classesChip.chip}
                    />
                  </div>
                ))
              : ""}
            <>
              <StyledBadge
                badgeContent={values.participantesFor.length || 0}
                showZero
              >
                <Chip
                  key={"3643"}
                  icon={<FaceIcon />}
                  label={"Total"}
                  deleteIcon={<DoneIcon />}
                  color="default"
                />
              </StyledBadge>
            </>

            <div>
              {/* <div>{values.participantesFor.length}</div>
              <div>{total}</div> */}
              <TextField
                id="standard-select-tabla"
                select
                label="Segmentar destinatarios"
                value={eCollection || ""}
                // value={segmentacion[values.indexCollection].value}
                onChange={event => {
                  setFieldValue("indexCollection", event.target.value);
                  setFieldValue(
                    `filtros.${indexFiltro}.req.document`,
                    segmentacion[event.target.value].value
                  );
                  setFieldValue(
                    `filtros.${indexFiltro}.res.label`,
                    segmentacion[event.target.value].label
                  );
                  seteCollection(event.target.value);
                }}
                helperText="Si desea segmentar los destinatarios a quienes va dirigida esta notificación"
              >
                {segmentacion.map(option => (
                  <MenuItem key={option.value} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              {segmentacion[values.indexCollection].value !== "todos" && (
                <TextField
                  id="standard-select-field"
                  style={{ marginTop: "30px" }}
                  select
                  label="Filtrar por"
                  value={eField || ""}
                  onChange={event => {
                    setFieldValue(
                      "indexField",
                      getIndex(
                        segmentacion[values.indexCollection].fields,
                        event.target.value
                      )
                    );
                    setFieldValue(
                      `filtros.${indexFiltro}.req.field`,
                      event.target.value
                    );
                    seteField(event.target.value);
                    seteTipo("");
                  }}
                  helperText="Si desea segmentar los destinatarios a quienes va dirigida esta notificación"
                >
                  {segmentacion[values.indexCollection].fields.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              {/* " "al settear el estado deben aparecer los demas campos, no antes por eso eField !== ""  */}
              {eField !== "" &&
                (segmentacion[values.indexCollection].fields[values.indexField]
                  .tipo === "date" ? (
                  <>
                    <TextField
                      id="standard-select-periodo-tiempo"
                      style={{ marginTop: "30px" }}
                      select
                      label="Rango de tiempo"
                      value={eTipo}
                      onChange={event => {
                        setFieldValue("indexTipo", event.target.value);
                        setFieldValue(
                          `filtros.${indexFiltro}.req.tipo`,
                          rangoTiempo[event.target.value].value
                        );
                        setFieldValue(
                          `filtros.${indexFiltro}.req.method`,
                          rangoTiempo[event.target.value].method
                        );
                        seteTipo(event.target.value);
                      }}
                      helperText="Si desea segmentar los destinatarios a quienes va dirigida esta notificación"
                    >
                      {rangoTiempo.map(option => (
                        <MenuItem key={option.value} value={option.id}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    {rangoTiempo[values.indexTipo].inputType ===
                    "number_blockSelect" ? (
                      <>
                        <TextField
                          //   label="Texto del accionador"
                          type="number"
                          name={values.number_blockSelect}
                          value={
                            values.filtros[indexFiltro].req.scale_value || ""
                          }
                          onChange={event => {
                            //   Se deberia actualizar en el paso anterior, pero en ese caso aun no se actualiza el indice, por eso se recorre
                            // Al siguiente seleccionador
                            setFieldValue(
                              `filtros.${indexFiltro}.req.scale_value`,
                              parseFloat(event.target.value)
                            );
                            setFieldValue(
                              `filtros.${indexFiltro}.req.date_start`,
                              new Date()
                            );
                            //   setFieldValue(
                            //     `filtros.${indexFiltro}.method`,
                            //     rangoTiempo[indexTipo].method
                            //   );
                          }}
                        />
                        <TextField
                          id="standard-select-blockSelect"
                          style={{ marginTop: "30px" }}
                          select
                          label="Escala de tiempo"
                          value={eScale}
                          onChange={event => {
                            setFieldValue("indexScale", event.target.value);
                            setFieldValue(
                              `filtros.${indexFiltro}.req.scale`,
                              escalaTiempo[event.target.value].value
                            );
                            seteScale(event.target.value);
                          }}
                          helperText="Si desea segmentar los destinatarios a quienes va dirigida esta notificación"
                        >
                          {escalaTiempo.map(option => (
                            <MenuItem key={option.value} value={option.id}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </>
                    ) : rangoTiempo[values.indexTipo].inputType ===
                      "blockSelect" ? (
                      <TextField
                        id="standard-select-blockSelectSinge"
                        style={{ marginTop: "30px" }}
                        select
                        label="Escala de tiempo"
                        value={eScale}
                        onChange={event => {
                          setFieldValue("indexScale", event.target.value);
                          setFieldValue(
                            `filtros.${indexFiltro}.req.scale`,
                            escalaTiempo[event.target.value].value
                          );
                          setFieldValue(
                            `filtros.${indexFiltro}.req.scale_value`,
                            0
                          );
                          setFieldValue(
                            `filtros.${indexFiltro}.req.date_start`,
                            new Date()
                          );
                          seteScale(event.target.value);
                        }}
                        helperText="Si desea segmentar los destinatarios a quienes va dirigida esta notificación"
                      >
                        {escalaTiempo.map(option => (
                          <MenuItem key={option.value} value={option.id}>
                            {option.singularLabel}
                          </MenuItem>
                        ))}
                      </TextField>
                    ) : rangoTiempo[values.indexTipo].inputType ===
                      "doubleCallendar" ? (
                      <DateRange
                        setFieldValue={setFieldValue}
                        field1={`filtros.${indexFiltro}.req.date_start`}
                        field2={`filtros.${indexFiltro}.req.date_end`}
                      />
                    ) : (
                      <Callendar
                        setFieldValue={setFieldValue}
                        value={values.filtros[indexFiltro].date_start}
                        field={`filtros.${indexFiltro}.req.date_start`}
                      />
                    )}
                  </>
                ) : segmentacion[values.indexCollection].fields[
                    values.indexField
                  ].tipo === "float" ? (
                  <>
                    <TextField
                      id="standard-select-blockSelectSinge"
                      style={{ marginTop: "30px" }}
                      select
                      label="Rango de números"
                      value={eTipo}
                      onChange={event => {
                        setFieldValue("indexTipo", event.target.value);
                        setFieldValue(
                          `filtros.${indexFiltro}.req.tipo`,
                          rangoNumeros[event.target.value].value
                        );
                        setFieldValue(
                          `filtros.${indexFiltro}.req.inputType`,
                          rangoNumeros[event.target.value].inputType
                        );
                        setFieldValue(
                          `filtros.${indexFiltro}.req.method`,
                          rangoNumeros[event.target.value].method
                        );
                        seteTipo(event.target.value);
                      }}
                      helperText="Si desea segmentar los destinatarios a quienes va dirigida esta notificación"
                    >
                      {rangoNumeros.map(option => (
                        <MenuItem key={option.value} value={option.id}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      label="Introduce un número"
                      name={values.rangoNumeros_num1}
                      value={values.filtros[indexFiltro].req.float1}
                      type="number"
                      onChange={event => {
                        setFieldValue(
                          `filtros.${indexFiltro}.req.float1`,
                          parseFloat(event.target.value)
                        );
                      }}
                    />
                    {values.filtros[indexFiltro].req.inputType === "2" && (
                      <TextField
                        label="Introduce un número"
                        type="number"
                        name={values.rangoNumeros_num2}
                        value={values.filtros[indexFiltro].req.float2}
                        onChange={event => {
                          setFieldValue(
                            `filtros.${indexFiltro}.req.float2`,
                            parseFloat(event.target.value)
                          );
                        }}
                      />
                    )}
                  </>
                ) : segmentacion[values.indexCollection].fields[
                    values.indexField
                  ].tipo === "string" ? (
                  <>
                    <TextField
                      id="standard-select-blockString"
                      style={{ marginTop: "30px" }}
                      select
                      // label="Match"
                      value={eTipo}
                      onChange={event => {
                        setFieldValue("indexTipo", event.target.value);
                        setFieldValue(
                          `filtros.${indexFiltro}.req.tipo`,
                          rangoStrings[event.target.value].value
                        );
                        setFieldValue(
                          `filtros.${indexFiltro}.req.method`,
                          rangoStrings[event.target.value].method
                        );
                        seteTipo(event.target.value);
                      }}
                      helperText="Si desea segmentar los destinatarios a quienes va dirigida esta notificación"
                    >
                      {rangoStrings.map(option => (
                        <MenuItem key={option.value} value={option.id}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      label="Introduce algún texto"
                      multiline
                      rowsMax="4"
                      name={values.str}
                      value={values.filtros[indexFiltro].req.str1 || ""}
                      onChange={event => {
                        setFieldValue(
                          `filtros.${indexFiltro}.req.str1`,
                          event.target.value
                        );
                      }}
                    />
                  </>
                ) : (
                  console.log("-")
                ))}
            </div>
            {eField !== "" && (
              <Button
                variant="contained"
                size="small"
                color="primary"
                className={classes.margin}
                onClick={() => {
                  // arrayHelpers.push({
                  //   res: {
                  //     label: "",
                  //     matchTotal: 0,
                  //     participantes: ""
                  //   },
                  //   req: {
                  //     field: "",
                  //     tipo: "",
                  //     scale: "",
                  //     scale_value: "",
                  //     float1: "",
                  //     float2: "",
                  //     date_start: new Date()
                  //   }
                  // });
                  seteTipo("");
                  seteScale("");
                  seteField("");
                  seteCollection("");
                  handleSendFilter(
                    values.filtros[indexFiltro].req,
                    setFieldValue,
                    indexFiltro,
                    values
                  );
                  setIndexFiltro(indexFiltro + 1);
                }}
              >
                Añadir filtro
              </Button>
            )}
          </div>
        )}
      />
    </>
  );
}
