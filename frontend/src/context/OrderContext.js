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
    // case 'CLEAR_FORM':
    //         console.log("Clearing the form");
    //   return { ...state, formData: { tier: '', shape: '', photo: [], description: '', extra: '' } };
    default:
      return state;
  }
};

export const OrderProvider = ({ children }) => {

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
