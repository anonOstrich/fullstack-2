import React from 'react';
import ReactDOM from 'react-dom';

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

const App = () => {
    
    
    const courses = [
        {
          name: 'Half Stack -sovelluskehitys',
          id: 1,
          parts: [
            {
              name: 'Reactin perusteet',
              exercises: 10,
              id: 1
            },
            {
              name: 'Tiedonvälitys propseilla',
              exercises: 7,
              id: 2
            },
            {
              name: 'Komponenttien tila',
              exercises: 14,
              id: 3
            }
          ]
        },
        {
          name: 'Node.js',
          id: 2,
          parts: [
            {
              name: 'Routing',
              exercises: 2,
              id: 1
            },
            {
              name: 'Middlewaret',
              exercises: 7,
              id: 2
            }
          ]
        }
      ]

      const allCourseComponents = () => courses.map(c => <Course course={c} key={c.id} />)
    
    

    return(
        <div>
            {allCourseComponents()}
        </div>

    );
}

ReactDOM.render(<App />, document.getElementById('root')); 