import React from 'react';

const Header = ({title}) => {
    return (
        <h1>
            {title}
        </h1>
    )
}

const Part = ({part}) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )

}

const Total = ({total}) => {
    return (
        <p>
            Total of {total} exercises
        </p>
    )
}

const Content = ({parts}) => {

    const rows = () => {
        return parts.map(part => <Part key={part.id} part={part} />);
    }

    return (
        <div>
            {rows()}
            <Total total={parts.reduce((acc, cur) => acc + cur.exercises,0)} />
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header title={course.name}/>
            <Content parts={course.parts}/>
        </div>
    )
}

export default Course