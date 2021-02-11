import React, { useState, useContext, useEffect } from "react";
import CourseCard from "./course";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Axios from "axios";
import { Breadcrumb } from "antd";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
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

const Content = () => {
  const classes = useStyles();
  const [error, setError] = useState();
  const [coures, setCoures] = useState([]);
 // let classeSection = localStorage.getItem("classeSection");

  useEffect(() => {
    const getCourses = async () => {
      try {
        const coursesRes = Axios.get("http://localhost:3001/api/courses");
        setCoures((await coursesRes).data.data);
      } catch (err) {
        err && setError(err);
        console.log(error);
      }
    };

    getCourses();
  }, []);

  const getcourseContent = (coures) => {
    return (
      <Grid item xs={12} sm={4}>
        <CourseCard {...coures} />
      </Grid>
    );
  };
  const courseContentUnique = [
    ...new Map(coures.map((item) => [item["courseName"], item])).values(),
  ];
  return (
    <div>
      <Breadcrumb style={{ marginTop: 20,justifyContent: "flexStart" ,display: "flex"}}>
       <Breadcrumb.Item> <h2>Mes cours</h2></Breadcrumb.Item>
        
      </Breadcrumb>

      <FormControl
        variant="filled"
        className={classes.formControl}
      ></FormControl>
      <Grid container spacing={2}>
        {courseContentUnique.map((coursesObejct) =>
          /*coursesObejct.classe === classeSection
            ? getcourseContent(coursesObejct)
            : null*/
            getcourseContent(coursesObejct)
        )}
      </Grid>
    </div>
  );
};

export default Content;
