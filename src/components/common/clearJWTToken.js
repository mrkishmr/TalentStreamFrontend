import axios from 'axios';
import ApplicantAPIService, { apiUrl } from '../../services/ApplicantAPIService';
const clearJWTToken = async () => {
  try {
    await axios.post(`${apiUrl}/applicant/applicantsignOut`);
    localStorage.removeItem('jwtToken'); 
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Error logging out:', error);
    throw new Error('Logout failed');
  }
};
export default clearJWTToken;
