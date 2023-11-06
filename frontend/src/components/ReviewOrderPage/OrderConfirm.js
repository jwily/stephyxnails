import { useOrderContext } from "../../context/OrderContext";
 
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