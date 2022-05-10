import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { blue } from "@material-ui/core/colors";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Link from "@material-ui/core/Link";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Alert } from 'antd';
import "antd/dist/antd.css";
import Axios from "axios";
import "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/userContext";
import "../css/errorNotice.css";
import "../css/Signup.css";
import signup from "../media/signup.svg";
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
}
*/

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
  mainImg: {
    maxWidth: "60%",
  },
  form: {
    maxWidth: "80%", // Fix IE 11 issue.
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
    maxWidth: "90%",
  },
  root: {
    display: "flex",
    alignItems: "center",
    marginTop: "10%",
    marginBottom : "10%"
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

export default function SignUp() {
  const classes = useStyles();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [birthdayDate, setBirthdayDate] = useState();
  const [phone, setPhone] = useState();
  const [highSchool, setHightSchool] = useState();
  const [error, setError] = useState();
  const [classe, setClasse] = useState();
  const [loading, setLoading] = useState(false);

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newUser = {
        firstName,
        lastName,
        email,
        birthdayDate,
        phone,
        highSchool,
        classe,
        password,
        passwordCheck,
      };
      console.log(newUser);
      const registerRes = await Axios.post(
        "http://localhost:3001/api/student/register",
        newUser
      );
      console.log(registerRes);
      history.push("/signin");
      setUserData({ userInfo: newUser });
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
        <Grid item xs={10} sm={4}>
          {/*<Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
  </Typography>*/}
          {error && ( 
              <Alert style={{marginTop:20 ,maxWidth:500,marginBottom : 20}}
             message="Formulaire invalide"
             description={error}
             type="error"
             showIcon             
             closable
             onClose={onClose}
           />
            
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
                  label="Prénom"
                  name="lastName"
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
                  /* ref={register({
                      required: true,
                    })}*/
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Classe
                  </InputLabel>
                  <Select
                    native
                    onChange={(e) => setClasse(e.target.value)}
                    label="Classe"
                    inputProps={{
                      name: "age",
                      id: "outlined-age-native-simple",
                    }}
                  >
                    <option value="1">1 ère Secondaire</option>
                    <option value="2économie">2 ème économie et serivce</option>
                    <option value="2Informatique">2 ème Informatique</option>
                    <option value="2Science Exp">2 ème Scientifique </option>
                    <option value="3Informatique">3 ème Informatique</option>
                    <option value="3Mathématiques">3 ème Mathématiques</option>
                    <option value="3Science Exp">3 ème Science Exp</option>
                    <option value="3Techniques">3 ème Techniques</option>
                    <option value="4économie">Bac économie</option>
                    <option value="4Informatique">Bac Informatique</option>
                    <option value="4Lettre">Bac Lettre</option>
                    <option value="4mathématiques">Bac Mathématiques</option>
                    <option value="4Science Exp">Bac Science Exp</option>
                  </Select>
                </FormControl>
              </Grid>
{/*  
                <label>date de naissance :   </label>
              <Grid item xs={12}>
                <TextField
                  id="date"
                  
                  type="date"
                  
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setBirthdayDate(e.target.value)}
                />
              </Grid>
                */}
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="Numéro de téléphone"
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
                  label="Lycée"
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
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  /* ref={register({
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern: /^[A-Za-z]+$/i,
                    })}*/
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirmer le mot de passe"
                  type="password"
                  id="confirm_password"
                  autoComplete="current-password"
                  /* ref={register({
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern: /^[A-Za-z]+$/i,
                    })}*/
                  onChange={(e) => setPasswordCheck(e.target.value)}
                />
              </Grid>
            </Grid>
            <div className={classes.wrapper}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading}
              >
                S'inscrire'
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>

            <Link href="/signin" variant="body2">
              Vous avez déjà un compte? se connecter
            </Link>
          </form>
        </Grid>
        <Grid item xs={10} sm={6}>
          <img className={classes.mainImg} src={signup}></img>
        </Grid>
      </Grid>
    </div>
  );
}
