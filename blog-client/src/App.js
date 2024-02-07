import { useState } from "react";
import { Route, Routes } from "react-router-dom";

//Context imports
import { AuthContext } from "./Contexts/AuthContext";


// Layouts routes / pages

import Public from "./Layouts/Public";
import Private from "./Layouts/Private"


// Public routes / pages

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Error from "./Pages/Error";


// Private routes / pages 

import Dashboard from "./Admin/Dashboard";
import Blogs from "./Admin/Pages/Blogs";
import Users from "./Admin/Pages/Users";

function App() {

  const [auth, setAuth] = useState();

  return (
    <>
      <Routes>

        {/* Public routes - Anyone can view thes routes */}

        <Route element={ <AuthContext.Provider value={[ auth, setAuth ]}><Public /></AuthContext.Provider> }>
          <Route path="/">
            <Route index  element={ <Home /> } />
            <Route path="login" element={ <Login /> } />
            <Route path="register" element={ <Register /> } />
          </Route>
        </Route>

        {/* Private routes - User needs to be logged in to view */}

        <Route element={ <AuthContext.Provider value={[ auth, setAuth ]}><Private /></AuthContext.Provider> }>
          <Route path="dashboard">
            <Route index element={ <Dashboard /> } />
            <Route path="blogs" element={ <Blogs /> } />
            <Route path="users" element={ <Users /> } />
          </Route>
        </Route>

        {/* $404 Error Catch */}

        <Route path="*" element={ <Error /> } />

      </Routes>
    </>
  );
}

export default App;
