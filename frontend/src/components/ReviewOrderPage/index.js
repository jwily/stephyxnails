import React from "react";
import { useOrderContext } from "../../context/OrderContext";
import ReCAPTCHA from "react-google-recaptcha";

const ReviewOrderPage = (info) => {

  // const { state, dispatch } = useOrderContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const recaptchaValue = recaptchaRef.current.getValue();
    this.props.handleSubmit(recaptchaValue);

    try {
      const finalizedInfo = {
        name: info.name,
        email: info.email,
        instagram: info.instagram,
        contact: info.contact,
        sets: info.sets
      }

      const res = await fetch('/api/orders/', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalizedInfo)
      })

      if (res.ok) {
        console.log('it worked');
        // Eventually pass into email api
      }
    } catch (error) {
      console.error(error);
    }
  }
  const recaptchaRef = React.createRef();

  return (
    <div>
      {/* {info.sets.map(set =>
                <div key={set.description.length}>
                    <div>
                        {set.description}
                    </div>
                    <div>
                        {set.shape}
                    </div>
                    <div>
                        {set.size}
                    </div>
                    <div>
                        {set.tier}
                    </div>
                </div>)} */}
      {/* <div className="g-recaptcha" data-sitekey="6Ld2fOEoAAAAABOW9mr23wNIcTakNByHf5ArjqdW"></div> */}
      <ReCAPTCHA ref={recaptchaRef} sitekey="6Ld2fOEoAAAAABOW9mr23wNIcTakNByHf5ArjqdW" onChange={handleSubmit}/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default ReviewOrderPage
