import { useState, useEffect } from "react";
import ReviewOrderPage from "../ReviewOrderPage";
import { OrderProvider } from "./context/OrderContext";
import SetPage from "../SetPage";
import OrderDetails from "../OrderDetails";

function OrderPage() {


  return (

        <div>
          <h1>🌸Custom Nail Form🌸</h1>
        <ReviewOrderPage />

        </div>
  )
}

export default OrderPage;
