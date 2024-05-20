const Course = ({ course }) => {
  const totalExercises = course.parts.reduce((total, part) => {
    // console.log(`Total: ${total}`)
    // console.log(`Part: ${part.exercises}`)
    return total + part.exercises;
  }, 0);

  // let totalExercises = 0
  // course.parts.forEach(part => {
  //   totalExercises += part.exercises
  // })

  return (
    <div>
      <h2>{course.name}</h2>
      <div>
        {course.parts.map((part) => (
          <p key={part.id}>
            {part.name} - {part.exercises} exercises
          </p>
        ))}
      </div>
      <h4>Total exercises: {totalExercises}</h4>
    </div>
  );
};

export default Course;
