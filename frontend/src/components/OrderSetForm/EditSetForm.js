import React, { useState, useEffect } from 'react';
import { useParams, useHistory , useLocation} from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';

const EditSetForm = () => {
    const history = useHistory();
    const { state, dispatch , dataResult} = useOrderContext();
    const { sets } = state;
    const { index } = useParams();
    const setIndex = parseInt(index, 10);
    const [isLoading, setIsLoading] = useState(true); // Initialize the loading state
    const isOrderDetailsComplete = state.name && state.email 

    const [editedTier, setEditedTier] = useState('');
    const [editedShape, setEditedShape] = useState('');
    const [editedPhoto, setEditedPhoto] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedExtra, setEditedExtra] = useState(0);

      
  const redirectToOrderDetails = () => {
    window.location.href ='/order'
  }

    // Load existing set data from state when the component mounts
    useEffect(() => {
        setEditedTier(sets[setIndex].tier);
        setEditedShape(sets[setIndex].shape);
        setEditedPhoto(sets[setIndex].photo);
        setEditedDescription(sets[setIndex].description);
        setEditedExtra(sets[setIndex].extra);
    }, [setIndex, sets]);

    const handleSaveSet = () => {
        const updatedSet = {
            tier: editedTier,
            shape: editedShape,
            photo: editedPhoto,
            description: editedDescription,
             extra: editedExtra,
        };

        const updatedSets = [...sets];
        updatedSets[setIndex] = updatedSet;

        dispatch({ type: 'UPDATE_SETS', payload: updatedSets });

        history.push('/review-order');
    };

  return (
    <>
       {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
      {isOrderDetailsComplete ? (
        <div>
          <div></div>
          <h2>Edit Set</h2>
  
          <form>
              <div> 
              <label>Tier:</label>
              <div>
              {dataResult.map((tierOption) => (
                <div key={tierOption.id}>
                  <label>
                    <input
                      type="radio"
                      name="tier"
                      value={tierOption.name}
                      checked={editedTier === tierOption.name} // Use editedTier for checked state
                      onChange={() => setEditedTier(tierOption.name)} // Set editedTier on change
                      required
                    />
                    {tierOption.name}
                    <span> ${tierOption.price} </span>
                    <p>{tierOption.description}</p>
                  </label>
                </div>
              ))}
            </div>
              </div>
       
              <div>
              <label>Shape:</label>
                  <select value={editedShape} onChange={(e) => setEditedShape(e.target.value)}>
                      <option value="Extra-Short Square" >Extra-Short Square</option>
                      <option value="Short Square">Short Square</option>
                      <option value="Medium Square">Medium Square</option>
                      <option value="Short Coffin">Short Coffin</option>
                      <option value="Medium Coffin">Medium Coffin</option>
                      <option value="Short Almond">Short Almond</option>
                      <option value="Medium Round">Medium Round</option>
                      <option value="Short Round">Short Round</option>
                      <option value="Medium Round">Medium Round</option>
                      <option value="Short Almond">Short Almond</option>
                      <option value="Medium Almond">'Medium Almond</option>
                      <option value="Medium Stiletto">Medium Stiletto</option>
                  </select>
              </div>
  
              <div>
              <label>Photo:</label>
                  <input
                      type="text"
                      value={editedPhoto}
                      onChange={(e) => setEditedPhoto(e.target.value)}
                  />
              </div>
  
              <div>
              <label>Description:</label>
                  <textarea
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                  />
              </div>
  
              <div>
              <label>Extra:</label>
                  <input
                      type="number"
                      value={editedExtra}
                      onChange={(e) => setEditedExtra(e.target.value)}
                  />
              </div>
          </form>
  
          <div>
          <button onClick={handleSaveSet}>Save</button>
          <div></div>
          <button onClick={() => history.push('/review-order')}>Cancel</button>
          </div>
  
    </div>
        ) : (
          <div>
            <p>Please complete your order details before proceeding.</p>
            <button onClick={redirectToOrderDetails}>Complete Order Details</button>
          </div>
        )}
      </>
    )}
  </>
      
  );
};

export default EditSetForm;
