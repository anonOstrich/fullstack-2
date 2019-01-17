import React from 'react';
import ReactDOM from 'react-dom';
import Course from './modules/Course'


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