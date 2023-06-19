import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Layout from "./pages/Layout";
import PageNotFound from "./pages/PageNotFound";
export default function App() {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const [token, setToken] = useState("");
  const client = new ApolloClient({
    uri: `${baseURL}/graphql`,
    cache: new InMemoryCache()
  });
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
   
    if (loggedInUser) {
      console.log("USER ", loggedInUser);
      setToken(loggedInUser);
    }
  }, []);

  useEffect(() => {
    console.log("TOKEN ", token);
  }, [token]);
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          {/* <Route
            exact
            path=""
            element={token ? <Home /> : <Navigate replace to={"/signin"} />}
          ></Route> */}
          <Route
            exact
            path=""
            element={<Home />}
          ></Route>
          <Route exact path="signup" element={<SignUp />}></Route>
          <Route exact path="signin" element={<SignIn />}></Route>
          <Route exact path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}
