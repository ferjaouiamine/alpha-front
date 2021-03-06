import { Grid } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import { Breadcrumb } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import emptyImg from "../media/empty.svg";
import CourseCard from "./course";
import Progress from "./progress";

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
  svg : {
    maxWidth: "60%",
  }
}));

const Content = () => {
  const classes = useStyles();
  const [error, setError] = useState();
  const [coures, setCoures] = useState([]);
  const [loading, setLoading] = useState(true);

 // let classeSection = localStorage.getItem("classeSection");

  useEffect(() => {
    const getCourses = async () => {
      try {
        const coursesRes = Axios.get("http://alphaskool.tn/api/courses");
        setCoures((await coursesRes).data.data);
        setLoading(false);
      } catch (err) {
        err && setError(err);
        setLoading(false);
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
   
   <div><Breadcrumb style={{ marginTop: 20,justifyContent: "flexStart" ,display: "flex"}}>
       <Breadcrumb.Item> <h2>Mes cours</h2></Breadcrumb.Item>
        
      </Breadcrumb>

     {loading ? <Progress/> :
          coures.length === 0 ? <img src={emptyImg} className={classes.svg} /> : (

       <>
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
      </>
     )}
      
    </div>
  );
};

export default Content;
