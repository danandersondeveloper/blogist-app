import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

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
import Blogs from "./Admin/Pages/Blogs/Blogs";
import CreateBlog from "./Admin/Pages/Blogs/CreateBlog";
import Users from "./Admin/Pages/Users/Users";
import UpdateUser from "./Admin/Pages/Users/UpdateUser";
import CreateUser from "./Admin/Pages/Users/CreateUser";

function App() {

  const [ auth, setAuth ] = useState();

  useEffect(() => {
    axios.get('http://localhost:9000/auth', { withCredentials: true })
    .then(response => {
      if (response.data.message.loggedIn) {
        sessionStorage.setItem("auth", "true");
        setAuth(true);
      };
    });
  }, []);

  return (
      <AuthContext.Provider value={[auth, setAuth]}>
        <Routes>

          {/* Public routes - Anyone can view thes routes */}

          <Route element={ <Public /> }>
            <Route path="/">
              <Route index  element={ <Home /> } />
              <Route path="login" element={ <Login /> } />
              <Route path="register" element={ <Register /> } />
            </Route>
          </Route>

          {/* Private routes - User needs to be logged in to view */}

          <Route element={ <Private /> }>
            <Route path="dashboard">
              <Route index element={ <Dashboard /> } />

              <Route path="blogs">
                <Route index element={ <Blogs /> } />
                <Route path="create" element={ <CreateBlog /> } />
              </Route>


              <Route path="users">
                <Route index element={ <Users /> } />
                <Route path="create" element={ <CreateUser /> } />
                <Route path="update/:id" element={ <UpdateUser /> } />
              </Route>
            </Route>
          </Route>

          {/* $404 Error Catch */}

          <Route path="*" element={ <Error /> } />

        </Routes>
      </AuthContext.Provider>
  );
}

export default App;
