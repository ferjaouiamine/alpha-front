import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },

  media: {
    margin: "auto",
    display: "block",
    height: 80,
    width: 80,
  },

  cardStyle: {},
}));

const CourseCard = (params) => {
  const classes = useStyles();
  const [coures, setCoures] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const getCourses = async () => {
      try {
        const coursesRes = await Axios.get("http://localhost:3001/api/courses");
        setCoures((await coursesRes).data.data);
        
      } catch (err) {
        err && setError(err);
      }
    };
    getCourses();
  }, []);

  const {
    courseName,
    svgUrl,
  } = params;
  return (

    <Card style={{ marginTop: "20%" }} >
      <CardHeader title={courseName} />
      <CardMedia
        className={classes.media}
        image={svgUrl}
        title="Contemplative Reptile"
      />
      <CardActions>
        <Link
          to={{
            pathname: `/chaptires/${courseName}`,
            state: {
              data: coures,
            },
          }}
          style={{ textDecoration: "none" }}
        >
          <Button color="primary">Afficher le cours</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
