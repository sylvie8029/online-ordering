import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import reportWebVitals from "./reportWebVitals";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Listings } from "./components";

const client = new ApolloClient({ uri: "/api", cache: new InMemoryCache() });
// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* <Route path="/" element={<Home />}></Route>
//         <Route path="/host" element={<Host />}></Route>
//         <Route path="/listing/:id" element={<Listing />}></Route> */}
//         <Route path="/listings/:location" element={<Listings />}></Route>
//         {/* <Route path="/login" element={<Login />}></Route>
//         <Route path="/user/:id" element={<User />}></Route>
//         <Route path="*" element={<NotFound />}></Route> */}
//       </Routes>
//     </Router>
//   );
// };
ReactDOM.render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <Listings productName="product List"></Listings>
  </ApolloProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
