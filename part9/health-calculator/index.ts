import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
const PORT = 3002;

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const unit = String(req.query.unit);

  if (!height || !weight || !unit) {
    res.status(400).send({ error: 'parameters missing' });
  }

  if (isNaN(height) || isNaN(weight) || typeof unit !== 'string') {
    res.status(400).send({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(height, weight, unit);

  let heightAppendix = '';
  if (unit === 'metric') {
    heightAppendix = 'm';
  } else if (unit === 'imperial') {
    heightAppendix = 'in';
  }

  let weightAppendix = '';
  if (unit === 'metric') {
    weightAppendix = 'kg';
  } else if (unit === 'imperial') {
    weightAppendix = 'lb';
  }

  res.send({
    height: `${height} ${heightAppendix}`,
    weight: `${weight} ${weightAppendix}`,
    unit,
    bmi,
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target = Number(req.body.target);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises } = req.body;

  if (!target || !daily_exercises) {
    return res.status(400).send({ error: 'parameters missing' });
  }

  if (isNaN(Number(target)) || typeof daily_exercises === 'string') {
    return res.status(400).send({ error: 'malformatted paramaters' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(target, daily_exercises);
  return res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
