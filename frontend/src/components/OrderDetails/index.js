import React, {useState} from 'react';
import { useOrderContext } from "../../context/OrderContext";
import { useHistory } from "react-router-dom";


function OrderDetails() {

  const { dispatch, state  } = useOrderContext();

  const history = useHistory();

  const [name, setName] = useState(state.name);
  const [email, setEmail] = useState(state.email);
  const [instagram, setInstagram] = useState(state.instagram);
  

  const formSubmit = async (e) => {
    e.preventDefault();

    
// Create a new FormData object
    // const formData = new FormData();

      // Debugging: Log current name and email values
      console.log("Current name:", name);
      console.log("Current email:", email);
  

        dispatch({ type: 'SET_NAME', payload: name }); // Update name in the context
      dispatch({ type: 'SET_EMAIL', payload: email }); // Update email in the context
      dispatch({ type: 'SET_INSTAGRAM', payload: instagram }); // Update instagram in the context
    // Append form fields to the FormData object
    // formData.append('name', name);
    // formData.append('email', email);
    // formData.append('instagram', instagram);

    console.log("Name and email after dispatch:", name, email);


    // Use history.push to navigate to another page and pass the FormData as data
    history.push('/order-set/start');


    // window.location.href ='/order-set/start';
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
