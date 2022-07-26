interface arguments {
  target: number;
  array: Array<number>;
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

export const calculateExercises = (
  target: number,
  dailyExercises: Array<number>
): result => {
  const periodLength = dailyExercises.length;

  const trainingDays = dailyExercises.filter((h) => h > 0).length;

  const sum = dailyExercises.reduce((acc, cur) => acc + cur, 0);

  const average = Math.round((sum / periodLength) * 100) / 100;

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

export const parseAndCalculateExercises = (
  arg1: number,
  arg2: Array<number>
) => {
  if (!arg1 || !arg2) {
    throw new Error(
      'Not enough arguments. Provide target and daily_exercises respectively.'
    );
  }

  if (!isNaN(Number(arg1))) {
    const target = Number(arg1);
    const dailyExercises = arg2.slice(1).map((a: number) => {
      return Number(a);
    });

    return calculateExercises(target, dailyExercises);
  } else throw new Error('Provided values must be numbers!');
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const parseExerciseArguments = (args: Array<string>): arguments => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2]))) {
    return {
      target: Number(args[2]),
      array: args.slice(3).map((a: string) => {
        return Number(a);
      }),
    };
  } else throw new Error('Provided values must be numbers!');
};

// Test parseExerciseArguments
// try {
// const { target, array } = parseExerciseArguments(process.argv);
// const calculation = calculateExercises(target, array);
// console.log(
// `Results:
// periodLength: ${calculation.periodLength},
// trainingDays: ${calculation.trainingDays},
// success: ${calculation.success},
// rating: ${calculation.rating},
// ratingDescription: ${calculation.ratingDescription},
// target: ${calculation.target},
// average: ${calculation.average}`
// );
// } catch (error: unknown) {
// let errorMessage = 'Something went wrong.';
// if (error instanceof Error) {
// errorMessage += ` Error: ${error.message}`;
// }
// console.log(errorMessage);
// }
