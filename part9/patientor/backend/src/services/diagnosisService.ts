import diagnoses from '../data/diagnoses';
import { Diagnosis, DiagnosisWithoutLatin } from '../types';

const getData = (): Diagnosis[] => {
  return diagnoses;
};

const getDataWithoutLatin = (): DiagnosisWithoutLatin[] => {
  return diagnoses.map(({ code, name }) => ({
    code,
    name,
  }));
};

const addData = () => {
  return [];
};

export default { getData, getDataWithoutLatin, addData };
