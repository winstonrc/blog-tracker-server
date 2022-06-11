import React from 'react'

const Header = (props) => {
    console.log(props)
    return <h2>{props.course}</h2>
}
  
const Content = (props) => {
    console.log(props)
    return props.parts.map(part =>
        <p key={part.id}>{part.name} {part.exercises}</p>
    )
}

const Total = (props) => {
    let sum = props.parts.reduce(function (a,b) {
        return a + b.exercises
    }, 0)
    
    return (
        <h4>Total of {sum} exercises</h4>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
        
}

export default Course