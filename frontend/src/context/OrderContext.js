import React, { createContext, useContext, useReducer } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const initialState = {
    orderData: {},
  };

  const reducer = (state, action) => {
    return state;
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  return useContext(OrderContext);
};
