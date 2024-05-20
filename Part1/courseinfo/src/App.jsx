const Part = (props) => {
  // const part1 = "Fundamentals of React";
  // const exercises1 = 10;
  // const part2 = "Using props to pass data";
  // const exercises2 = 7;
  // const part3 = "State of a component";
  // const exercises3 = 14;
  return (
    <>
      <p>
        The part topic is {props.part} and the exercise is {props.exercises}
      </p>
     
    </>
  );
}

const HeaderPage = (props) => {
  const course = "Half Stack application development";
  return (
    <div>
      <h1>{course}</h1>
    </div>
  );
};
const ContentPage = () => {
  return (
    <div>
      <Part part="Fundamentals of  React part1" exercises={10} />
      <Part part="Using props to pass data part2" exercises={7} />
      <Part part="State of a component  part3" exercises={14} />
    </div>
  );
};
const TotalPage = () => {
  const exercises1 = 10;
  const exercises2 = 7;
  const exercises3 = 14;
  return (
    <div>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  );
};



import React from "react";
import Course from "./components/Course";

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return <div>
    <h1>Web development curriculum</h1>
    {courses.map((course) => (
      <Course key={course. id} course={course}/>
    ))}
  </div>;
};
 export default App;
