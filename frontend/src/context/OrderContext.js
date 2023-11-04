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
};

// Define a reducer function to manage state changes
const reducer = (state = initialState, action) => {
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
      newState.sets = [...newState.sets, newState.formData];
      newState.formData = {
        tier: '',
        shape: '',
        photo: [],
        description: '',
        extra: ''
      }
      return newState;
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

    // case 'CLEAR_FORM':
    //         console.log("Clearing the form");
    //   return { ...state, formData: { tier: '', shape: '', photo: [], description: '', extra: '' } };
    default:
      return state;
  }
};

// Create an OrderProvider component to provide the order context to the application
export const OrderProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [image, setImage] = useState([])
  // Dispatch the 'INITIALIZE_STATE' action to load the state from localStorage
  useEffect(() => {
    dispatch({ type: 'INITIALIZE_STATE' });
  }, []);

  useEffect(() => {
    const grabImage = async () => {
      const res = await fetch('/api/exampleimages/')

      if (res.ok) {
        const pic = await res.json()
        setImage(pic)
        console.log('it worked');
        console.log('from the fetch', pic);
      }
      else {
        console.log('it didnt work');
      }
    }
    grabImage()
  }, [])

  // Save the state to localStorage whenever it changes
  useEffect(() => {
    dispatch({ type: 'SAVE_STATE' });
  }, [state]);


  const scrollToOrder = useRef()
  const scrollToAbout = useRef()
  const scrollToGallery = useRef()
  const scrollToFAQ = useRef()

  return (
    <OrderContext.Provider value={{ image, state, dispatch, scrollToOrder, scrollToAbout, scrollToGallery, scrollToFAQ }}>
      {children}
    </OrderContext.Provider>
  );
};

// Create a custom hook to access the order context
export const useOrderContext = () => {
  return useContext(OrderContext);
};
