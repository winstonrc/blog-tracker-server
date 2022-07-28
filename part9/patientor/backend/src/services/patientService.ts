import patients from '../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';

const getNonSensitivePatient = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getNonSensitivePatientById = (
  id: string
): NonSensitivePatient | undefined => {
  const patient = getNonSensitivePatient().find((p) => p.id === id);
  return patient;
};

const addPatient = (id: string, patient: NewPatient): Patient => {
  const newPatient = {
    id,
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatient,
  getNonSensitivePatientById,
  addPatient,
};
