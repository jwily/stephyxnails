import { useOrderContext } from "../../context/OrderContext";

export default function FaqPage() {
  const {scrollToFAQ} = useOrderContext()
  return (
    <div className="rounded-ex m-4 bg-primary p-4" ref={scrollToFAQ}>
      <h1 className="text-2xl text-center">Info</h1>
      <div className="accordion-group accordion-group">
        <div className="accordion" tabIndex="0">
          <label className="accordion-title bg-inherit">F.A.Q.</label>
          <div className="accordion-content">
            <div className="min-h-0">
              <div>
                <p>Q: What does each order include?</p>
                <ul>
                  A: Every order will include:
                  <li>•Cuticle pusher</li>
                  <li>•Mini nail file</li>
                  <li>•Mini bluffing block</li>
                  <li>•Alcohol wipes</li>
                  <li>•Adhesive tabs</li>
                  <li>•Nail glue</li>
                </ul>
              </div>
              <div>
                <p>Q: How long will it take to process my order?</p>
                <p>A: Processing times are 1-3 weeks, not including shipping times. Processing times can vary
                  depending on volume of orders and how complex a set is.</p>
              </div>
              <p>Q: Do you offer sizing kits?</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <p>A: Sizing kits are available for $10 and ship out at the end of each business day.</p>
                <p>Correct sizing is the responsibility of the buyer and a sizing kit is <span style={{ fontStyle: "italic" }}>highly</span> recommended.</p>
                <p>Please remember that the most accurate way to find your sizes is with a sizing kit as all nail brands are created differently!</p>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion" tabIndex="0">
          <label className="accordion-title bg-inherit">Shipping </label>
          <div className="accordion-content">
            <div className="min-h-0" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              Standard shipping (1-3 business days) is $5 through USPS Mail. <span style={{ fontStyle: "italic" }}>I am not responsible for packages once shipped out!</span>
            </div>
          </div>
        </div>
        <div className="accordion" tabIndex="0">
          <label className="accordion-title bg-inherit">Returns</label>
          <div className="accordion-content">
            <div className="min-h-0">
              Since each order is custom made for you, I am unable to accept refunds or exchanges of any kind.
              If you are unsure about sizing, I highly recommend ordering a sizing kit as I do not offer
              refunds for incorrect sizing.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
