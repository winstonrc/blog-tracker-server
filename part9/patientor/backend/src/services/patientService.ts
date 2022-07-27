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

const addData = () => {
  return [];
};

export default { getNonSensitiveData, addData };
