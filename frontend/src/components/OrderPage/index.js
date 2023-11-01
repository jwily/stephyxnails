import { useState, useEffect } from "react";
import ReviewOrderPage from "../ReviewOrderPage";
import { OrderProvider } from "../../context/OrderContext";
import SetPage from "../SetPage";
import OrderDetails from "../OrderDetails";

function OrderPage() {


  return (
      <OrderProvider>
        <OrderDetails />
      </OrderProvider>
  )
}

export default OrderPage;
