import React, {useState, useRef} from 'react'
import {FaLocationArrow} from 'react-icons/fa'
import {FaCalendarDay} from 'react-icons/fa'
import {TbPlaneArrival, TbPlaneDeparture} from "react-icons/tb"
import suggestionServices from '../services/suggestion-services'
import { useEffect } from 'react'


const Search = () => {
    const [result, setResult] = useState()
    const [tier, setTier] = useState("Economy")
    
    const tierList = ["Economy", "Business", "First Class"]
    const tierRef = useRef()
    const departureRef = useRef()
    const destinationRef = useRef()
    const departureTimeRef = useRef()
    const optionRef = useRef()

    useEffect(() => {
        if (tier && tier.current) {
            tierRef.current?.focus();
          }
    }, [tier])

    const selectTier = (tierIndex) => {
        setTier(tierList[tierIndex])
    }

    const handleRequestSuggestion = async() => {
        let inputData = {
            tier: tier,
            departure: departureRef.current?.value,
            destination: destinationRef.current?.value,
            departureTime: departureTimeRef.current?.value,
            option: optionRef.current?.value
        }
       const response  = await suggestionServices.getRequestSuggestion(inputData)
        console.log(response)
       if (response.status === 200) {
        console.log("was successful")
        console.log(response.data)
        setResult(
            response.data
        )
       }
    }

  return (
    <div className='search container section'>
        <div className="sectionContainer grid">
            <div  className="button flex">
                <div ref={tierRef} className="oneButton " onClick={() =>  selectTier(0)}>
                    <span >Economy</span>
                </div>
                <div ref={tierRef}  className="oneButton" onClick={() => selectTier(1)}>
                    <span>Business Class</span>
                </div>
                <div ref={tierRef}  className="oneButton" onClick={() => selectTier(2)}>
                    <span>Fast Class</span>
                </div>
            </div>

            <div  className="inputs flex">
                    <div className="oneInput flex">
                        <div className="inputIcon">
                            <TbPlaneDeparture className='icon'/>
                        </div>
                        <div className="texts">
                            <h4>Departure</h4>
                            <input ref={departureRef} type="text" placeholder='LAX'/>
                        </div>
                    </div>
                    <div className="oneInput flex">
                        <div className="inputIcon">
                            <TbPlaneArrival className='icon'/>
                        </div>
                        <div className="texts">
                            <h4>Destination</h4>
                            <input ref={destinationRef} type="text" placeholder='Add date'/>
                        </div>
                    </div>
                    <div className="oneInput flex">
                        <div className="inputIcon">
                            <FaCalendarDay className='icon'/>
                        </div>
                        <div className="texts">
                            <h4>Departure Time</h4>
                            <input ref={departureTimeRef} type="text" placeholder='Add date'/>
                        </div>
                    </div>
                    <div className="oneInput flex">
                        <div className="inputIcon">
                            <FaCalendarDay className='icon'/>
                        </div>
                        <div className="texts">
                            <h4>Option</h4>
                            <input ref={optionRef} type="text" placeholder='Cheap or Fast'/>
                        </div>
                    </div>
                    <button className='button buttonBlock flex' onClick={handleRequestSuggestion}>Search Flight</button>
            </div>
            {!result ? <div>No Output</div> : <div>
                        <h2>Suggestion</h2>    
                        <ul>
                            <li>Departure: {result.departure}</li>
                            <li>Destination: {result.destination}</li>
                            <li>Price ${result.price}</li>
                            <li>Duration: {result.duration}</li>
                        </ul>
                    </div>}
        </div>
    </div>
  )
}

export default Search