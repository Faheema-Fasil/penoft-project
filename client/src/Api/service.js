import API from "./axios"

const fetchData=({endpoint})=>{
   return API.get(endpoint)
}

const postData=({endpoint,data})=>{
    return API.post(endpoint,data)
}
export default {fetchData,postData};