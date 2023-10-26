import React, { useEffect, useState } from "react";

const SetForm =  () => {

    const [page, setPage] = useState(1)

    const [tier, setTier] = useState("")  // radio selection 

    // Considering if we choose to have two selection menus
        //  [Square, Coffin, Round, Almond, Stiletto] Shape
        // [xs, s, m, l, xl] length
        //   const [shape, setShape] = useState("") 
        //   const [length, setLength] = useState("")

    const [shape, setShape] = useState("")
    // AWS photo upload? 
    const [description, setDescription] = useState("")

     // Currently just for extra charms
     // Remember discussing maybe adding an insurance option (if nail is broke or lost)
    const [extra, setExtra] = useState("")

    const [checkInput, setCheckInput] = useState(true)

    // Creating an empty array to add all set order submissions 
    const [submissions, setSubmissions] = useState([]) 

    const allTiers = ['Budding Tier', 'Petal Tier', 'Sakura Tier', 'Blossom Tier']

  // Wondering if we need this validator
  useEffect(() => {


    // Nail Tier Selection is a required radio input 
    // Nail Shape & Length is a required selection input 
    // Nail Photo Upload AWS - will this be optional? 
   
    // Nail description must be greater than 10 character length
    if (page === 5 ) {
        if (description.trim().length < 10) {
            setCheckInput(true)
        }
    }


    const ShapeSet = async () => {
        const response = await fetch('/api/sets/');
        if (response.ok) {
          const res = await response.json();
          console.log(res, 'look here');
          return res;
        }
      }


    // Nail Extra (Charms) - $5 a Charm optional 
  }, [page,description])

  // toggling between page pannels 
  let formButton;
  // pages after first page will have a back and next option
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

  console.log(page)

  const handleSubmit = (e) => {
    e.preventDefault()

    // Add the current form data to the submissions array
    setSubmissions([...submissions, { tier, shape, description, extra}]);

    // Clear the individual state variables for the next submission
    setTier('');
    setShape('');
    setDescription('');
    setExtra('')
  }


  const handleReturnToForm = () => {

    // Ideally it brings the user back to the beginning of the form
    setPage(1);

  };

  return (
    <>
    <div className="#"> 
        <div className="#"> 
        </div>
        <div className="#"> 
        { page === 1 &&
            // If section is === page 1 it will be on visible (block for block-level element) otherwise if it is not on page1, this block-level element is hidden
            // What happens if they want to to return to order form information 
            <section className={page === 1 ? "block" : "hidden"}>
                <div className="#">
                <h2>Let's create your custom nail set!</h2>
                    <button
                        className="#"
                        onClick={() => setPage(2)}
                    > next
                    </button>
                </div>
            </section>
        }
        <form onSubmit={handleSubmit} className={page < 6 ? "block" : "hidden"}> 
        { page >= 2 &&
            <section className={page === 2 ? "block" : "hidden"}>
                <div className="#">
                <h2>1. Pick a Nail Tier</h2>
                    <div className="#"> 
                    <label>Please choose the Nail Tier that best fits your custom needs</label>
                    <p>insert disclaimer</p>
                        <div className="#"> 
                        {allTiers.map((nail_tier) => {
                            // Mapping through the allTiers array
                            return (
                                <div className="#"> 
                                <input 
                                    // key={nail_tier}
                                    className="#"
                                    name={tier}
                                    type="radio"
                                    id={nail_tier}
                                    checked= {tier === nail_tier} 
                                    value={tier}
                                    onChange={(e) => { setTier(nail_tier) }}
                                    required
                                />
                    
                                    {/* <label for={nail_tier === "Budding Tier"}>{"Description of budding tier"}</label> */}
                                <label htmlFor={nail_tier}> {nail_tier}</label>
                                </div>
                            )
                        })}
                        </div>
                        <div className="#">{formButton}</div>
                    </div>
                </div>
            </section>
        }
        { page >= 3 &&
            <section className={ page === 3 ? "block" : "hidden" }>
                <div classname="#">
                <h2>2. Choose your preferred nail shape and length</h2>
                    <div classname="#">
                    <label>Select from the following shape options</label>
                    <p>insert disclaimer</p>
                         <div className="#"> 
                            <select 
                                classname="#"
                                value={shape}
                                onChange={(e) => { setShape(e.target.value) }}
                                required
                            >
                            </select>
                        </div>
                    </div>
                </div>
                <div className="#">{formButton}</div>
            </section>         
        }
        { page >= 4 &&
            <section className={ page === 4 ? "block" : "hidden" }>
                <div classname="#">
                <h2>3. Upload your inspiration pictures!</h2>
                    <div classname="#">
                    <label>Share your photos with me</label>
                    <p>insert disclaimer</p>
                        <div>
                            // Add AWS plug-in? 
                        </div>
                    </div>
                </div>
                <div className="#">{formButton}</div>
            </section>
        }
        { page >= 5 &&
            <section className={ page === 5 ? "block" : "hidden" } >
                <div classname="#">
                <h2>4. Nail description</h2>
                    <div classname="#">
                    <label>Go into Detail</label>
                    <p>insert disclaimer</p>
                        <div classname="#">
                            <textarea
                            className="#"
                            type="text"
                            placeholder="#"
                            value={description}
                            onChange={ (e) => { setDescription(e.target.value);  setCheckInput(false) }}
                            maxLength={5000}
                            >
                            </textarea>
                        </div>
                    </div>
                </div>
                <div className="#">{formButton}</div>
            </section>
        }
        { page >= 6 &&
            <section className={ page === 6 ? "block" : "hidden" }>
                <div classname="#">
                <h2>5. Nail Add-ons </h2>
                    <div>
                    <label>Would you like to include charms on to your</label>
                    <p>insert disclaimer</p>
                        <div className="">
                            <input
                                className="#"
                                type="number"
                                placeholder=""
                                // value={}
                                onChange={e => { setExtra(e.target.value); }}>
                            </input>
                        </div>
                        <label className="#">Charms ($5 each)</label>
                    </div>
                </div>
                <div className="#">
                    <button 
                        type="button" 
                        onClick={() => { setPage(5); 
                        setCheckInput(false) }} 
                        className="#">
                        Back
                    </button>
                    <button 
                        type="submit" 
                        className="#"
                        disabled={checkInput}
                    >
                        Submit
                    </button>
                </div>   
            </section>
        }
        </form>
        <div className="#">
            {page >= 7 && (
            <div className="#">
            <h2>Previous Submissions</h2>
                <div>
                <ul>
                    {submissions.map((submission, index) => (
                    <li key={index}>
                        Tier: {submission.tier}, 
                        Shape: {submission.shape}, 
                        Description: {submission.description}
                        Extra: {submission.extra}
                    </li>
                    ))}
                </ul>
                </div>
                <div>
                    <button
                        type="button" 
                        onClick={handleReturnToForm}
                        className="#">
                        Add Another Set
                    </button>

                </div>
            </div>
            )}
        </div>
      
        </div>
    </div>
    </>
  )

}

export default SetForm
