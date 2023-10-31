import { useState, useEffect, useContext } from "react";
import { useOrderContext } from "../../context/OrderContext";
import { useHistory } from "react-router-dom";
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

  const { name, email, instagram, setName, setEmail, setInstagram } = useOrderContext();
  console.log(name,'name');
  console.log(instagram,'insta');
  console.log(email,'email');

  const formSubmit = async (e) => {
    e.preventDefault();

    //   const formData = await new FormData();

    //   formData.append('name', name);
    //   formData.append('email', email);
    //   formData.append('instagram', instagram)

    //   history.push('/orders/setpage', {data: formData})
    history.push('/order-set/tier');
  }

  return (
    <div>
      <section className="bg-gray-2 rounded-xl bg-primary w-5/12 ">
        <div className="p-8 shadow-lg">
          <form className="space-y-4" onSubmit={formSubmit}>
            <div className="w-full">
              <label className="sr-only" htmlFor="name">Name</label>
              <input
                className="input input-solid max-w-full bg-secondary"
                placeholder="Name"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="sr-only" htmlFor="email">Email</label>
                <input
                  className="input input-solid bg-secondary"
                  placeholder="Email address"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="phone">Instagram</label>
                <input
                  className="input input-solid bg-secondary"
                  placeholder="Phone Number"
                  type="tel"
                  id="phone"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  required
                />
              </div>
            </div>
            {/*
            <div className="w-full">
              <label className="sr-only" htmlFor="message">Message</label>

              <textarea className="textarea textarea-solid max-w-full" placeholder="Message" rows="8" id="message"></textarea>
            </div> */}

            <div className="mt-4">
              <button type="submit" className="rounded-lg btn btn-primary btn-block bg-primary_blue">Next</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default OrderDetails;
