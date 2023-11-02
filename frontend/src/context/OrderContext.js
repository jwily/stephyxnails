import React, { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";

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
  sets: [],
};

const reducer = (state=initialState, action) => {
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
<<<<<<< HEAD
    case 'SAVE_FORM_DATA':
      const newState = {...state};
      newState.sets = [...newState.sets, newState.formData];
      newState.formData =  {
        tier: '',
        shape: '',
        photo: [],
        description: '',
        extra: '' }
        console.log('save data', newState)

      return newState;
    // case 'CLEAR_FORM':
    //         console.log("Clearing the form");
    //   return { ...state, formData: { tier: '', shape: '', photo: [], description: '', extra: '' } };
=======
    case 'UPDATE_MERGED_DATA':
      return { ...state, mergedData: action.payload };
    case 'SAVE_FORM_DATA':
      console.log("Saving form data:", state.formData);
      return { ...state, formDataSets: [...state.formDataSets, state.formData] };
    case 'CLEAR_FORM':
      console.log("Clearing the form");
      return { ...state, formData: { tier: '', shape: '', photo: [], description: '', extra: '' } };
>>>>>>> staging
    default:
      return state;
  }
};

export const OrderProvider = ({ children }) => {
<<<<<<< HEAD

  const [state, dispatch] = useReducer(reducer, initialState);



  return (
    <OrderContext.Provider value={{ state, dispatch }}>
=======
  const [formDataSets, setFormDataSets] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);
  const [formData, setFormData] = useState({
    tier: '',
    shape: '',
    photo: '',
    description: '',
    extra: '',
  });
  const scrollToOrder = useRef()
  const scrollToAbout = useRef()
  const scrollToGallery = useRef()
  const scrollToFAQ = useRef()

  const updateFormData = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  // Update mergedData whenever formDataSets and formData change
  useEffect(() => {
    setMergedData([...formDataSets, formData]);
  }, [formDataSets, formData]);

  const saveCurrentDataSet = () => {
    setFormDataSets([...formDataSets, formData]);
    setMergedData([...formDataSets, formData]);
  };

  const clearForm = () => {
    setFormData({  // Clear the form fields
      tier: '',
      shape: '',
      photo: '',
      description: '',
      extra: '',
    });
  };


  return (
    <OrderContext.Provider value={{ state, dispatch, name, setName, email, setEmail, instagram, setInstagram, scrollToAbout, scrollToFAQ, scrollToGallery, scrollToOrder, formData, updateFormData, formDataSets, saveCurrentDataSet, clearForm, mergedData }}>
>>>>>>> staging
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  return useContext(OrderContext);
};
