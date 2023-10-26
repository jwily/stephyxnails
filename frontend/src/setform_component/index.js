import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const SetForm =  ()=> {

  const history = useHistory()

  const [tier, setTier] = useState("") 
  const [shape, setShape] = useState("")
  const [sizes, setSizes] = useState("")
  const [description, setDescription] = useState("")

  const [page, setPage] = useState(1)
  const [checkInput, setCheckInput] = useState(true)
  const [errors, setErrors] = useState([])

  const tiers = ['Budding Tier', 'Petal Tier', 'Skaura Tier', 'Blossom Tier']

  useEffect(() => {

    const errors = []

    // Nail Tier Selection is a required radio selection 

    // Nail Shape & length
    if (page === 3) {

    }

    // Nail photo upload AWS with

    // Nail description   
    if (page === 5) {
        if (description.trim().length < 10) {
            setCheckInput(true)
        }
    }

    // Nail extra (charms)
    if (page === 6) {

    }

  }, [page, tier, shape, sizes])

  // toggle between pannels 
  let formButton;
  if (page > 1) {
    formButton = (
        <>
          <button 
            type="button" 
            onClick={() => {setPage(page - 1); 
            setCheckInput(false)}}
            className="#">
            Back
          </button>
          <button 
            type="button" 
            onClick={() => {setPage(page + 1); 
            setCheckInput(true)}} 
            className="#" 
            disabled={checkInput}>
            Next
          </button>
        </>
      )
  }

  if (page === 6) {
    formButton = (
        <>
            <button 
                type="button"
                onClick={() => { etPage(page - 1);
                    setCheckInput(false)}}
                className="#">
                back
            </button>
        </>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const setData = {
        tier,
        shape,
        sizes,
        discription 
    }
  }

  return (
    <>
    <div> 
        <div> 
            // Header/ Navigation Bar 
        </div>
        <div> 
        // Set Form Carousel 
        { page === 1 &&
            <section>
                <div>
                <h2>Let's create your custom nail set!</h2>
                    <button
                        className="#"
                        onClick={() => setPage(2)}
                    >
                    </button>
                </div>
            </section>
        }
        <form onSubmit={handleSubmit} className={page < 8 ? "block" : "hidden"}>
        // Nail Tier Selection
        { page === 2 &&
            <section className={page === 2 ? "block" : "hidden"}>
                <div>
                <h2>1. Pick a Nail Tier</h2>
                    <div> 
                    <label>Please choose the Nail Tier that best fits your custom needs</label>
                        <div> 
                        {tiers.map((nail_tier) => {
                            return (
                                <div> 
                                <input 
                                    className="#"
                                    name={tier}
                                    type="radio"
                                    id={nail_tier}
                                    checked= {tier === nail_tier}
                                    value={tier}
                                />
                                <label for={nail_tier}> {nail_tier}</label>
                                </div>
                            )
                        })}
                        </div>
                        <div className="#">{formButton}</div>
                    </div>
                </div>
            </section>
        }
        // Nail Shape & length
        { page === 3 &&
            <section className={ page === 3 ? "block" : "hidden" }>
                <div>
                <h2>2. Choose your preferred nail shape and length</h2>
                    <div>
                    <select>

                    </select>
                    </div>
                </div>
                <div className="#">{formButton}</div>
            </section>         
        }
        // Nail photo upload
        { page === 4 &&
            <section className={ page === 4 ? "block" : "hidden" }>
                <div>
                <h2>3. Upload your inspiration pictures!</h2>
                    <div>
                        // AWS plug-in?
                    </div>
                </div>
                <div className="#">{formButton}</div>
            </section>
        }
        // Nail description 
        { page === 5 &&
            <section className={ page === 5 ? "block" : "hidden" } >
                <div>
                <h2>4. Nail description</h2>
                    <div>
                    <label>Go into Detail</label>
                        <textarea
                            className="#"
                            type="text"
                            placeholder="#"
                            value={description}
                            onChange={e => { setDescription(e.target.value); setCheckInput(false) }}
                            maxLength={5000}
                        >
                        </textarea>
                    </div>
                </div>
                <div className="#">{formButton}</div>
            </section>
        }
            // Nail extra (charms)
            { page === 6 &&
                <section className={ page === 6 ? "block" : "hidden" }>
                    <div>
                    <h2>5. Nail Add-ons </h2>
                        <div>
                        <label>Would you like to include charms on to your</label>

                        </div>
                    </div>
                    <div className="#">{formButton}</div>
                </section>
            }
        </form>
      

        </div>
    </div>
    </>
  )
  

}

export default SetForm
