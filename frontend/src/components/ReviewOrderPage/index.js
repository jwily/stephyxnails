import { useOrderContext } from "./OrderContext";

const ReviewOrderPage = () => {


    const { state, dispatch } = useOrderContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const finalizedInfo = {
                name: info.name,
                email: info.email,
                instagram: info.instagram,
                contact: info.contact,
                sets: info.sets
            }

            const res = await fetch('/api/orders/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalizedInfo)
            })

            if (res.ok) {
                console.log('it worked');
                // Eventually pass into email api
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            {info.sets.map(set =>
                <div key={set.description.length}>
                    <div>
                        {set.description}
                    </div>
                    <div>
                        {set.shape}
                    </div>
                    <div>
                        {set.size}
                    </div>
                    <div>
                        {set.tier}
                    </div>
                </div>)}

                <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default ReviewOrderPage
