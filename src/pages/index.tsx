import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import { User } from "../components/UserContext";
import Home from "./home";

import Login from "./login";
import NewRecipe from "./newrecipe";
import Profile from "./profile";

type GetLoginResponse = {
  data: User[];
};

const Index = () => {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState<boolean | void>();
  // const [cookies, setCookies] = useCookies();
  // console.log(cookies);

  useEffect(() => {
    const getUser = () => {
      let userObj = axios
        .get<GetLoginResponse>(
          `${process.env.REACT_APP_API_URI}/auth/login/success`,
          {
            withCredentials: true,
            headers {
            Access-Control-Allow-Origin: *
          }

          }
        )
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
          setLoading(false);
          return resObject;
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.message);
        });

      return userObj;
    };
    getUser();
  }, []);

  return (
    <HashRouter>
      <Layout user={user}>
        <Routes>
          <Route
            path="/login"
            element={
              loading ? <Loading /> : !user ? <Login /> : <Navigate to="/" />
            }
          ></Route>
          <Route
            path="/"
            element={
              loading ? (
                <Loading />
              ) : !user ? (
                <Navigate to="/login" />
              ) : (
                <Home />
              )
            }
          ></Route>
          <Route
            path="/newrecipe"
            element={
              loading ? (
                <Loading />
              ) : user ? (
                <NewRecipe />
              ) : (
                <Navigate to="/login" />
              )
            }
          ></Route>
          <Route
            path="/profile"
            element={
              loading ? (
                <Loading />
              ) : user ? (
                <Profile />
              ) : (
                <Navigate to="/login" />
              )
            }
          ></Route>
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default Index;
