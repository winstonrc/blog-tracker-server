interface arguments {
  target: number;
  hoursArray: Array<number>;
}

interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (args: Array<string>): arguments => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2]))) {
    return {
      target: Number(args[2]),
      hoursArray: Array(Number(args[3])),
    };
  } else throw new Error('Provided values must be numbers!');
};

const calculateExercises = (
  target: number,
  hoursLog: Array<number>
): result => {
  const periodLength = hoursLog.length;

  const trainingDays = hoursLog.filter((h) => h > 0).length;

  let sum = 0;
  hoursLog.map((dayHours) => (sum += dayHours));

  const average = sum / periodLength;

  const success = average >= target;

  let rating: number;
  if (average >= target) {
    rating = 3;
  } else if (average >= target * 0.66) {
    rating = 2;
  } else {
    rating = 1;
  }

  let ratingDescription: string;

  if (rating === 3) {
    ratingDescription = 'You met your goal';
  } else if (rating === 2) {
    ratingDescription = 'You hit 2/3 of your goal';
  } else if (rating === 1) {
    ratingDescription =
      'Try to improve next week and/or adjust your goal to be less aggressive';
  } else throw new Error('Rating must be between 1-3');

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  // const { target, hoursArray } = parseExerciseArguments(process.argv);
  const target: number = 2;
  const hoursArray: Array<number> = [0, 0, 2, 2, 0, 3, 1];
  const calculation = calculateExercises(target, hoursArray);
  console.log(
    `periodLength: ${calculation.periodLength},
    trainingDays: ${calculation.trainingDays},
    success: ${calculation.success},
    rating: ${calculation.rating},
    ratingDescription: ${calculation.ratingDescription},
    target: ${calculation.target},
    average: ${calculation.average},`
  );
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }
  console.log(errorMessage);
}
