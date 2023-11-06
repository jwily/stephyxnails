import { useOrderContext } from "../../context/OrderContext";
import { NavLink } from "react-router-dom";

export default function OrderConfirm() {
  return (
    <div className="flex flex-col gap-5 mt-6" >
      <h1 className="font-extrabold text-2xl text-center">Order Confirmed</h1>
      <p className="text-center">
        Thank you so much for ordering from StephyX Nails! Please check your email inbox for a confirmation.
      </p>
      <div className="flex justify-center">
        <NavLink className="rounded-lg btn btn-primary bg-primary_blue text-black my-4" exact to="/">
          Take Me Home
        </NavLink>
      </div>
    </div>
  );
}
