import mongoose, { Schema } from "mongoose"

// May modifier depending on result of calculation
const FlightSuggestionSchema = new Schema({
    userId: {type: mongoose.Types.ObjectId},
    airlineName: String,
    departure: String,
    destination: String,
    departureTime: Date,
    arrivalTime: Date,
    tier: {
        type: String,
        enum: ["Business", "Economy", "First"],
        default: "Economy"
    },
    price: mongoose.Types.Decimal128
}, {timestamps: true})

const FlightSuggestionModel = mongoose.model(
    "FlightSuggestion", FlightSuggestionSchema)

export default FlightSuggestionModel;