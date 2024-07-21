import cronjobRoutes from './cronjobs.router';
import express from 'express';

const api = express.Router();

api.use('/cronjobs', cronjobRoutes);

export default api;