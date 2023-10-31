import { useState, useEffect } from "react";
import ReviewOrderPage from "../ReviewOrderPage";
import { OrderProvider } from "../../context/OrderContext";
import OrderDetails from "../OrderDetails";
import OrderSetForm from "../OrderSetForm/SetOrderRoute"

function OrderPage() {

  return (
      <OrderProvider>
        <h1>🌸Custom Nail Form🌸</h1>
        <OrderDetails />
        {/* <OrderSetForm />
        <ReviewOrderPage /> */}
      </OrderProvider>
  )
}

export default OrderPage;
