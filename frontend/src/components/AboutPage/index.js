import { useOrderContext } from "../../context/OrderContext"

export default function AboutPage() {

    const { scrollToAbout } = useOrderContext()

    return (
        <>
            <div ref={scrollToAbout}>
                <h1>About page</h1>
            </div>
            <button>click</button>
        </>
    )
}
