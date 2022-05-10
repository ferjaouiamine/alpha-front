import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import main from "../media/main.svg";
// import { Link } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';
import Button from "@material-ui/core/Button";
import Abouus from "./Abouus";
import Sliderone from "./Sliderone"
import Contact from "./Contact";
import Comments from "./Comments";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";



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
    maxWidth: "90%",
  },
  
}));

export default function Landing() {
  const classes = useStyles();

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
    <Box position={"fixed"} alignItems={"flex-end"}     cursor={"pointer"}
    fontSize={"10px"}
 height={"44px"}
    justifyContent={"center"}
    paddingBottom={"10px"}
    boxSizing={"border-box"}
  
  right={"16px"}    width={"44px"} backgroundColor={"#3f51b5"} rounded={"md"} >
      <Link to ="#nav" >
       <ArrowUpIcon color={"white"} w={8} h={4}   /><Text color={"white"}>Top</Text>
           
       
         </Link>
         </Box>
      <Sliderone/>


  
    <div className={classes.root}>
  
      <Grid item container alignItems="center" justify="center">
        
        <Grid item xs={10} sm={6}>
          
          <div  > 
            <h1>Bienvenue sur notre plateforme</h1>
            <h2>Commencer votre cours en ligne maintenant</h2>
            <h2>Vous pouvez maintenant faire une</h2><br/>
              <Button type="primary" variant="contained" color="primary">
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/signup"
                >
                  Inscription élève
                </Link>
              </Button>

            <div  style={{marginTop : 15}}> 
              <h3>Si vous êtes un(e) enseignant(e), vous pouvez aussi faire une </h3> <br/>
              <Button type="primary" color="primary" variant="contained">
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/signupProf"
                >
                  Inscription enseignant(e)
                </Link>
              </Button>
            </div>
          </div>
          <div style={{marginTop : 15 }}>
            <h3>Si vous avez un compte, vous pouvez alors </h3><br/>
            <Button type="primary" color="primary" variant="contained">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/signin"
              >
                Se connecter
              </Link>
            </Button>
            
          </div>
          
        </Grid>
        
        <Grid item xs={10} sm={6}>
          <img className={classes.mainImg} src={main}/>
        </Grid>


      </Grid>
      <Abouus />
    <Contact/>
    <Comments/>
    </div>

    </>
  );
}
