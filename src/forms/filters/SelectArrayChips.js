import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { useFormikContext, Formik, Form, Field, FieldArray } from "formik";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CheckBox from "./CheckBox";
import DateRange from "./DateRange";
import RangoPicker from "./RangoPicker";
import Callendar from "../calendarField";
import Chip from "@material-ui/core/Chip";

const segmentacion = [
  {
    id: 0,
    value: "todos",
    label: "Ninguna",
    fields: [
      {
        value: "nombre",
        label: "Nombre",
        tipo: "-"
      }
    ]
  },
  {
    id: 1,
    value: "participante_model",
    label: "Por datos del Participante",
    fields: [
      {
        value: "nombre",
        label: "Nombre",
        tipo: "string"
      },
      {
        value: "paterno",
        label: "Apellido paterno",
        tipo: "string"
      },
      {
        value: "sexo",
        label: "Sexo",
        tipo: "string"
      },
      {
        value: "fecha_nacimiento",
        label: "Fecha de nacimiento",
        tipo: "date"
      },
      {
        value: "fecha_antiguedad",
        label: "Fecha de antiguedad como cliente",
        tipo: "date"
      }
    ]
  },
  {
    id: 2,
    value: "venta_model",
    label: "Por datos del ticket de venta",
    fields: [
      {
        value: "fecha_compra",
        label: "Fecha",
        tipo: "string"
      },
      {
        value: "total",
        label: "Fecha en que fue respondida",
        tipo: "date"
      }
    ]
  },
  {
    id: 3,
    value: "encuesta_model",
    label: "Por datos de las encuestas creadas",
    fields: [
      {
        value: "fecha_respuesta",
        label: "Fecha de respuesta",
        tipo: "date"
      },
      {
        value: "metrica",
        label: "Métrica",
        tipo: "string"
      },
      {
        value: "rubrica",
        label: "Ponderación (rubrica)",
        tipo: "float"
      }
    ]
  },
  {
    id: 4,
    value: "participantes_encuesta_model",
    label: "Por datos de la interacción de los participantes en las encuestas",
    fields: [
      {
        value: "estado",
        label: "Estado",
        tipo: "string"
      },
      {
        value: "fecha_respuesta",
        label: "Fecha en que fue respondida",
        tipo: "date"
      },
      {
        value: "respuestas",
        label: "Respuesta del participante",
        tipo: "date"
      }
    ]
  },
  {
    id: 5,
    value: "participante_premio_model",
    label: "Por datos de la interacción de los participantes con premios",
    fields: [
      {
        value: "estado",
        label: "Estado",
        tipo: "string"
      },
      {
        value: "fecha_creacion",
        label: "Fecha en que fue creado",
        tipo: "date"
      },
      {
        value: "fechas_redencion",
        label: "Fecha en la que fue redimido",
        tipo: "date"
      }
    ]
  },
  {
    id: 6,
    value: "participante_model_tarjeta_sellos",
    label: "Por datos del sistema de las tarjetas de sellos",
    fields: [
      {
        value: "num_sellos",
        label: "Número de sellos",
        tipo: "float"
      }
    ]
  },
  {
    id: 7,
    value: "participante_model_tarjeta_puntos",
    label: "Por datos del sistema de las tarjetas de puntos",
    fields: [
      {
        value: "balance",
        label: "Número de puntos",
        tipo: "float"
      }
    ]
  }
];

const segmentacion_metrica = [
  {
    value: 0,
    label: "Número de participantes nuevos",
    tipo: "date"
  },
  {
    value: 1,
    label: "Número de premios entregados",
    collection: "participante_premio_model",
    tipo: "float",
    float1: "",
    field: "fecha_antiguedad"
  },
  {
    value: 2,
    label: "Satisfacción general",
    collection: "participantes_encuesta_model",
    tipo: "string",
    str1: "",
    field: "estado"
  }
];

const rangoTiempo = [
  {
    id: 0,
    value: "anterior",
    label: "Anterior",
    inputType: "number_blockSelect",
    method: "filter_by_date"
  },
  {
    id: 1,
    value: "siguiente",
    label: "Siguiente",
    inputType: "number_blockSelect",
    method: "filter_by_date"
  },
  {
    id: 2,
    value: "actual",
    label: "Actual",
    inputType: "blockSelect",
    method: "filter_by_date"
  },
  {
    id: 3,
    value: "antes",
    label: "Antes",
    inputType: "singleCallendar",
    method: "filter_by_date"
  },
  {
    id: 4,
    value: "despues",
    label: "Después",
    inputType: "singleCalendar",
    method: "filter_by_date"
  },
  {
    id: 5,
    value: "rango",
    label: "Entre",
    inputType: "doubleCallendar",
    method: "filter_by_date_range"
  }
];

const rangoNumeros = [
  {
    id: 0,
    value: "=",
    label: "Igual a",
    inputType: "1"
  },
  {
    id: 1,
    value: ">",
    label: "Mayor a",
    inputType: "1"
  },
  {
    id: 2,
    value: ">=",
    label: "Mayor o igual a",
    inputType: "1"
  },
  {
    id: 3,
    value: "<",
    label: "Menor que",
    inputType: "1"
  },
  {
    id: 4,
    value: "<=",
    label: "Menor o igual que",
    singularLabel: "Minuto",
    inputType: "1"
  },
  {
    id: 5,
    value: "<>",
    label: "Entre",
    inputType: "2"
  }
];

const rangoStrings = [
  {
    id: 0,
    value: "es",
    label: "Es"
  },
  {
    id: 1,
    value: "no es",
    label: "No es"
  },
  {
    id: 2,
    value: "contiene",
    label: "Contiene"
  },
  {
    id: 3,
    value: "no contiene",
    label: "No contiene"
  }
];

