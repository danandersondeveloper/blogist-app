
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";


// Context imports

import { AuthContext } from "./Contexts/AuthContext";
import { UserContext } from "./Contexts/UserContext";


// Layouts routes / pages

import Public from "./Layouts/Public";
import Private from "./Layouts/Private"


// Public routes / pages

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Account from "./Pages/Account";
import Blog from "./Pages/Blog";
import Error from "./Pages/Error";


// Private routes / pages 

import Dashboard from "./Admin/Dashboard";
import Settings from "./Admin/Pages/Settings/Settings";
import Blogs from "./Admin/Pages/Blogs/Blogs";
import CreateBlog from "./Admin/Pages/Blogs/CreateBlog";
import UpdateBlog from "./Admin/Pages/Blogs/UpdateBlog";
import Users from "./Admin/Pages/Users/Users";
import UpdateUser from "./Admin/Pages/Users/UpdateUser";
import CreateUser from "./Admin/Pages/Users/CreateUser";

// Services
import { auth } from "./Services/AuthServices";

function App() {

  const [ AUTH, setAUTH ] = useState(Object);

  useEffect(() => {
    (async () => {
      const response = await auth();
      setAUTH(response);
    })()
  }, [])

  return (
      <AuthContext.Provider value={[ AUTH, setAUTH ]}>
          <Routes>

            {/* Public routes - Anyone can view thes routes */}

            <Route element={ <Public /> }>
              <Route path="/">
                <Route index  element={ <Home /> } />
                <Route path="login" element={ <Login /> } />
                <Route path="register" element={ <Register /> } />
                <Route path="account" element={ <Account /> } />
                <Route path="blog/:id" element={ <Blog /> } />
              </Route>
            </Route>

            {/* Private routes - User needs to be logged in to view */}

            <Route element={ <Private /> }>
              <Route path="dashboard">
                <Route index element={ <Dashboard /> } />
                <Route path="settings" element={ <Settings /> } />
                <Route path="blogs">
                  <Route index element={ <Blogs /> } />
                  <Route path="create" element={ <CreateBlog /> } />
                  <Route path="update/:id" element={ <UpdateBlog /> } />
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
