interface bmiValues {
  height: number;
  weight: number;
  units: string;
}

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

export const calculateBmi = (height: number, weight: number, unit: string) => {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const parseAndCalculateBmi = (args: Array<string>): bmiValues => {
  if (args.length < 5) throw new Error('Not enough arguments');
  if (args.length > 5) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
      units: args[4],
    };
  } else throw new Error('Provided values must be numbers!');
};

// Test parseAndCalculateBmi()
// try {
//   const { height, weight, units } = parseAndCalculateBmi(process.argv);
//   const bmi = calculateBmi(height, weight, units);
//   console.log(bmi);
// } catch (error: unknown) {
//   let errorMessage = 'Something went wrong.';
//   if (error instanceof Error) {
//     errorMessage += ` Error: ${error.message}`;
//   }
//   console.log(errorMessage);
// }
