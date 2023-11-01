import { useOrderContext } from "../../context/OrderContext";

function OrderDetails() {

  const { name, email, instagram, setName, setEmail, setInstagram } = useOrderContext()

  return (
    <div>
      <div
      className="text-center text-2xl mt-5 font-bold">
        Personal Info</div>
      <section className="bg-primary rounded-xl m-4">
        <div className="p-8 shadow-lg">
          <form className="space-y-4">
            <div className="w-full">
              <label className="sr-only" htmlFor="name">Name</label>
              <input
                className="input input-solid max-w-full bg-white"
                placeholder="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="sr-only" htmlFor="email">Email</label>
                <input
                  className="input input-solid bg-white"
                  placeholder="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email" />
              </div>

              <div>
                <label className="sr-only" htmlFor="instagram"> </label>
                <input
                  className="input input-solid bg-white"
                  placeholder="Instagram Handle"
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  id="instagram" />
              </div>
            </div>
            <div className="mt-4">
              <button type="button" className="rounded-lg btn btn-primary btn-block bg-secondary">Start</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default OrderDetails;
