import { useState, useEffect } from "react";

function OrderPage() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [contact, setContact] = useState('');

  return (
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

    <div>
      <h1>🌸Custom Nail Form🌸</h1>
        <form>
          <div>
            <label>name</label>
            <input
              type='text'
              placeholder='Name'

            />
          </div>
          <div>
            <label>email</label>
          </div>
          <div>
            <label/>
          </div>




        </form>
    </div>
  )
}

export default OrderPage;
