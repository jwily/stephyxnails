import { useOrderContext } from "../../context/OrderContext";
import { NavLink } from "react-router-dom";


export default function OrderConfirm() {

    return (
        <div> 
            <div>
                <h2>
                    Order Confirmed 
                </h2>
                <p>
                    Check your inbox for an email confirmation 
                </p>
                <NavLink exact to="/">
                    <button>
                        Take Me Home
                    </button>
                </NavLink>
            </div>
        </div>
    )
}