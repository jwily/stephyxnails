import { useState, useEffect } from "react";

    /*
    <OrderPage>

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
    </OrderPage>
    */

function OrderDetails() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  

  const formSubmit = async (e) => {
    e.preventDefault();

    const formData = await new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('instagram', instagram)

    history.push('/orders/setpage', {data: formData})

  }

  return (
    <div>
      <h1>🌸Custom Nail Form🌸</h1>
        <form onSubmit={formSubmit}>
          <div>
            <label> Name
              <input
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>email
            <input
                type='text'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>Instagram
            <input
                type='text'
                placeholder='Instagram'
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <button
              type='submit'>Next</button>
          </div>
        </form>
    </div>
  )
}

export default OrderDetails;
