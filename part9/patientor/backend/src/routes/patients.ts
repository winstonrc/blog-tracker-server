import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';
import { v1 as uuidv1 } from 'uuid';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatient());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getNonSensitivePatientById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const id = uuidv1();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(id, newPatient);

    res.json(addedPatient);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }

    res.status(400).send(errorMessage);
  }
});

export default router;
