import React, { useState, useContext, useEffect } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import UserContext from "../context/userContext";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { blue } from "@material-ui/core/colors";
import main from "../media/login.svg";
import { Alert } from 'antd';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    maxWidth: "90%", // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  mainImg: {
    maxWidth: "80%",
  },
  root: {
    display: "flex",
    alignItems: "center",
    marginTop: "10%",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: blue[500],
    "&:hover": {
      backgroundColor: blue[700],
    },
  },
  fabProgress: {
    color: blue[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: blue[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  const [values, setValues] = useState({});
  const history = useHistory();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        "http://37.59.204.215:8080/api/login",
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
        isAuth: true,
        role: loginRes.data.user.role,
        classe: loginRes.data.user.classe,
        section: loginRes.data.user.section,
      });

      localStorage.setItem("token", loginRes.data.token);
      let classeSection =
        loginRes.data.user.classe + loginRes.data.user.section;
      localStorage.setItem("classeSection", classeSection);

      {
        loginRes.data.user.role === "0"
          ? history.push("/gestioneleves")
          : history.push("/courses");
      }
    } catch (err) {
      setLoading(false);
      err.response.data.msg && setError(err.response.data.msg);
    }
  };


  const onClose = (e) => {
    setError(null)
  };

  return (
    <div className={classes.root}>
      <Grid item container alignItems="center" justify="center">
        <Grid item xs={10} sm={6}>
          
          {error && (
             <Alert style={{marginTop:20 ,maxWidth:550}}
             message="Formulaire invalide"
             description={error}
             type="error"
             showIcon
             onClose={onClose}
             closable
           />
          )}
          <form className={classes.form} onSubmit={submit} noValidate>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              autoFocus
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}
            />
            {/*<FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="filled"
          >
             <InputLabel htmlFor="filled-adornment-password">
              Mot de passe
              <FilledInput
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                autoComplete="current-password"
                id="filled-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </InputLabel>
              </FormControl>*/}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={classes.wrapper}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading}
              >
                Sign In
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
            <Link href="signup" variant="body2">
              {"Vous n'avez pas de compte?"}
            </Link>
          </form>
        </Grid>
        <Grid item xs={10} sm={6}>
          <img className={classes.mainImg} src={main}></img>
        </Grid>
      </Grid>
    </div>
  );
}
