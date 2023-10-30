import { useState, useEffect } from "react";
import ReviewOrderPage from "../ReviewOrderPage";
import { OrderProvider } from "../../context/OrderContext";
import SetPage from "../SetPage";
import OrderDetails from "../OrderDetails";
import TierForm from "../OrderSetForm/TierForm";

function OrderPage() {


  return (
      <OrderProvider>
        <h1>🌸Custom Nail Form🌸</h1>
        <OrderDetails />
        <ReviewOrderPage />
      </OrderProvider>
  )
}

export default OrderPage;
