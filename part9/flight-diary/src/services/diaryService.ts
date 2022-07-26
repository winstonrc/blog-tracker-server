import diaryData from '../data/diaries';
import { DiaryEntry, NonSensitiveEntries } from '../types';

const diaries: Array<DiaryEntry> = diaryData;

const getEntries = (): Array<DiaryEntry> => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveEntries[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addDiary = () => {
  return [];
};

export default { getEntries, addDiary, getNonSensitiveEntries };
