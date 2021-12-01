// import { ExcerciseCard } from "./components/excerciseCard/ExcerciseCard";
// import { RoutineCard } from "./components/routineCard/RoutineCard";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './app.scss'
import { Login } from "./pages/login/Login";
import { NewExcercise } from "./pages/newExcercise/NewExcercise";
import { NewRoutine } from "./pages/newRoutine/NewRoutine";
import { Routines } from "./pages/routines/Routines";
import { RoutineView } from "./pages/routineView/RoutineView";
import { UserContext } from "./context/UserContext";
import { Register } from "./pages/register/Register";
function App() {


  const localStorageUser = localStorage.getItem("user");
  const [contextUserInfo, setContextUserInfo] = useState({
    userId: null,
    username: null,
    acessToken: null,
    refreshtoken: null
  })



  return (
    <div className="app">
      <UserContext.Provider value={{ contextUserInfo, setContextUserInfo }}>




        <Router>

          {!localStorageUser ?


            <Switch>

           
              <Route path="/login">
                <Login />
              </Route>

              <Route path="/register">
                <Register />
              </Route>
              
              <Route  path="/">
                <Login />
              </Route>

            </Switch>



            :
            <Switch>

              <Route exact path="/">
                <Routines />
              </Route>

              <Route path="/login">
                <Routines />
              </Route>

              <Route path="/register">
                <Routines />
              </Route>


              <Route exact path="/routines">
                <Routines />
              </Route>

              <Route exact path="/home">

                <Routines />
              </Route>


              <Route path="/new_routine">
                <NewRoutine />
              </Route>


              <Route path="/routine_view/:id">
                <RoutineView />
              </Route>

              <Route path="/new_excercise">

                <NewExcercise />
              </Route>

              <Route path="/login">

                <Login />
              </Route>

              <Route path="/register">

                <Register />
              </Route>


            </Switch>
          }


        </Router>
      </UserContext.Provider>

    </div>
  )
}

export default App;
