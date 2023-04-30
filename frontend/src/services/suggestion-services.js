import axiosInst from "./axios";


const getRequestSuggestion = async (props) => {
    return await axiosInst.get(`/suggestion/search/${props.departure}/${props.destination}/${props.departureTime}/${props.tier}/${props.option}`, {withCredentials: false})
}

const suggestionServices = {    
    getRequestSuggestion: getRequestSuggestion
}

export default suggestionServices