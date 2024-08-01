import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Order from "./components/order/Order";
import { Provider } from "react-redux";
import store from "./store.js";
import Main from "./components/main/Main";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/order" element={<Order />}></Route>
      </Routes>
    </Router>
  </Provider>
);
