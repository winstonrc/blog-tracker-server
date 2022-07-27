import patients from '../data/patients';
import { NonSensitivePatient } from '../types';

const getNonSensitiveData = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getNonSensitiveDataById = (
  id: string
): NonSensitivePatient | undefined => {
  const patient = getNonSensitiveData().find((p) => p.id === id);
  return patient;
};

const addData = () => {
  return [];
};

export default { getNonSensitiveData, getNonSensitiveDataById, addData };
