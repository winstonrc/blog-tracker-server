import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveData());
});

router.post('/', (_req, res) => {
  res.send(patientService.addData());
});

export default router;
