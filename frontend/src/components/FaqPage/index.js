import { useOrderContext } from "../../context/OrderContext";

export default function FaqPage() {
  const { scrollToFAQ } = useOrderContext()
  return (
    <div className="rounded-xl m-4 bg-primary p-4" ref={scrollToFAQ}>
      <h1 className="text-center font-bold">General Info</h1>
      <div className="accordion-group">
        <div className="accordion">
          <input type="checkbox" id="accordion-1" className="accordion-toggle" />
          <label htmlFor="accordion-1" className="accordion-title bg-inherit pl-2">
            F.A.Q.
          </label>
          <span className="accordion-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
          </span>
          <div className="accordion-content">
            <div className="min-h-0 flex flex-col gap-8 pl-2">
              <div>
                <p><span className="font-bold">Q:</span> How do I place a custom order?</p>
                <p>
                  <span className="font-bold">A:</span> Please fill out the custom order form to place your order and I’ll reach out to you via your preferred method (IG or email) to confirm a design with you. Once the design is approved, I’ll send an invoice (via PayPal) and get started on your set as soon as it’s paid (yay!  (ﾉ◕ヮ◕)ﾉ).
                </p>

                <p>For your privacy, I’ll also collect your shipping address from either IG or email.</p>

              </div>
              <div>
                <p><span className="font-bold">Q:</span> What does each order include?</p>
                <ul>
                  <span className="font-bold">A:</span> Every order will include:
                  <li className="pl-4">•Cuticle pusher</li>
                  <li className="pl-4">•Mini nail file</li>
                  <li className="pl-4">•Mini bluffing block</li>
                  <li className="pl-4">•Alcohol wipes</li>
                  <li className="pl-4">•Adhesive tabs</li>
                  <li className="pl-4">•Nail glue</li>
                </ul>
              </div>
              <div>
                <p><span className="font-bold">Q:</span> How long will it take to complete my order?</p>
                <p>
                  <span className="font-bold">A:</span> My current processing times are 1-3 weeks, not including the weekends and holidays (gotta take some days off ya’know ╰(▔∀▔)╯ ). Processing times can vary depending on the volume of my orders and how complex a set is.
                </p>
              </div>
              <div>
                <p><span className="font-bold">Q:</span> Do you offer sizing kits?</p>
                <div className="min-h-0 flex flex-col gap-y-2">
                  <p><span className="font-bold">A:</span> Sizing kits are available for $10 and ship out at the end of each business day.</p>
                  <p>
                    Correct sizing is the responsibility of the buyer and a sizing kit is{" "}
                    <span style={{ fontStyle: "italic" }}>highly</span> recommended.
                  </p>
                  <p>
                    Please remember that the most accurate way to find your sizes is with a sizing kit as all
                    nail brands are created differently!
                  </p>
                </div>
              </div>
              <div>
                <p><span className="font-bold">Q:</span> How long will my press-ons last?</p>
                <p>
                  <span className="font-bold">A:</span> Well, this really all depends on the wearer! But press-ons can last anywhere from 1-2 weeks with nail glue and a few days with adhesive tabs.

                </p>
              </div>
              <div>
                <p><span className="font-bold">Q:</span> What if I need a nail replaced?</p>
                <p>
                  <span className="font-bold">A:</span> Nail replacements are available for $7 per nail.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion">
          <input type="checkbox" id="accordion-2" className="accordion-toggle" />
          <label htmlFor="accordion-2" className="accordion-title bg-inherit pl-2">
            Shipping
          </label>
          <span className="accordion-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
          </span>
          <div className="accordion-content">
            <div className="min-h-0 flex flex-col gap-y-2 pl-2">
              Standard shipping (1-3 business days) is $5 through USPS Mail.
              <span style={{ fontStyle: "italic" }}>I am not responsible for packages once shipped out!</span>
            </div>
          </div>
        </div>
        <div className="accordion">
          <input type="checkbox" id="accordion-3" className="accordion-toggle" />
          <label htmlFor="accordion-3" className="accordion-title bg-inherit pl-2">
            Returns
          </label>
          <span className="accordion-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
          </span>
          <div className="accordion-content">
            <div className="min-h-0 flex flex-col gap-y-2 pl-2">
              Since each order is custom made for you, I am unable to accept refunds or exchanges of any kind.
              <span>
                If you are unsure about sizing, I highly recommend ordering a sizing kit as I do not offer
                refunds for incorrect sizing.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
