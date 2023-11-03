import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from "../../context/OrderContext";
import ReCAPTCHA from "react-google-recaptcha"
import Cookie from 'js-cookie'

const ReviewOrderPage = () => {

const history = useHistory();
  const { state} = useOrderContext();
  const { name, email, instagram, sets } = state;
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const recaptchaRef = React.createRef();
  const csrfToken = Cookie.get('csrftoken');
  console.log('CSRF TOKEN ----->',csrfToken)

    const handleCaptchaChange = () => {
      setIsCaptchaVerified(true);
    }

    const handleBack = () => {
        // Navigate back to the previous step
        history.push('/order-set/all');
        // Replace 'previous-step-url' with the actual URL for the previous step
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(isCaptchaVerified) {
          const recaptchaValue = recaptchaRef.current.getValue()
          try {
            const finalizedInfo = {
              name: name,
              email: email,
              instagram: instagram,
              sets: [
                {
                  tier: '1',
                  shape: 's-almond',
                  left_sizes: '1,2,3,4,5',
                  right_sizes: '1,2,3,4,5',
                  description: 'test'
                },{
                  tier: '2',
                  shape: 'm-square',
                  left_sizes: '2,2,2,2,2',
                  right_sizes: '2,2,2,2,2',
                  description: 'test2'
                }
              ],
              recaptcha: recaptchaValue
            }
            console.log(finalizedInfo)
            const res = await fetch('/api/orders/', {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
              },
              body: JSON.stringify(finalizedInfo)
            })

            if (res.ok) {
              console.log('it worked');
              // Eventually pass into email api
            }
            else {
                console.log('could not fetch', res)
              }
          } catch (error) {
              console.error(error);
          }
        } else {
          alert('Please complete the reCAPTCHA verification to submit your order.')
        }
    }


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
      <ReCAPTCHA ref={recaptchaRef} sitekey="6Ld2fOEoAAAAABOW9mr23wNIcTakNByHf5ArjqdW" onChange={handleCaptchaChange} />
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

    // return (
    //     <div>
    //         {/* {info.sets.map(set =>
    //             <div key={set.description.length}>
    //                 <div>
    //                     {set.description}
    //                 </div>
    //                 <div>
    //                     {set.shape}
    //                 </div>
    //                 <div>
    //                     {set.size}
    //                 </div>
    //                 <div>
    //                     {set.tier}
    //                 </div>
    //             </div>)} */}
    //         {/* <div className="g-recaptcha" data-sitekey="6Ld2fOEoAAAAABOW9mr23wNIcTakNByHf5ArjqdW"></div> */}

    //         <button onClick={handleSubmit}>Submit</button>
    //     </div>
    // )
    )
}


export default ReviewOrderPage
