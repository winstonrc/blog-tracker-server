import { NewDiaryEntry, Weather, Visibility } from './types';

type Fields = {
  date: unknown;
  weather: unknown;
  visibility: unknown;
  comment: unknown;
};

const errorMessage = (objectType: string, object?: unknown): Error => {
  return new Error(`Incorrect or missing ${objectType}: ${object}`);
};

const toNewDiaryEntry = ({
  date,
  weather,
  visibility,
  comment,
}: Fields): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    date: parseDate(date),
    weather: parseWeather(weather),
    visibility: parseVisibility(visibility),
    comment: parseComment(comment),
  };

  return newEntry;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw errorMessage('date', date);
  }

  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isWeather(weather)) {
    throw errorMessage('weather', weather);
  }

  return weather;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isWeather = (param: any): param is Weather => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Weather).includes(param);
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!visibility || !isVisibility(visibility)) {
    throw errorMessage('visibility', visibility);
  }

  return visibility;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isVisibility = (param: any): param is Visibility => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Visibility).includes(param);
};

const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw errorMessage('comment');
  }

  return comment;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export default toNewDiaryEntry;
