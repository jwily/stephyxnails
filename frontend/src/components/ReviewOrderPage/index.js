import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from "../../context/OrderContext";

const ReviewOrderPage = () => {

    const history = useHistory();

    const { formDataSets } = useOrderContext();
    // const { name } = useContext(useOrderContext); // Access the name from the context
    // const { email } = useContext(useOrderContext); // Access the name from the context
    // const { instagram } = useContext(useOrderContext); // Access the name from the context


    const handleBack = () => {
        // Navigate back to the previous step
        window.location.href = '/order-set/all'; // Replace 'previous-step-url' with the actual URL for the previous step
      };
    

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
          <div>
      <h2>Review Your Order</h2>
      {/* <p>{name}</p>
      <p>{email}</p> */}

      {formDataSets.map((formData, index) => (
        <div key={index}>
          <h3>Order #{index + 1}</h3>
          <p>Name: {formData.name}</p>
          <p>Email: {formData.email}</p>
          {/* <p>Instagram: {formData.instagram}</p> */}
          {/* Display other form data here */}
        </div>
      ))}
    </div>

    <button onClick={handleBack}>Back</button>


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