const escalaTiempo = [
  {
    id: 0,
    value: "dias",
    label: "Días",
    singularLabel: "Día"
  },
  {
    id: 1,
    value: "semanas",
    label: "Semanas",
    singularLabel: "Semana"
  },
  {
    id: 2,
    value: "meses",
    label: "Meses",
    singularLabel: "Mes"
  },
  {
    id: 3,
    value: "años",
    label: "Años",
    singularLabel: "Año"
  },
  {
    id: 4,
    value: "minutos",
    label: "Minutos",
    singularLabel: "Minuto"
  },
  {
    id: 5,
    value: "horas",
    label: "Horas",
    singularLabel: "Hora"
  }
];

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

export default function SelectArrayChips() {
  const classes = useStyles();
  const classesChip = useStyles1();
  const [indexFiltro, setIndexFiltro] = React.useState(0);
  // const [indexCollection, setIndexCollection] = React.useState(0);
  // const [indexField, setIndexField] = React.useState(0);
  const [eField, seteField] = React.useState('');
  // const [indexTipo, setIndexTipo] = React.useState(0);
  const [eTipo, seteTipo] = React.useState('');
  // const [indexScale, setIndexScale] = React.useState(0);
  const [eScale, seteScale] = React.useState('');
  const { values, setFieldValue, handleSubmit } = useFormikContext();

  // Siempre existe el indice correspondiente
  const getIndex = function(array1, matchString) {
    for (var index in array1)
      if (array1[index].value === matchString) {
        console.log(index);
        return index;
      }
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
                    <Chip
                      key={index}
                      //   icon={icon}
                      label={filtro.label}
                      //   onDelete={
                      //     // data.label === "React" ? undefined : handleDelete(data)
                      //     console.log("Eliminado!")
                      //   }
                      className={classesChip.chip}
                    />
                  </div>
                ))
              : ""}
            <div>
              <TextField
                id="standard-select-tabla"
                select
                label="Segmentar destinatarios"
                value={values.filtros[indexFiltro].document || ""}
                // value={segmentacion[values.indexCollection].value}
                onChange={event => {
                  setFieldValue(
                    "indexCollection",
                    getIndex(segmentacion, event.target.value)
                  );
                  setFieldValue(
                    `filtros.${indexFiltro}.document`,
                    event.target.value
                  );
                }}
                helperText="Si desea segmentar los destinatarios a quienes va dirigida esta notificación"
              >
                {segmentacion.map(option => (
                  <MenuItem key={option.value} value={option.value}>
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
                      `filtros.${values.indexFiltro}.field`,
                      event.target.value
                    );
                    seteField(event.target.value);
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

              {segmentacion[values.indexCollection].fields[values.indexField]
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
                        `filtros.${values.indexFiltro}.tipo`,
                        rangoTiempo[event.target.value].value
                      );
                      setFieldValue(
                        `filtros.${values.indexFiltro}.method`,
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
                        name={values.number_blockSelect}
                        value={
                          values.filtros[values.indexFiltro].scaleValue || ""
                        }
                        onChange={event => {
                          //   Se deberia actualizar en el paso anterior, pero en ese caso aun no se actualiza el indice, por eso se recorre
                          // Al siguiente seleccionador
                          setFieldValue(
                            `filtros.${values.indexFiltro}.scaleValue`,
                            event.target.value
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
                          setFieldValue(
                            "indexScale",
                            event.target.value
                          );
                          setFieldValue(
                            `filtros.${values.indexFiltro}.scale`,
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
                        setFieldValue(
                            "indexScale",
                            event.target.value
                          );
                          setFieldValue(
                            `filtros.${values.indexFiltro}.scale`,
                            escalaTiempo[event.target.value].value
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
                    <DateRange />
                  ) : (
                    <Callendar
                      setFieldValue={setFieldValue}
                      value={values.filtros[values.indexFiltro].date_start}
                      field={`filtros.${values.indexFiltro}.date_start`}
                    />
                  )}
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    className={classes.margin}
                  >
                    Añadir filtro
                  </Button>
                </>
              ) : segmentacion[values.indexCollection].fields[values.indexField]
                  .tipo === "float" ? (
                <>
                  <TextField
                    id="standard-select-blockSelectSinge"
                    style={{ marginTop: "30px" }}
                    select
                    label="Rango de números"
                    value={values.rangoNumeros}
                    onChange={event => {
                      setFieldValue("rangoNumeros", event.target.value);
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
                    value={values.rangoNumeros_num1}
                    onChange={event => {
                      setFieldValue("rangoNumeros_num1", event.target.value);
                    }}
                  />
                  {values.rangoNumeros === 5 && (
                    <TextField
                      label="Introduce un número"
                      name={values.rangoNumeros_num2}
                      value={values.rangoNumeros_num2}
                      onChange={event => {
                        setFieldValue("rangoNumeros_num2", event.target.value);
                      }}
                    />
                  )}
                </>
              ) : segmentacion[values.indexCollection].fields[values.indexField]
                  .tipo === "string" ? (
                <>
                  <TextField
                    id="standard-select-blockString"
                    style={{ marginTop: "30px" }}
                    select
                    // label="Match"
                    value={values.rangoString}
                    onChange={event => {
                      setFieldValue("rangoString", event.target.value);
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
                    name={values.rangoNumeros_str1}
                    value={values.rangoNumeros_str1}
                    onChange={event => {
                      setFieldValue("rangoNumeros_str1", event.target.value);
                    }}
                  />
                </>
              ) : (
                console.log("-")
              )}
            </div>
          </div>
        )}
      />
    </>
  );
}
