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

    return(
        <>{partComponents()}</>

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
    
    
    const course = {
        name: 'Half Stack -sovelluskehitys', 
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
            }, 
            {
                name: 'Filosofian perusteet',
                exercises: 20, 
                id: 4
            }
        ]
    }
    

    return(
        <div>
            <Course course={course} />
        </div>

    );
}

ReactDOM.render(<App />, document.getElementById('root')); 