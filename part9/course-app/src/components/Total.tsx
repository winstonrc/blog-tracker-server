import { CoursePart } from '../types';

const Total = ({ parts }: { parts: CoursePart[] }) => {
  const totalParts = parts.reduce(
    (carry: number, part: { exerciseCount: number }) =>
      carry + part.exerciseCount,
    0
  );

  return (
    <div>
      <p>Number of exercises: {totalParts}</p>
    </div>
  );
};

export default Total;
