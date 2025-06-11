import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apiafro.aafrodites.com',
});

export const fetchModelDetails = (id) => api.get(`/models/${id}`);
export const fetchEventData = (id) => api.get(`/models/event/${id}`);
export const fetchVille = () => api.get('/ville');
export const fetchNationalite = () => api.get('/nationalite');
export const fetchLangue = () => api.get('/langue');
