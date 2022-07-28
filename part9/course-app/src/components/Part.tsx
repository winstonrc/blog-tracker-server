import { CoursePart } from '../types';

const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.type) {
    case 'normal':
      return (
        <div>
          <p>
            <strong>{part.name}</strong> - {part.exerciseCount} exercises
            <br></br>
            <em>{part.description}</em>
          </p>
        </div>
      );
    case 'groupProject':
      return (
        <div>
          <p>
            <strong>{part.name}</strong> - {part.exerciseCount} exercises
            <br></br>
            Group project exercises: {part.groupProjectCount}
          </p>
        </div>
      );
    case 'submission':
      return (
        <div>
          <p>
            <strong>{part.name}</strong> - {part.exerciseCount} exercises
            <br></br>
            <em>{part.description}</em>
            <br></br>
            {part.exerciseSubmissionLink}
          </p>
        </div>
      );
    case 'special':
      return (
        <div>
          <p>
            <strong>{part.name}</strong> - {part.exerciseCount} exercises
            <br></br>
            <em>{part.description}</em>
            <br></br>
            required skills: {part.requirements.map((skill) => skill)}
          </p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
