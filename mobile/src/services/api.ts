import axios from "axios";

const api = axios.create({
  baseURL: "https://cookbookufpi.herokuapp.com"
})

export default api;