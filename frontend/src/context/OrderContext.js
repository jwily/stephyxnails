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

      case 'INITIALIZE_STATE':
        // Load initial state from localStorage if it exists
        const savedState = localStorage.getItem('orderState');
        return savedState ? JSON.parse(savedState) : initialState;
  
      case 'SAVE_STATE':
        // Save the state to localStorage
        localStorage.setItem('orderState', JSON.stringify(state));
        return state;
  
  
    // case 'CLEAR_FORM':
    //         console.log("Clearing the form");
    //   return { ...state, formData: { tier: '', shape: '', photo: [], description: '', extra: '' } };
    default:
      return state;
  }
};

export const OrderProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

    // Dispatch the 'INITIALIZE_STATE' action to load the state from localStorage
    useEffect(() => {
      dispatch({ type: 'INITIALIZE_STATE' });
    }, []);
  
  // Save the state to localStorage whenever it changes
  useEffect(() => {
    dispatch({ type: 'SAVE_STATE' });
  }, [state]);



  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  return useContext(OrderContext);
};
