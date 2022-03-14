import React, {Fragment} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from './routes';
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from '../src/context/AuthContext'
import 'materialize-css';
import {Navbar} from "./components/Navbar";
import {Loading} from "./components/Loading";

function App() {
    const {login, logout, token, userId, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
    if (!ready) {
        return <Loading />
    }
  return (
      <AuthContext.Provider value={{
          login, logout, token, userId, isAuthenticated
      }}>
          <Router>
              {isAuthenticated && <Navbar />}
              <Fragment>
                  <div className={"container"}>
                      {routes}
                  </div>
              </Fragment>
          </Router>
      </AuthContext.Provider>


  );
}

export default App;
