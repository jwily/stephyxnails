import React, { createContext, useContext, useReducer, useRef ,useState } from "react";

const OrderContext = createContext();


export const OrderProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const scrollToOrder = useRef()
  const scrollToAbout = useRef()
  const scrollToGallery = useRef()
  const scrollToFAQ = useRef()

  const initialState = {
    orderData: {},
  };

  const reducer = (state, action) => {
    return state;
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <OrderContext.Provider value={{ state, dispatch, name, setName, email, setEmail, instagram, setInstagram, scrollToAbout, scrollToFAQ, scrollToGallery, scrollToOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  return useContext(OrderContext);
};
