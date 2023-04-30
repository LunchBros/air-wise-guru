//import { serializeUser } from "passport";
import FlightSuggestionModel from "../models/flight-suggestion.js";
import UserModel from "../models/user.js"

async function RequestSuggestion(req, res) {
    // Call suggestion calculation algorithm
    let departure = req.params.departure
    let destination = req.params.destination
    let departureTime = req.params.departureTime
    let option = req.params.option

    const data1 = {
        arrivalTime: "2345",
        departureTime: "2153",
        brandName: "United",
        price: 255.0,
        duration: "1 hour and 42 minutes",
    }
    
    const data2 = {
        arrivalTime: "2010",
        departureTime: "0032",
        brandName: "Delta",
        price: 412.0,
        duration: "14 hour and 23 minutes",
    }
    
    const data3 = {
        arrivalTime: "2345",
        departureTime: "1244",
        brandName: "American",
        price: 330.0,
        duration: "11 hours and 1 minute",
    }

    const data4 = {
        arrivalTime: "2345",
        departureTime: "1835",
        brandName: "Southwest",
        price: 274.0,
        duration: "5 hours and 10 minutes",
    }

    const suggestion = {
        departure: "LAX",
        destination: "BKK",
        arrivalTime: 2345,
        departureTime: 1745,
        airlineName: "Southwest",
        price: 278.0,
        duration: "6 hours",
    }

    let result;
    if ( option.toLowerCase() == "cheap") {
        result = suggestion
    }

    if (option.toLowerCase() == "fast") {
        result = suggestion
    }

    if (!result) {
        res.status(204)
    }

    if (req.session?.passport?.user) {
        const newFlightSuggestion = new FlightSuggestionModel({
            userId: req.session.passport.user._id,
            departure: suggestion.departure,
            destination: suggestion.destination,
            arrivalTime: suggestion.arrivalTime,
            departureTime: suggestion.departureTime,
            airlineName: suggestion.brandName,
            price :suggestion.price
        })

        let instance = await newFlightSuggestion.save()
        
        if (instance) {
            await UserModel.findOneAndUpdate({ _id: req.session.passport.user._id}, {
                $push: { suggestions: instance._id}
            })
        } else {
            res.status(400)
        }
    } 

    return res.status(200).json(result)
}

async function GetSuggestions(req, res) {
    await FlightSuggestionModel.find({userId: req.session.passport.user._id})
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400))
}

async function RemoveSuggestion(req, res) {
    let suggestionId = req.params.id
    await FlightSuggestionModel.findByIdAndDelete(suggestionId)
    .then(() => res.status(200).send({message: "a suggestion was deleted"})
    .then(() => {
        UserModel.updateOne({_id: req.session.passport.user._id}, {
            $pullAll: {
                suggestions: [suggestionId]
            }
        })
        
        return res.status(200).json({message: "a suggestion was removed"})
    })
    .catch((error) => {
        console.log(error.message)
        return res.status(400).send({error: "bad request"}) 
    })
    )
}

const suggestionControllers = {
    RequestionSuggestion: RequestSuggestion,
    GetSuggestions: GetSuggestions,
    RemoveSuggestion: RemoveSuggestion
}

export default suggestionControllers