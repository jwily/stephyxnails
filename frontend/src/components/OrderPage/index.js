import { useState, useEffect } from "react";
import ReviewOrderPage from "../ReviewOrderPage";
import { OrderProvider } from "../../context/OrderContext";
import OrderDetails from "../OrderDetails";
import OrderSetForm from "../OrderSetForm/SetOrderRoute"

function OrderPage() {

  return (
      <OrderProvider>
        <OrderDetails />
        {/* <OrderSetForm />
        <ReviewOrderPage /> */}
      </OrderProvider>
  )
}

export default OrderPage;
