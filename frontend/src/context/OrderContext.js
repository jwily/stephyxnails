import React, { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";

// Create a context for managing order-related data
const OrderContext = createContext();

// Define the initial state for the order context
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
  setCount: 0, // Initialize setCount to 0
  isCurrentSetAdded: false,  // Flag to track whether the current set has been added
};

// Define a reducer function to manage state changes
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
      const newState = { ...state };
      // Add the current set to the sets array only if it hasn't been added
      if (!state.isCurrentSetAdded) {
        newState.sets = [...newState.sets, newState.formData];
        newState.isCurrentSetAdded = true; // Mark the current set as added
      }

      // newState.formData = {
      //   tier: '',
      //   shape: '',
      //   photo: [],
      //   description: '',
      //   extra: '',
      // };
      return newState;

      case 'MARK_CURRENT_SET_ADDED':
      return {
        ...state,
        isCurrentSetAdded: true,  // Mark the current set as added
      };

    case 'ADD_SET':
       // Add a new set and increment setCount
      const newSets = [...state.sets, action.payload];
      return { ...state, sets: newSets, setCount: state.setCount + 1 };

    case 'INITIALIZE_STATE':
      // Load initial state from localStorage if it exists
      const savedState = localStorage.getItem('orderState');
      return savedState ? JSON.parse(savedState) : initialState;

    case 'SAVE_STATE':
      // Save the state to localStorage
      localStorage.setItem('orderState', JSON.stringify(state));
      return state;  
      
    case 'CLEAR_LOCAL_STORAGE':
      // Clear the localStorage
      localStorage.clear();
      return { ...initialState }; // Reset state to its initial state
    
    case 'DELETE_SET':
      // Remove a set at the specified index
      const indexToDelete = action.payload;
      const updatedSets = [...state.sets.slice(0, indexToDelete), ...state.sets.slice(indexToDelete + 1)];
      return { ...state, sets: updatedSets, setCount: state.setCount - 1 };

    case 'UPDATE_USER_INFORMATION':
      // Update user information fields based on the payload
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        instagram: action.payload.instagram,
      };

    case 'UPDATE_SET':
      return {
        ...state,
        sets: action.payload, // Update the sets array with the new data
      };

    case 'CLEAR_FORM':
      return { ...state, formData: { tier: '', shape: '', photo: [], description: '', extra: '' } };
    
    default:
      return state;
  }
};

// Create an OrderProvider component to provide the order context to the application
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


  const scrollToOrder = useRef()
  const scrollToAbout = useRef()
  const scrollToGallery = useRef()
  const scrollToFAQ = useRef()

  return (
    <OrderContext.Provider value={{ state, dispatch, scrollToOrder, scrollToAbout, scrollToGallery, scrollToFAQ }}>
      {children}
    </OrderContext.Provider>
  );
};

// Create a custom hook to access the order context
export const useOrderContext = () => {
  return useContext(OrderContext);
};
