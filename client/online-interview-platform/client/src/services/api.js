import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Update with your server URL

export const fetchInterviews = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/interviews`);
    return response.data;
  } catch (error) {
    console.error('Error fetching interviews:', error);
    throw error;
  }
};

export const createInterview = async (interviewData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/interviews`, interviewData);
    return response.data;
  } catch (error) {
    console.error('Error creating interview:', error);
    throw error;
  }
};

export const updateInterview = async (interviewId, interviewData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/interviews/${interviewId}`, interviewData);
    return response.data;
  } catch (error) {
    console.error('Error updating interview:', error);
    throw error;
  }
};

export const deleteInterview = async (interviewId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/interviews/${interviewId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting interview:', error);
    throw error;
  }
};