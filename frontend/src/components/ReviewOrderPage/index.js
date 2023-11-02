import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from "../../context/OrderContext";
import ReCAPTCHA from "react-google-recaptcha"

const ReviewOrderPage = () => {

    const history = useHistory();
    const { state, dispatch } = useOrderContext();
    const { sets } = state;

    // Define state variables for edited user information
    const [editedName, setEditedName] = useState(state.name);
    const [editedEmail, setEditedEmail] = useState(state.email);
    const [editedInstagram, setEditedInstagram] = useState(state.instagram);
  
    // Define edit mode flags for each field
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingInstagram, setIsEditingInstagram] = useState(false);
    
    const handleSaveUserInformation = () => {
        // Create an object with the edited user information
        const updatedUserInformation = {
        name: editedName,
        email: editedEmail,
        instagram: editedInstagram,
        };
  
        // Update the user information in your state
        dispatch({ type: 'UPDATE_USER_INFORMATION', payload: updatedUserInformation });
  
       
        // When isEditingName is true, an input field is displayed for editing the name. 
        // The onChange event handler captures the input changes and updates the editedName stat
        // When isEditingName is false, the name is displayed as plain text, and a "Edit" button allows users to switch to edit mode.
        setIsEditingName(false);
        setIsEditingEmail(false);
        setIsEditingInstagram(false);
    };


    const handleBack = () => {
        // Navigate back to the previous step
        history.push('/order-set/all');
        // Replace 'previous-step-url' with the actual URL for the previous step
    };

    const handleDeleteSet = (index) => {
        // Dispatch an action to delete the set at the specified index
        dispatch({ type: 'DELETE_SET', payload: index });
      };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const recaptchaValue = recaptchaRef.current.getValue();
        this.props.handleSubmit(recaptchaValue);

        try {
            const finalizedInfo = {
                // name: info.name,
                // email: info.email,
                // instagram: info.instagram,
                // contact: info.contact,
                // sets: info.sets
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
            <div>
                <h2>Review Your Entire Order</h2>
            </div>

        <div>
            <h3>User Information</h3>
            <section>
            {isEditingName ? (
                <div>
                    <label>Name: </label>
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)} // Handle input change
                    />
                    <div>
                        <button onClick={() => setIsEditingName(false)}>Cancel</button>
                        <div></div>
                        <button onClick={handleSaveUserInformation}>Save</button>
                    </div>
                </div>
            ) : (
                <div>
                    <p>Name: {state.name}</p>
                    <button onClick={() => setIsEditingName(true)}>Edit</button>
                </div>
            )}
            </section>
            <section>
            {isEditingEmail ? (
                <div>
                    <label>Email: </label>
                    <input
                        type="text"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)} // Handle input change
                    />
                    <div>
                        <button onClick={() => setIsEditingEmail(false)}>Cancel</button>
                        <div></div>
                        <button onClick={handleSaveUserInformation}>Save</button>
                    </div>
                </div>
            ) : (
                <div>
                    <p>Email: {state.email}</p>
                    <button onClick={() => setIsEditingEmail(true)}>Edit</button>
                </div>
            )}
            </section>
            <section>
            {isEditingInstagram ? (
                <div>
                    <label>Instagram: </label>
                    <input
                        type="text"
                        value={editedInstagram}
                        onChange={(e) => setEditedInstagram(e.target.value)} // Handle input change
                    />
                    <div>
                        <button onClick={() => setIsEditingInstagram(false)}>Cancel</button>
                        <div></div>
                        <button onClick={handleSaveUserInformation}>Save</button>
                    </div>
                </div>
            ) : (
                <div>
                    <p>Instagram: {state.instagram}</p>
                    <button onClick={() => setIsEditingInstagram(true)}>Edit</button>
                </div>
            )}
            </section>
        </div>

        <div>
            <section>
                {sets.map((formData, index) => {
                return(
                    <li key={index}>
                    <h4>Set {index + 1}</h4>
                    <p>Tier: {formData.tier}</p>
                    <p>Shape: {formData.shape}</p>
                    <p>photo: {formData.photo}</p>
                    <p>Description: {formData.description}</p>
                    <p>Extra: {formData.extra}</p>
                    <button onClick={() => handleDeleteSet(index)}>Delete Set</button>
                </li>
                )}
                )}
            </section>
        </div>

        <div>
            <div>
                <button onClick={handleBack}>Back</button>
            </div>
            <div>
                <button onClick={handleSubmit}>Submit Order</button>
            </div>
        </div>
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

    );
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
    //         <ReCAPTCHA ref={recaptchaRef} sitekey="6Ld2fOEoAAAAABOW9mr23wNIcTakNByHf5ArjqdW" onChange={handleSubmit} />
    //         <button onClick={handleSubmit}>Submit</button>
    //     </div>
    // )
}


export default ReviewOrderPage
