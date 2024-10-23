import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_BASE_URL = `${BACKEND_URL}/api/users`;


const sendAutomatedEmail = async (emailData) => {
  const response = await axios.post(`${API_BASE_URL}/sendAutomatedEmail`, emailData);
  return response.data.message;
};


const emailService = {
  sendAutomatedEmail,
};

export default emailService;