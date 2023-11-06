import React, {useState, useEffect} from 'react';
import { useOrderContext } from "../../context/OrderContext";
import { useHistory } from "react-router-dom";

function OrderDetails() {

  // Access state and dispatch function from the context
  const { dispatch, state  } = useOrderContext();

  // Access the history object for navigation
  const history = useHistory();

  // Initialize local state variables for name, email, and Instagram
  const [name, setName] = useState(state.name);
  const [email, setEmail] = useState(state.email);
  const [instagram, setInstagram] = useState(state.instagram);
  const [emailError, setEmailError] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  function isEmailValid(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  }

  useEffect(() => {
    // Dispatch the 'CLEAR_LOCAL_STORAGE' action when the component is loaded
    dispatch({ type: 'CLEAR_LOCAL_STORAGE' });
  }, [dispatch]);

  useEffect(() => {
    // Enable or disable the button based on name and email validity
    setIsSubmitDisabled(!isNameValid(name) || !isEmailValid(email));
  }, [name, email]);

  const isNameValid = (name) => {
    return name.trim() !== '';
  };

  
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!isEmailValid(newEmail)) {
      if (newEmail.includes('@')) {
        setEmailError('Invalid email address. Make sure to include the domain (e.g., .com, .org, .net).');
      } else {
        setEmailError('Invalid email address. Missing "@" symbol.');
      }
    } else {
      setEmailError('');
    }
  };


  const formSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailValid(email)) {
      setEmailError('Invalid email address. Please provide a valid email.');
      return;
    }
    // Update the context state with the entered name, email, and Instagram
    dispatch({ type: 'SET_NAME', payload: name }); // Update name in the context
    dispatch({ type: 'SET_EMAIL', payload: email }); // Update email in the context
    dispatch({ type: 'SET_INSTAGRAM', payload: instagram }); // Update instagram in the context

    // Use history.push to navigate to another page and pass the FormData as data
    history.push('/order-set/start');
  }

  return (
    <div>
      <div
      className="text-center text-2xl mt-5 font-bold">
        Personal Info</div>
      <section className="bg-primary rounded-2xl m-4">
        <div className="p-8 shadow-lg">
          <form className="space-y-4" onSubmit={formSubmit}>
            <div className="w-full">
              <label className="sr-only" htmlFor="name">Name</label>
              <input
                className="input input-solid max-w-full bg-white text-black"
                placeholder="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="sr-only" htmlFor="email">Email</label>
                <input
                  className="input input-solid bg-white text-black"
                  placeholder="Email address"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  id="email"
                />
                {emailError && (
                  <p className="text-red-500">{emailError}</p>
                )}
              </div>

              <div>
                <label className="sr-only" htmlFor="instagram"> </label>
                <input
                  className="input input-solid bg-white text-black"
                  placeholder="Instagram Handle"
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  id="instagram" />
              </div>
            </div>
            {/*
            <div className="w-full">
              <label className="sr-only" htmlFor="message">Message</label>

              <textarea className="textarea textarea-solid max-w-full" placeholder="Message" rows="8" id="message"></textarea>
            </div> */}
            <div className="mt-4">
              <button  type="submit" className="rounded-lg btn btn-primary btn-block bg-primary_blue text-black" disabled={isSubmitDisabled}>Next</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default OrderDetails;
