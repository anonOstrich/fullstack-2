import React from 'react'

const Header = ({name}) => {
    return(
        <>
            <h1>{name}</h1>
        </>
    )
} 

const Part = (props) => (
    <>
      <p>{props.part.name} {props.part.exercises}</p>
    </>
)



const Content = ({parts}) => {
    
    const partComponents = () => {
        return parts.map(p => <Part part={p} key={p.id} />);
    } 

    const totalNumber = () => parts.reduce((acc, elem) => acc + elem.exercises, 0); 

    return(
        <>
        {partComponents()}
        <p>Yhteensä {totalNumber()} tehtävää</p>
        </>

    )
} 



const Course = ({course}) => {
    return(
     <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    </>)

}

export default Course;