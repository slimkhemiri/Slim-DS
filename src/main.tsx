import React from "react";
import ReactDOM from "react-dom/client";

import { defineCustomElements } from "@slimkhemiri/react-design-system";
import { App } from "./App";
import "./styles.css";

defineCustomElements();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

