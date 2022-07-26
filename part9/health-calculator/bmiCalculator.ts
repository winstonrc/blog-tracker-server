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

const calculateBmi = (height: number, weight: number, unit: string) => {
  if (height !== 0 && weight !== 0) {
    const bmi = weight / Math.pow(height, 2);
    // const bmi = ((weight / (height * height)) * 100) / 100;

    switch (unit) {
      case 'metric':
        return analyzeBmi(bmi);
      // return Math.round((weight / (height * height)) * 100) / 100;
      case 'imperial':
        return analyzeBmi(bmi * 703);
      // return Math.round(((weight * 703) / (height * height)) * 100) / 100;
      default:
        throw new Error('Provided unit must be either metric or imperial');
    }
  } else throw new Error('Cannot divide by 0!');
};

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

export const parseAndCalculateBMI = (arg1: any, arg2: any, arg3: any) => {
  console.log('arg1', arg1);
  console.log('arg2', arg2);
  console.log('arg3', arg3);

  if (!arg1 || !arg2 || !arg3) {
    throw new Error(
      'Not enough arguments. Provide Height, Weight, and Unit respectively.'
    );
  }

  const height = parseFloat(arg1);
  const weight = parseFloat(arg2);
  const unit = arg3;

  if (!isNaN(Number(arg1)) && !isNaN(Number(arg2))) {
    return calculateBmi(height, weight, unit);
  } else throw new Error('Height and Weight values must be numbers!');
};
