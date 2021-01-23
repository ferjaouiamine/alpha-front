import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import main from "../media/main.svg";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 50,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  mainImg: {
    maxWidth: "100%",
  },
  textBlock: {
    marginTop: 50,
  },
}));

export default function Landing() {
  const classes = useStyles();

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className={classes.root}>
      <Grid item container alignItems="center" justify="center">
        <Grid item xs={10} sm={6}>
          <div className="textBlock">
            <h1>Bienvenue sur notre plateforme</h1>
            <h4>Commencer votre cours en ligne maintenant</h4>
            <h4>en créent un compte en cliquant sur ce button</h4>
            <Button type="primary" variant="contained" color="primary">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/signup"
              >
                Inscription élève
              </Link>
            </Button>

            <div className="textBlock">
              <h4>vous être un professeur ?</h4>
              <Button type="primary" color="primary" variant="contained">
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/signupProf"
                >
                  Inscription professeur
                </Link>
              </Button>
            </div>
          </div>
          <div className="textBlock">
            <h4>Vous avez un compte ?</h4>
            <Button type="primary" color="primary" variant="contained">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/signin"
              >
                Login
              </Link>
            </Button>
          </div>
        </Grid>
        <Grid item xs={10} sm={6}>
          <img className={classes.mainImg} src={main}></img>
        </Grid>
      </Grid>
    </div>
  );
}
