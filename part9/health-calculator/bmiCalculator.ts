const bmiCategories = [
  'Underweight (Severe thinness)',
  'Underweight (Moderate thinness)',
  'Underweight (Mild thinness)',
  'Normal range',
  'Overweight (Pre-obese)',
  'Obese (class I)',
  'Obese (class II)',
  'Obese (class III)',
];

const analyzeBmi = (bmi: number): string => {
  let prefix = '';

  if (bmi < 16) {
    prefix = bmiCategories[0];
  } else if (bmi < 17) {
    prefix = bmiCategories[1];
  } else if (bmi < 18.5) {
    prefix = bmiCategories[2];
  } else if (bmi < 25) {
    prefix = bmiCategories[3];
  } else if (bmi < 30) {
    prefix = bmiCategories[4];
  } else if (bmi < 35) {
    prefix = bmiCategories[5];
  } else if (bmi < 40) {
    prefix = bmiCategories[6];
  } else {
    prefix = bmiCategories[7];
  }

  return `BMI: ${bmi.toFixed(2)} - ${prefix}`;
};

const calculateBmi = (height: number, weight: number, unit: string) => {
  if (height !== 0 && weight !== 0) {
    const bmi = weight / Math.pow(height, 2);

    switch (unit) {
      case 'metric':
        return analyzeBmi(bmi);
      case 'imperial':
        return analyzeBmi(bmi * 703);
      default:
        throw new Error('Provided unit must be either metric or imperial');
    }
  } else throw new Error('Cannot divide by 0!');
};

export const parseAndCalculateBMI = (
  arg1: number,
  arg2: number,
  arg3: string
) => {
  if (!arg1 || !arg2 || !arg3) {
    throw new Error(
      'Not enough arguments. Provide Height, Weight, and Unit respectively.'
    );
  }

  if (!isNaN(Number(arg1)) && !isNaN(Number(arg2))) {
    const height = Number(arg1);
    const weight = Number(arg2);
    const unit = arg3;
    return calculateBmi(height, weight, unit);
  } else throw new Error('Height and Weight values must be numbers!');
};
