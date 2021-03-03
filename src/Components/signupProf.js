import React, { useState, useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "../css/Signup.css";
import "antd/dist/antd.css";
import "date-fns";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import UserContext from "../context/userContext";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import "../css/errorNotice.css";
/*
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.smartify.tn/">
        Smartify
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}*/

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
    maxWidth: "60%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SignupProf() {
  const classes = useStyles();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [birthdayDate, setBirthdayDate] = useState();
  const [phone, setPhone] = useState();
  const [matiere, setMatiere] = useState();
  const [highSchool, setHightSchool] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        firstName,
        lastName,
        email,
        birthdayDate,
        phone,
        highSchool,
        matiere,
        password,
        passwordCheck,
      };
      console.log(newUser);
      const registerRes = await Axios.post(
        "http://37.59.204.215/api/prof/createProf",
        newUser
      );
      console.log(registerRes);
      history.push("/signin");
      setUserData({ userInfo: newUser });
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
      console.log(err.response.data.msg);
    }
  };

  return (
    <Container component="main">
      <CssBaseline />
      <Grid container direction="row" spacing={5}>
        <Grid item xs justify="flex-start" alignItems="center">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            {error && (
              <div className="error-notice">
                <span>{error}</span>
                <button onClick={() => setError(undefined)}>X</button>
              </div>
            )}
            <form className={classes.form} onSubmit={submit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="Nom"
                    autoFocus
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="prénom"
                    name="lastName"
                    autoComplete="lname"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
{/*
                <Grid item xs={12}>
                  <TextField
                    id="date"
                    label="Data de naissance"
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setBirthdayDate(e.target.value)}
                  />
                </Grid>
*/}
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Matiére
                    </InputLabel>
                    <Select
                      native
                      onChange={(e) => setMatiere(e.target.value)}
                      label="Matière"
                      inputProps={{
                        name: "matiere",
                        id: "outlined-age-native-simple",
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value="math">Math</option>
                      <option value="physique">Physique & Chimie</option>
                      <option value="DB">Base de donnée</option>
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
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="phone"
                    label=" numéro de téléphone"
                    name="phone"
                    autoComplete="phone"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="highSchool"
                    label="lycée"
                    name="highSchool"
                    autoComplete="highSchool"
                    onChange={(e) => setHightSchool(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="mot de passe"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirm_password"
                    label="confirmer le mot de passe"
                    type="password"
                    id="confirm_password"
                    autoComplete="current-password"
                    onChange={(e) => setPasswordCheck(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                //href="/courses"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2">
                    Vous avez déjà un compte? se connecter
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
