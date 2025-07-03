import api from './api';

export const getMovimientos = () => api.get('/movimientos');
export const getMovimiento = (id) => api.get(`/movimientos/${id}`);
export const createMovimiento = (data) => api.post('/movimientos', data);
export const updateMovimiento = (id, data) => api.put(`/movimientos/${id}`, data);
export const deleteMovimiento = (id) => api.delete(`/movimientos/${id}`);