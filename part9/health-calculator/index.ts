import express from 'express';
import { parseAndCalculateBMI } from './bmiCalculator';

const app = express();
const PORT = 3002;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const unit = String(req.query.unit);

  if (!height) {
    res.send({ error: 'height parameter missing' });
  }

  if (!weight) {
    res.send({ error: 'weight parameter missing' });
  }

  if (!unit) {
    res.send({ error: 'unit parameter missing' });
  }

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
