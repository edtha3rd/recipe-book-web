import { useState } from "react";
import { useQuery } from "react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { checkUser } from "../api/user";
import Layout from "../components/Layout";
import { User } from "../components/UserContext";
import Home from "./home";

import Login from "./login";
import NewRecipe from "./newrecipe";
import Profile from "./profile";

const Index = () => {
  const [user, setUser] = useState<User | undefined>();
  // const [cookies, setCookies] = useCookies();
  // console.log(cookies);

  const { isLoading, error, data: User } = useQuery("getUser", checkUser);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  if (!User) {
    return (
      <HashRouter>
        <Layout user={User}>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </HashRouter>
    );
  }

  return (
    <HashRouter>
      <Layout user={User}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/newrecipe" element={<NewRecipe />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default Index;
