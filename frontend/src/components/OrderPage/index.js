import { useState, useEffect } from "react";
import ReviewOrderPage from "../ReviewOrderPage";

function OrderPage() {

  const data = createContext({})

  return (

    <data.Provider>
        <div>
          <h1>🌸Custom Nail Form🌸</h1>
        </div>
        <OrderDetails />
        <SetPage />
        <ReviewOrderPage />
    </data.Provider>

  )
}

export default OrderPage;
