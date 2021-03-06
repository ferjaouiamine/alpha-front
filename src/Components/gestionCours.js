import { PlusOutlined } from '@ant-design/icons';
import Grid from "@material-ui/core/Grid";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Alert from "@material-ui/lab/Alert";
import { Button } from 'antd';
import axios from "axios";
import MaterialTable from "material-table";
import React, { forwardRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/userDataTable.css";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const api = axios.create({
  baseURL: `/api/`,
});

function GestionEleves() {
  var columns = [
    { title: "id", field: "id", hidden: true },
    { title: "Matière", field: "courseName" },
    /*{
      
      title: "matiere",
      render: (rowData) => (
        <FormControl className={classes.formControl}>
          <Select
            
            onChange={handleChange}
            
            defaultValue={rowData.courseName}
          >
            <option aria-label="None" value="" />
            <option value="math">Math</option>
            <option value="Physique">Physique & Chimie</option>
            <option value="Base de donnée">Base de donnée</option>
            <option value="algo">Algorithme</option>
            <option value="technique">Technique</option>
            <option value="arabic">Arabe</option>
            <option value="français">Français</option>
            <option value="anglais">English</option>
            <option value="science">Science</option>
            <option value="mecanique">Mecanique</option>
            <option value="eco">économie</option>
            <option value="gestion">Gestion</option>
          </Select>
        </FormControl>
      ),
      
    },*/
    { title: "Chapitre", field: "chapterName" },
    { title: "Description", field: "description" },
    { title: "Classe", field: "classe" },
  ];
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessages, setErrorMessages] = useState([]);
  let history = useHistory();

  useEffect(
    () => {
      const getCourses = async () => {
        await api
          .get("/courses")
          .then((res) => {
            setData(res.data.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      getCourses();
    },
    [],
    [errorMessages],
    [iserror],
    [data]
  );

  const handleRowDelete = async (oldData, resolve) => {
    let id = oldData._id;
    await api
      .delete("/course/" + oldData._id)
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
      })
      .catch((error) => {
        setErrorMessages(["Delete failed! Server error"]);
        setIserror(true);
        resolve();
      });
  };

  return (
    <div className="App">
      <Grid container spacing={1}>
        <Grid item xs={3}></Grid>

        <Grid item xs={12}>
          <div>
            {iserror && (
              <Alert severity="error">
                {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>;
                })}
              </Alert>
            )}
          </div>

          <MaterialTable
            style={{ marginTop: 50 }}
            title="Liste des cours"
            isLoading={loading}
            columns={columns}
            data={data}
            icons={tableIcons}
            localization={{
              body: {
                emptyDataSourceMessage: "Pas d'enregistreent à afficher",
                addTooltip: "Ajouter",
                deleteTooltip: "Supprimer",
                editTooltip: "Editer",
                filterRow: {
                  filterTooltip: "Filtrer",
                },
                editRow: {
                  deleteText: "Voulez-vous supprimer cette ligne?",
                  cancelTooltip: "Annuler",
                  saveTooltip: "Enregistrer",
                },
              },
              grouping: {
                placeholder: "Tirer l'entête ...",
                groupedBy: "Grouper par:",
              },
              header: {
                actions: "Actions",
              },
              pagination: {
                labelDisplayedRows: "{from}-{to} de {count}",
                labelRowsSelect: "lignes",
                labelRowsPerPage: "lignes par page:",
                firstAriaLabel: "Première page",
                firstTooltip: "Première page",
                previousAriaLabel: "Page précédente",
                previousTooltip: "Page précédente",
                nextAriaLabel: "Page suivante",
                nextTooltip: "Page suivante",
                lastAriaLabel: "Dernière page",
                lastTooltip: "Dernière page",
              },
              toolbar: {
                addRemoveColumns: "Ajouter ou supprimer des colonnes",
                nRowsSelected: "{0} ligne(s) sélectionée(s)",
                showColumnsTitle: "Voir les colonnes",
                showColumnsAriaLabel: "Voir les colonnes",
                exportTitle: "Exporter",
                exportAriaLabel: "Exporter",
                exportName: "Exporter en CSV",
                searchTooltip: "Chercher",
                searchPlaceholder: "Chercher",
              },
            }}
            editable={{
              /*onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  handleRowUpdate(newData, oldData, resolve);
                }),*/

              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  handleRowDelete(oldData, resolve);
                }),
            }}
            actions={[
              {
                icon: () => <Edit />,
                tooltip: "modifier",
                onClick: (event, rowData) => {
                  history.push({
                    pathname: "/updateCourse",
                    state: { rowData: rowData },
                  });
                },
              },
              {
                icon: () => <Button type="primary" style={{color : "white"}} shape="circle" icon={<PlusOutlined />} size="large" />,
                tooltip: "Ajouter un cours",
                isFreeAction: true,
                onClick: () => history.push("/addCourse"),
              },
            ]}
          />
        </Grid>

        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
}

export default GestionEleves;
