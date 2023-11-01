import React, {useContext, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from "../../context/OrderContext";

const ReviewOrderPage = () => {
  const history = useHistory();

  const { state, dispatch} = useOrderContext();

  const { sets } = state;


    const handleBack = () => {
        // Navigate back to the previous step
        history.push('/order-set/all');
        // Replace 'previous-step-url' with the actual URL for the previous step
      };
    
      const handleSubmit = () => {

      }


    // const { state, dispatch } = useOrderContext()

    // const handleSubmit = async (e) => {
    //     e.preventDefault()

    //     try {
    //         const finalizedInfo = {
    //             name: info.name,
    //             email: info.email,
    //             instagram: info.instagram,
    //             contact: info.contact,
    //             sets: info.sets
    //         }

    //         const res = await fetch('/api/orders/', {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(finalizedInfo)
    //         })

    //         if (res.ok) {
    //             console.log('it worked');
    //             // Eventually pass into email api
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    return (
      <div>
      <h2>Review Your Order</h2>
      <div>
        <h3>User Information</h3>
        <p>Name: {state.name}</p>
        <p>Email: {state.email}</p>
        <p>Instagram: {state.instagram}</p>
      </div>
      <div>
        <h3>Order Sets</h3>
        {/* {mergedData.map((formData, index) => (
          <div key={index}>
            <h4>Set {index + 1}</h4>
            <p>Tier: {formData.tier}</p>
            <p>Shape: {formData.shape}</p>
            <p>Photo: {formData.photo}</p>
            <p>Description: {formData.description}</p>
            <p>Extra: {formData.extra}</p>
          </div>
        ))} */}
{sets.map((formData, index) => {
          return(
          <li key={index}>
            <h4>Set {index + 1}</h4>
            <p>Tier: {formData.tier}</p>
            <p>Shape: {formData.shape}</p>
            <p>photo: {formData.photo}</p>
            <p>Description: {formData.description}</p>
            <p>Extra: {formData.extra}</p>
          </li>
          )}
        )}

      </div>
      <button onClick={handleBack}>Back</button>
      <button onClick={handleSubmit}>Submit Order</button>
    </div>


            // {/* {info.sets.map(set =>
            //     <div key={set.description.length}>
            //         <div>
            //             {set.description}
            //         </div>
            //         <div>
            //             {set.shape}
            //         </div>
            //         <div>
            //             {set.size}
            //         </div>
            //         <div>
            //             {set.tier}
            //         </div>
            //     </div>)} */}

            //     {/* <button onClick={handleSubmit}>Submit</button> */}

        
    )
}

export default ReviewOrderPage
