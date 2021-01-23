import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./Components/Navbar";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import SignupProf from "./Components/signupProf";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./Components/Landing";
import Courses from "./Components/courses";
import CoursePage from "./Components/coursePage";
import CoursesByChapter from "./Components/coursesByChapter";
import { Grid } from "@material-ui/core";
import GestionEleves from "./Components/gestionEleves";
import GestionProfs from "./Components/gestionProfs";
import GestionCours from "./Components/gestionCours";
import UserContext from "./context/userContext";
import Axios from "axios";
import AddCourse from "./Components/addCourse";
import UpdateCourse from "./Components/updateCourse";

const App = () => {
  const [userData, setUserData] = useState({});

  useEffect(
    () => {
      const checkLoggedIn = async () => {
        let token = localStorage.getItem("token");

        if (token === null) {
          localStorage.clear();
          // history.push("/signin");
        }
        /*const tokenRes = await Axios.post(
          "https://alpha-school.herokuapp.com/api/checkToken",
          null,
          {
            headers: { token: token },
          }
        );
        console.log(tokenRes);
        if (tokenRes.data) {*/
        const userRes = await Axios.get("http://localhost:3001/api/userById", {
          headers: { token: token },
        });
        setUserData({
          token,
          role: userRes.data.role,
          user: userRes.data.user,
          isAuth: userRes.data.auth,
        });
      };
      checkLoggedIn();
    },
    [],
    [userData]
  );

  return (
    <div className="App">
      <UserContext.Provider value={{ userData, setUserData }}>
        <Router>
          <Grid container direction="column">
            <Grid item>
              <NavBar />
            </Grid>
            <Grid item container>
              <Grid item xs={false} sm={2} />
              <Grid item xs={12} sm={8}>
                {userData.role === "0" ? (
                  <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/signupProf" component={SignupProf} />
                    <Route exact path="/courses" component={Courses} />

                    <Route
                      exact
                      path="/gestionCours"
                      component={GestionCours}
                    />
                    <Route
                      exact
                      path="/gestioneleves"
                      component={GestionEleves}
                    />
                    <Route
                      exact
                      path="/gestionProfs"
                      component={GestionProfs}
                    />
                    <Route exact path="/addCourse" component={AddCourse} />
                    <Route
                      exact
                      path="/updateCourse"
                      component={UpdateCourse}
                    />
                  </Switch>
                ) : (
                  <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/signupProf" component={SignupProf} />
                    <Route exact path="/courses" component={Courses} />
                    <Route
                      exact
                      path="/coursePage/:id"
                      component={CoursePage}
                    />
                    <Route
                      exact
                      path="/chaptires/:id"
                      component={CoursesByChapter}
                    />
                  </Switch>
                )}
              </Grid>
              <Grid item xs={false} sm={2}></Grid>
            </Grid>
          </Grid>
        </Router>
      </UserContext.Provider>
    </div>
  );
};

export default App;
