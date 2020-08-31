import React from 'react';

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {
          course.parts.map(part => 
            <Part key={part.id} part={part}/>
          )
        }
      </div>
    )
  }
  
  const SumExercises = ({course}) => {
    const sumArr = course.parts.map((part) => {
      return part.exercises
    });
    const sum = sumArr.reduce((a,b) => a+b);
    return (
    <div>Total of {sum} exercises</div>
    )
  }
  
  const Course = ({courses}) => {
    return (
      <div>
        <Header course={courses} />
        <Content course={courses} />
        <SumExercises course={courses} />
      </div>
    )
  }
  

export default Course
