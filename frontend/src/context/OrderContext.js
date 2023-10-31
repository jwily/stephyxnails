import React, { createContext, useContext, useReducer, useState, useEffect } from "react";

const OrderContext = createContext();

const initialState = {
  name: '',
  email: '',
  instagram: '',
  formData: {
    tier: '',
    shape: '',
    photo: '',
    description: '',
    extra: '',
  },
  formDataSets: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      console.log("Setting name to:", action.payload);
      return { ...state, name: action.payload };
    case 'SET_EMAIL':
      console.log("Setting email to:", action.payload);
      return { ...state, email: action.payload };
    case 'SET_INSTAGRAM':
      console.log("Setting Instagram to:", action.payload);
      return { ...state, instagram: action.payload };
    case 'UPDATE_FORM_DATA':
      console.log("Updating form data with:", action.payload);
      return { ...state, formData: { ...state.formData, ...action.payload } };
    case 'SAVE_FORM_DATA':
      console.log("Saving form data:", state.formData);
      return { ...state, formDataSets: [...state.formDataSets, state.formData] };
    case 'CLEAR_FORM':
            console.log("Clearing the form");
      return { ...state, formData: { tier: '', shape: '', photo: [], description: '', extra: '' } };
    default:
      return state;
  }
};

export const OrderProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);


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
  const [mergedData, setMergedData] = useState([]); // State to store merged data


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

    // Update mergedData whenever formDataSets and formData change
    useEffect(() => {
      setMergedData([...formDataSets, formData]);
    }, [formDataSets, formData]);
  
  


  return (
    <OrderContext.Provider value={{ state, dispatch, name, setName, email, setEmail, instagram, setInstagram, formData, updateFormData, formDataSets, saveCurrentDataSet, currentDataSet, clearForm , mergedData }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  return useContext(OrderContext);
};
