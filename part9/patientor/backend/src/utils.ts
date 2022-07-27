import { NewPatient, Gender } from './types';

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString('name', name),
    dateOfBirth: parseString('dateOfBirth', dateOfBirth),
    ssn: parseString('ssn', ssn),
    gender: parseGender(gender),
    occupation: parseString('occupation', occupation),
  };

  return newPatient;
};

const parseString = (objectName: string, object: unknown): string => {
  if (!object || !isString(object)) {
    throw new Error(
      `${objectName} is missing or is the incorrect type: ${object}`
    );
  }

  return object;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Gender is missing or is the incorrect type:`);
  }

  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

export default toNewPatient;
