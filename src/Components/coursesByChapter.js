import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(4),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  breadcrumbs: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const CoursesByChapter = () => {
  const location = useLocation();
  const classes = useStyles();
  let classeSection = localStorage.getItem("classeSection");
  const getcourseContent = (coures) => {
    return (
      <Grid item xs={12} sm={4}>
        <Card style={{marginTop: "20%",boxShadow: "2px 2px 1px #9E9E9E"}}>
          <CardHeader
            title={coures.chapterName}
            // subheader={`Chapitre N° ${location.state.data.chapter}`}
          />
          <CardActions>
            <Link
              to={{
                pathname: `/coursepage/${coures._id}`,
                state: {
                  data: coures,
                  courseId: coures._id,
                },
              }}
              style={{ textDecoration: "none" }}
            >
              <Button color="primary">Afficher le cours</Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    );
  };

  return (
    <div>
      <Breadcrumb style={{ marginTop: 20,justifyContent: "flexStart" ,display: "flex"}}>
        <h2><Breadcrumb.Item>Mes cours</Breadcrumb.Item></h2>
         <Breadcrumb.Item><h2>Chapitre</h2></Breadcrumb.Item>
      </Breadcrumb>

      <Grid container spacing={2} >
        {location.state.data.map((coures) =>
          coures.classe === classeSection &&
          coures.courseName ===
            location.pathname.substr(11, location.pathname.length)
            ? getcourseContent(coures)
            : null
        )}
      </Grid>
    </div>
  );
};

export default CoursesByChapter;
