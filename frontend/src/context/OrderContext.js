import React, { createContext, useContext, useReducer, useState } from "react";

const OrderContext = createContext();


export const OrderProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [tier, setTier] = useState('');
  const [shape, setShape] = useState('');
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');
  const [extra, setExtra] = useState('');


  const initialState = {
    orderData: {},
  };

  const reducer = (state, action) => {
    return state;
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <OrderContext.Provider value={{ state, dispatch, name, setName, email, setEmail, instagram, setInstagram, tier, setTier, shape, setShape, photo, setPhoto, description, setDescription, extra, setExtra }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  return useContext(OrderContext);
};
