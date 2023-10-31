import React, { createContext, useContext, useReducer, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [formData, setFormData] = useState({
    tier: '',
    shape: '',
    photo: [],
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
    console.log("after save", formDataSets)
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
    name: '',
    email: '',
    instagram: '',
    formData: {
      tier: '',
      shape: '',
      photo: [],
      description: '',
      extra: '',
    },
    formDataSets: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_NAME':
        return { ...state, name: action.payload };
      case 'SET_EMAIL':
        return { ...state, email: action.payload };
      case 'SET_INSTAGRAM':
        return { ...state, instagram: action.payload };
      case 'UPDATE_FORM_DATA':
        return { ...state, formData: { ...state.formData, ...action.payload } };
      case 'SAVE_FORM_DATA':
        return { ...state, formDataSets: [...state.formDataSets, state.formData] };
      case 'CLEAR_FORM':
        return { ...state, formData: { tier: '', shape: '', photo: [], description: '', extra: '' } };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <OrderContext.Provider value={{ state, dispatch, name, setName, email, setEmail, instagram, setInstagram, formData, updateFormData, formDataSets, saveCurrentDataSet, currentDataSet, clearForm  }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  return useContext(OrderContext);
};
