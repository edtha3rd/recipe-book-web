import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import { User, UserContext } from "../components/UserContext";

import Home from "./home";
import Login from "./login";
import NewRecipe from "./newrecipe";
import Profile from "./profile";

type GetLoginResponse = {
  data: User[];
};

const Index = () => {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const getUser = () => {
      axios
        .get<GetLoginResponse>("http://localhost:8008/auth/login/success", {
          withCredentials: true,
        })
        //check response object
        .then((response: AxiosResponse) => {
          if (response.status === 200) {
            return response.data.user;
          }
          throw new Error("authentication failed");
        })
        //add user state
        .then((resObject: User) => {
          setUser(resObject);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getUser();
  }, []);

  return (
    <HashRouter>
      <UserContext.Provider value={user}>
        <Layout user={user}>
          <Routes>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            ></Route>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/newrecipe"
              element={user ? <NewRecipe /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" />}
            ></Route>
          </Routes>
        </Layout>
      </UserContext.Provider>
    </HashRouter>
  );
};

export default Index;
