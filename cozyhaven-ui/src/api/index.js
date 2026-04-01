import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log(token)
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

// Properties
export const getAllProperties = () => API.get('/properties');
export const searchProperties = (location) => API.get(`/properties/search?location=${location}`);
export const addProperty = (data) => API.post('/properties', data);

// Rooms (Accommodations)
export const getRoomsByProperty = (propertyId) => API.get(`/rooms/${propertyId}`);
export const addRoom = (data) => API.post('/rooms', data);

// Reservations
export const createReservation = (data) => API.post('/reservations', data);
export const getUserReservations = (userId) => API.get(`/reservations/user/${userId}`);
export const cancelReservation = (id) => API.put(`/reservations/cancel/${id}`);

// Payments
export const processPayment = (data) => API.post('/payments', data);

// Feedback
export const addFeedback = (data) => API.post('/feedback', data);
// Get all users
export const getAllUsers = () => API.get('/users/all');

// Delete user
export const deleteUserById = (id) => API.delete(`/users/${id}`);
export const getFeedbackByProperty = (propertyId) =>
  API.get(`/feedback/property/${propertyId}`);

export const getAllReservations = () => API.get("/reservations");
export const getOwnerBookings = () => API.get("/reservations/owner");
export default API;
