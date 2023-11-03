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
  
  useEffect(() => {
    // Dispatch the 'CLEAR_LOCAL_STORAGE' action when the component is loaded
    dispatch({ type: 'CLEAR_LOCAL_STORAGE' });
  }, [dispatch]);

  const formSubmit = async (e) => {
    e.preventDefault();

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
      <section className="bg-primary rounded-xl m-4">
        <div className="p-8 shadow-lg">
          <form className="space-y-4" onSubmit={formSubmit}>
            <div className="w-full">
              <label className="sr-only" htmlFor="name">Name</label>
              <input
                className="input input-solid max-w-full bg-white"
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
                  className="input input-solid bg-white"
                  placeholder="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email" />
              </div>

              <div>
                <label className="sr-only" htmlFor="instagram"> </label>
                <input
                  className="input input-solid bg-white"
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
              <button type="submit" className="rounded-lg btn btn-primary btn-block bg-primary_blue">Next</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default OrderDetails;
