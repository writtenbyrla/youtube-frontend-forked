import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from "./router";
import "./assets/reset.css";
import { Provider } from "react-redux";
import rootReducer from "./store";
import { legacy_createStore as createStore } from "redux";

const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={Router} />
  </Provider>
);
