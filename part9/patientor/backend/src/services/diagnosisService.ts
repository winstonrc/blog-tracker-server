import diagnosisData from '../data/diagnoses.json';
import { Diagnosis, DiagnosisWithoutLatin } from '../types';

const diagnoses: Array<Diagnosis> = diagnosisData;

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
