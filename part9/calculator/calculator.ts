type Operation = 'add' | 'subtract' | 'multiply' | 'divide';
type Result = number;

export const calculator = (a: number, b: number, op: Operation): Result => {
  switch (op) {
    case 'add':
      return a + b;
    case 'subtract':
      return a - b;
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    default:
      throw new Error('Operation not supported!');
  }
};

try {
  console.log(calculator(1, 5, 'divide'));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

console.log(process.argv);
