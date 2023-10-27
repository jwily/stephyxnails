export default function FaqPage() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Frequently Asked Questions</h1>
      <div className="accordion-group accordion-group-bordered">
        <div className="accordion" tabIndex="0">
          <label className="accordion-title bg-inherit">What does each order include?</label>
          <div className="accordion-content">
            <div className="min-h-0">
              <ul>
                Every order will include:
                <li>•Cuticle pusher</li>
                <li>•Mini nail file</li>
                <li>•Mini bluffing block</li>
                <li>•Alcohol wipes</li>
                <li>•Adhesive tabs</li>
                <li>•Nail glue</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion" tabIndex="0">
          <label className="accordion-title bg-inherit">How long will it take to process my order?</label>
          <div className="accordion-content">
            <div className="min-h-0">
              Processing times are 1-3 weeks, not including shipping times. Processing times can vary
              depending on volume of orders and how complex a set is.
            </div>
          </div>
        </div>
        <div className="accordion" tabIndex="0">
          <label className="accordion-title bg-inherit">What is your refund policy?</label>
          <div className="accordion-content">
            <div className="min-h-0">
              Since each order is custom made for you, I am unable to accept refunds or exchanges of any kind.
              If you are unsure about sizing, I highly recommend ordering a sizing kit as I do not offer
              refunds for incorrect sizing.
            </div>
          </div>
        </div>
        <div className="accordion" tabIndex="0">
          <label className="accordion-title bg-inherit">Do you offer sizing kits?</label>
          <div className="accordion-content">
            <div className="min-h-0" style={{display: "flex", flexDirection:"column", gap:"15px"}}>
                <p>Sizing kits are available for $10 and ship out at the end of each business day.</p>
                <p>Correct sizing is the responsibility of the buyer and a sizing kit is <span style={{fontStyle:"italic"}}>highly</span> recommended.</p>
                <p>Please remember that the most accurate way to find your sizes is with a sizing kit as all nail brands are created differently!</p>
            </div>
          </div>
        </div>
        <div className="accordion" tabIndex="0">
          <label className="accordion-title bg-inherit">How much is shipping and how long does it take?</label>
          <div className="accordion-content">
            <div className="min-h-0" style={{display: "flex", flexDirection:"column", gap:"15px"}}>
                Standard shipping (1-3 business days) is $5 through USPS Mail. <span style={{fontStyle:"italic"}}>I am not responsible for packages once shipped out!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
