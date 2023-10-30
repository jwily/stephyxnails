import React, { createContext, useContext, useReducer, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');

  const [formData, setFormData] = useState({
    tier: '',
    shape: '',
    photo: '',
    description: '',
    extra: '',
  });

  const [formDataSets, setFormDataSets] = useState([]);
  const [currentDataSet, setCurrentDataSet] = useState({});

  const updateFormData = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const saveCurrentDataSet = () => {
    setFormDataSets([...formDataSets, formData]);
  };

  const clearForm = () => {
    setCurrentDataSet({}); // Reset the current data set
    setFormData({  // Clear the form fields
      tier: '',
      shape: '',
      photo: '',
      description: '',
      extra: '',
    });
  };

  const initialState = {
    orderData: {},
  };

  const reducer = (state, action) => {
    return state;
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <OrderContext.Provider value={{ state, dispatch, name, setName, email, setEmail, instagram, setInstagram, formData, updateFormData, formDataSets, saveCurrentDataSet, currentDataSet, clearForm, formData  }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  return useContext(OrderContext);
};
