interface bmiValues {
  mass: number;
  height: number;
  units: string;
}

const parseArguments = (args: Array<string>): bmiValues => {
  if (args.length < 5) throw new Error('Not enough arguments');
  if (args.length > 5) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      mass: Number(args[2]),
      height: Number(args[3]),
      units: args[4],
    };
  } else throw new Error('Provided values must be numbers!');
};

const calculateBmi = (mass: number, height: number, units: string): number => {
  if (height !== 0 && mass !== 0) {
    switch (units) {
      case 'metric':
        return Math.round((mass / (height * height)) * 100) / 100;
      case 'imperial':
        return Math.round(((mass * 703) / (height * height)) * 100) / 100;
      default:
        throw new Error('Provided unit must be either kg or lb');
    }
  } else throw new Error('Cannot divide by 0!');
};

const analyzeBmi = (bmi: number): string => {
  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  } else if (bmi < 17) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (bmi < 25) {
    return 'Normal range';
  } else if (bmi < 30) {
    return 'Overweight (Pre-obese)';
  } else if (bmi < 35) {
    return 'Obese (class I)';
  } else if (bmi < 40) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
};

try {
  const { mass, height, units } = parseArguments(process.argv);
  const bmi = calculateBmi(mass, height, units);
  console.log(`BMI: ${bmi}`);
  console.log(analyzeBmi(bmi));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }
  console.log(errorMessage);
}
