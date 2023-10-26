import { useState, useEffect } from "react";

    /*
    <OrderDetails />
      <>
        details
      <>
    <SetPage
      sets = []
      onSubmit = sets.push({tier, size, etc.})
    >
      page 1, page 2, page 3,

    <ReviewOrderPage sets=sets/>
    return (
      sets.map(set)
    )
    */

function OrderDetails() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [contact, setContact] = useState('');

  return (
    <div>
      <h1>🌸Custom Nail Form🌸</h1>
        <form>
          <div>
            <label> Name
              <input
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>email
              <
            </label>
          </div>
          <div>
            <label/>
          </div>
        </form>
    </div>
  )
}

export default OrderDetails;
