import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";


import TierForm from "./components/OrderSetForm/TierForm"
import { OrderProvider } from "./context/OrderContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <OrderProvider>

      <App />
    </OrderProvider>
  </React.StrictMode>
);

reportWebVitals();
