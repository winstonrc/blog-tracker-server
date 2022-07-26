import express from 'express';
import { parseAndCalculateBMI } from './bmiCalculator';

const app = express();
const PORT = 3002;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;
  const unit = req.query.unit;
  const bmi = parseAndCalculateBMI(height, weight, unit);

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
