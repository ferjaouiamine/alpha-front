import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import UserContext from "../context/userContext";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import VpnKeyRoundedIcon from "@material-ui/icons/VpnKeyRounded";
import AddCircleOutlineRounded from "@material-ui/icons/AddCircleOutlineRounded";
import MenuBookRoundedIcon from "@material-ui/icons/MenuBookRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import FaceSharpIcon from "@material-ui/icons/FaceSharp";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function NavBar() {
  const history = useHistory();
  const classes = useStyles();
  const { userData, setUserData } = useContext(UserContext);
  localStorage.setItem("isAuth", userData.isAuth);
  /*localStorage.setItem("admin", userData.user.admin);
  localStorage.setItem("role", userData.role);*/

  const logout = () => {
    setUserData({
      isAuth: false,
      token: undefined,
      user: undefined,
    });
    localStorage.clear();
    history.push("/signin");
  };

  useEffect(() => {
    const onChargeNavBar = () => {
      if (userData.isAuth === false) {
        return (
          <>
            <Button
              startIcon={<HomeRoundedIcon style={{ fill: "white" }} />}
              className={classes.button}
            >
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                ACCUEIL
              </Link>
            </Button>
            <Button
              startIcon={<VpnKeyRoundedIcon style={{ fill: "white" }} />}
              className={classes.button}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/signin"
              >
                LOGIN
              </Link>
            </Button>
            <Button
              startIcon={<AddCircleOutlineRounded style={{ fill: "white" }} />}
              className={classes.button}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/signup"
              >
                INSCRIPTION
              </Link>
            </Button>
          </>
        );
      }
    };

    const onChargeNavBarAuth = () => {
      if (
        userData.role === "0" &&
        userData.user.admin === true &&
        userData.isAuth
      ) {
        return (
          <>
            <Button>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/gestioneleves"
              >
                Gestion des éleves
              </Link>
            </Button>
            <Button>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/gestioncours"
              >
                Gestion des cours
              </Link>
            </Button>
            <Button
              startIcon={<PersonRoundedIcon style={{ fill: "white" }} />}
              className={classes.button}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/gestionprofs"
              >
                Gestion des profs
              </Link>
            </Button>
            <Button
              onClick={logout}
              startIcon={<ExitToAppRoundedIcon style={{ fill: "white" }} />}
              className={classes.button}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/signin"
              >
                DECONNEXION
              </Link>
            </Button>
          </>
        );
      }
    };

    const onChargeNavBarStudent = () => {
      if (userData.role === "1") {
        return (
          <>
            <Button
              startIcon={<MenuBookRoundedIcon style={{ fill: "white" }} />}
              className={classes.button}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/courses"
              >
                Mes cours
              </Link>
            </Button>

            <Button
              onClick={logout}
              startIcon={<ExitToAppRoundedIcon style={{ fill: "white" }} />}
              className={classes.button}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/signin"
              >
                DECONNEXION
              </Link>
            </Button>
          </>
        );
      }
    };

    const onChangeNavBarProf = () => {
      if (userData.role === "0") {
        return (
          <>
            <Button
              startIcon={<FaceSharpIcon style={{ fill: "white" }} />}
              className={classes.button}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/gestioneleves"
              >
                Gestion des éleves
              </Link>
            </Button>
            <Button
              startIcon={<MenuBookRoundedIcon style={{ fill: "white" }} />}
              className={classes.button}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/gestioncours"
              >
                Gestion des cours
              </Link>
            </Button>
            <Button
              onClick={logout}
              startIcon={<ExitToAppRoundedIcon style={{ fill: "white" }} />}
              className={classes.button}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/signin"
              >
                DECONNEXION
              </Link>
            </Button>
          </>
        );
      }
    };

    onChargeNavBar();
    onChangeNavBarProf();
    onChargeNavBarAuth();
    onChargeNavBarStudent();
  }, []);

  const onChargeNavBar = () => {
    if (userData.isAuth === false) {
      return (
        <>
          <Button
            startIcon={<HomeRoundedIcon style={{ fill: "white" }} />}
            className={classes.button}
          >
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              ACCUEIL
            </Link>
          </Button>
          <Button
            startIcon={<VpnKeyRoundedIcon style={{ fill: "white" }} />}
            className={classes.button}
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/signin"
            >
              LOGIN
            </Link>
          </Button>
          <Button
            startIcon={<AddCircleOutlineRounded style={{ fill: "white" }} />}
            className={classes.button}
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/signup"
            >
              INSCRIPTION
            </Link>
          </Button>
        </>
      );
    } else if (
      userData.role === "0" &&
      userData.user.admin === true &&
      userData.isAuth
    ) {
      return (
        <>
          <Button
            startIcon={<FaceSharpIcon style={{ fill: "white" }} />}
            className={classes.button}
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/gestioneleves"
            >
              Gestion des éleves
            </Link>
          </Button>
          <Button
            startIcon={<MenuBookRoundedIcon style={{ fill: "white" }} />}
            className={classes.button}
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/gestioncours"
            >
              Gestion des cours
            </Link>
          </Button>
          <Button
            startIcon={<PersonRoundedIcon style={{ fill: "white" }} />}
            className={classes.button}
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/gestionprofs"
            >
              Gestion des profs
            </Link>
          </Button>
          <Button
            onClick={logout}
            startIcon={<ExitToAppRoundedIcon style={{ fill: "white" }} />}
            className={classes.button}
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/signin"
            >
              DECONNEXION
            </Link>
          </Button>
        </>
      );
    } else if (userData.role === "0") {
      return (
        <>
          <Button
            startIcon={<FaceSharpIcon style={{ fill: "white" }} />}
            className={classes.button}
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/gestioneleves"
            >
              Gestion des éleves
            </Link>
          </Button>
          <Button
            startIcon={<MenuBookRoundedIcon style={{ fill: "white" }} />}
            className={classes.button}
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/gestioncours"
            >
              Gestion des cours
            </Link>
          </Button>
          <Button
            onClick={logout}
            startIcon={<ExitToAppRoundedIcon style={{ fill: "white" }} />}
            className={classes.button}
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/signin"
            >
              DECONNEXION
            </Link>
          </Button>
        </>
      );
    } else if (userData.role === "1") {
      return (
        <>
          {}
          <Button
            startIcon={<MenuBookRoundedIcon style={{ fill: "white" }} />}
            className={classes.button}
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/courses"
            >
              Mes cours
            </Link>
          </Button>

          <Button
            onClick={logout}
            startIcon={<ExitToAppRoundedIcon style={{ fill: "white" }} />}
            className={classes.button}
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/signin"
            >
              DECONNEXION
            </Link>
          </Button>
        </>
      );
    }
  };
  return (
    <div className={classes.root}>
      <Grid container direction="column">
        <Grid item>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}></Typography>
              <div style={{ marginRight: 220 }}>{onChargeNavBar()}</div>
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
    </div>
  );
}
