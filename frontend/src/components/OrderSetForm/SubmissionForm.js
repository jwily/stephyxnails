import React from 'react';
// import AllSubmissions from './Submissions';
import { useOrderContext } from '../../context/OrderContext';


function StepExtra() {
    const { tier } = useOrderContext();
    const {shape} = useOrderContext();
    const {photo} = useOrderContext();
    const {description} = useOrderContext();
    const {extra} = useOrderContext();

  return (
    <div>
    <p>Selected Tier: {tier}</p>
    <p>Selected Shape: {shape}</p>
    <p>Selected photo: {photo}</p>
    <p>Selected description: {description}</p>
    <p>Selected extra: {extra}</p>




    </div>
  );
}

export default StepExtra;




