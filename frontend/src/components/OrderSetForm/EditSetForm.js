import React, { useState, useEffect } from 'react';
import { useParams, useHistory , useLocation} from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';

const EditSetForm = () => {
    const history = useHistory();
    const { state, dispatch } = useOrderContext();
    const { sets } = state;
    const { index } = useParams();
    const setIndex = parseInt(index, 10);

    const [editedTier, setEditedTier] = useState('');
    const [editedShape, setEditedShape] = useState('');
    const [editedPhoto, setEditedPhoto] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedExtra, setEditedExtra] = useState(0);

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

        dispatch({ type: 'UPDATE_SET', payload: updatedSets });

        history.push('/review-order');
    };

  return (
    <div>
        <div></div>
        <h2>Edit Set</h2>

        <form>
            <div> 
            <label>Tier:</label>
            <label>
                <input
                type="radio"
                name="tier"
                value="Budding Tier"
                checked={editedTier === 'Budding Tier'}
                onChange={() => setEditedTier('Budding Tier')}
                />
                Budding Tier
                <span> $35 </span>
                <p> Solid colors (including solid chrome or glitter nails), a few gems/stickers</p>
            </label>
            <label>
                <input
                type="radio"
                name="tier"
                value="Petal Tier"
                checked={editedTier === 'Petal Tier'}
                onChange={() => setEditedTier("Petal Tier")}
                />
              Petal Tier
              <span> $50 </span>
              <p>Ombre, airbrush, French tips, simple painted designs, 1-2 simple characters, some gems/stickers, 1-2 3D charms</p>
            </label>
            <label>
                <input
                type="radio"
                name="tier"
                value="Sakura Tier"
                checked={editedTier === 'Sakura Tier'}
                onChange={() => setEditedTier("Sakura Tier")}
                />
                Sakura Tier
                <span> $65 </span>
                <p>Intricate/detailed nail art, 1-2 detailed portraits OR hand sculpted charms, more/charms</p>
            </label>
            <label>
                <input
                type="radio"
                name="tier"
                value="Blossom Tier"
                checked={editedTier === 'Blossom Tier'}
                onChange={() => setEditedTier( 'Blossom Tier' )}
                />
                Blossom Tier
                <span> $80 </span>
                <p>Intricate designs across all nails, up to 5 hand sculpted charms, large and complex charm arrangements</p>
            </label>
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
  );
};

export default EditSetForm;
