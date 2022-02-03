import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, AuthorPage, Listing, Listings, NotFound, User, LoginPage, AppHeader } from "./components";
import { Layout } from "antd";
import { Register } from "./lib/types";

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
  return (
    <Router>
      <Affix offsetTop={1} className="app__affix-header">
        <AppHeader register={register} />
      </Affix>
      <Layout id="app">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/author" element={<AuthorPage />}></Route>
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
