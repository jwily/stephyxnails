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
    leftDisplay: '',
    rightDisplay: '',
    photo: [],
    description: '',
    extra: '',
    extra2: '',
  },
  sets: [],
  setCount: 0, // Initialize setCount to 0
  isCurrentSetAdded: false,  // Flag to track whether the current set has been added
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

    case 'MARK_CURRENT_SET_ADDED':
      return {
        ...state,
        isCurrentSetAdded: true,  // Mark the current set as added
      };

    case 'ADD_SET':
      // Add a new set and increment setCount
      const newSets = [...state.sets, action.payload];
      return { ...state, sets: newSets, setCount: state.setCount + 1 };

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

    case 'UPDATE_SETS':
      return {
        ...state,
        sets: action.payload, // Update the sets array with the new data
      };

    case 'CLEAR_FORM':
      return { ...state, formData: { tier: '', shape: '',  leftDisplay: '', rightDisplay: '', photo: [], description: '', extra: '', extra2: ''} };
    
      case 'INCREMENT_SET_COUNT':
        return {
          ...state,
          setCount: state.setCount + 1,
        };
      case 'DECREMENT_SET_COUNT':
        return {
          ...state,
          setCount: state.setCount - 1,
        };
      case 'RESET_SET_COUNT':
        return {
          ...state,
          setCount: 0,
        };
        case 'ADD_PHOTO':
          const newPhotos = [...state.formData.photo, action.payload];
          return {
            ...state,
            formData: {
              ...state.formData,
              photo: newPhotos,
            },
          };
        
          case 'REMOVE_PHOTO':
            return {
              ...state,
              formData: {
                ...state.formData,
                photo: action.payload,
              },
            };
          
        
    default:
      return state;
  }
};

// Create an OrderProvider component to provide the order context to the application
export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [dataResult, setDataResult] = useState(null)
  const [image, setImage] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/tiers/');
        if (response.ok) {
          const result = await response.json();
          setDataResult(result)
          console.log(result);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error(error);
      }
    }
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
    fetchData();
  }, []);

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
    <OrderContext.Provider value={{ image, state, dispatch, scrollToOrder, scrollToAbout, scrollToGallery, scrollToFAQ, dataResult }}>
      {children}
    </OrderContext.Provider>
  );
};

// Create a custom hook to access the order context
export const useOrderContext = () => {
  return useContext(OrderContext);
};
