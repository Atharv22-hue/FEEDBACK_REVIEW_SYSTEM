import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchFeedbacks = () => axios.get(api);
export const submitFeedback = (data) => axios.post(api, data);
export const updateFeedback = (id, data) => axios.patch(`${api}/${id}`, data);
export const deleteFeedback = (id) => axios.delete(`${api}/${id}`);


export default api;


  
