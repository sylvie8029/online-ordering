import { ApolloClient, ApolloProvider, InMemoryCache, useMutation } from "@apollo/client";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, CookerPage, Listing, Listings, NotFound, User, LoginPage, AppHeader } from "./components";
import { Layout } from "antd";
import { Register } from "./lib/types";
import { LOG_IN } from "./lib/graphql/mutations/LogIn";
import { LogIn as LogInData, LogInVariables } from "./lib/graphql/mutations/LogIn/__generated__/LogIn";

import { Affix } from "antd";

const initialRegister: Register = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

const client = new ApolloClient({ uri: "/api", cache: new InMemoryCache() });
const App = () => {
  const [register, setRegister] = useState<Register>(initialRegister);
  console.log(`register:`, register);

  const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        setRegister(data.logIn);
      }
    },
  });

  const logInRef = useRef(logIn);
  useEffect(() => {
    logInRef.current();
  }, []);

  return (
    <Router>
      <Layout id="app">
        <Affix offsetTop={0} className="app__affix-header">
          <AppHeader register={register} setRegister={setRegister} />
        </Affix>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/cooker" element={<CookerPage />}></Route>
          <Route path="/listing/:id" element={<Listing />}></Route>
          {/* <Route path="/listings/:location" element={<Listings />}></Route> */}
          <Route path="/login" element={<LoginPage setRegister={setRegister} />}></Route>
          <Route path="/user/:id" element={<User />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Layout>
    </Router>
  );
};
ReactDOM.render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <App />
    {/* <Listings dishName="product List"></Listings> */}
  </ApolloProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
