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
  mergedData: [], // Add mergedData to the initial state
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
    case 'UPDATE_MERGED_DATA':
      return { ...state, mergedData: action.payload };

  // case 'SAVE_FORM_DATA':
  //   const { name, email, instagram, ...formData } = state;
  //   console.log('Saving name:', name);
  //   console.log('Saving email:', email);
  //   console.log('Saving instagram:', instagram);
  //   console.log('Saving formData:', formData);
  //   console.log('save form data:', state);
  
  //   return {
  //     ...state,
  //     name,
  //     email,
  //     instagram,
  //     formDataSets: [
  //       ...state.formDataSets,
  //       {
  //         ...formData,
  //       },
  //     ],
  //   };
    case 'CLEAR_FORM':
            console.log("Clearing the form");
      return { ...state, formData: { tier: '', shape: '', photo: [], description: '', extra: '' } };
    default:
      return state;
  }
};

export const OrderProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  // const [name, setName] = useState(state.name);
  // const [email, setEmail] = useState(state.email);
  // const [instagram, setInstagram] = useState(state.instagram);
  const [formData, setFormData] = useState({
    tier: '',
    shape: '',
    photo: '',
    description: '',
    extra: '',
  });

  const [formDataSets, setFormDataSets] = useState([]);
  const [mergedData, setMergedData] = useState([]); // State to store merged data

    
  const updateFormData = (newData) => {
    setFormData({...formData, ...newData});
  };
  
  const saveCurrentDataSet = () => {
    setFormDataSets([...formDataSets, formData]);
    setMergedData([...formDataSets, formData]); 
  };


    // Update mergedData whenever formDataSets and formData change
    useEffect(() => {
      setMergedData([...formDataSets, formData]);
    }, [formDataSets, formData]);


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
    <OrderContext.Provider value={{ state, dispatch, formData, updateFormData, formDataSets, saveCurrentDataSet, clearForm , mergedData }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  return useContext(OrderContext);
};
