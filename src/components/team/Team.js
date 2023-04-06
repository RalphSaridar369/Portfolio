import React from 'react'
import './Team.scss'
import { Card, Col, Row } from 'react-bootstrap'
import ralph from '../../images/ralph.jpg'
import ali from '../../images/ali.jpg'

const Team = () => {

    const team_data = [
        {
            name:"Ralph Saridar",
            img:ralph,
            position:'Full-Stack Developer',
            skills:[
                {
                    name:'JavaScript',
                    img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
                },
                {
                    name:'TypeScript',
                    img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
                },
                {
                    name:'React.js',
                    img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
                },
                {
                    name:'React-Native',
                    img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
                },
                {
                    name:'Node.js',
                    img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
                },
                {
                    name:'PHP',
                    img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg'
                },
                {
                    name:'Laravel',
                    img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg'
                },
            ]
        },
        {
            name:"Ali Hamdan",
            img:ali,
            position:'Front-End Developer',
            skills:[
                {
                    name:'JavaScript',
                    img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
                },
                {
                    name:'React.js',
                    img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
                },
                {
                    name:'PHP',
                    img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg'
                },
            ]
        },
    ]

  return (
    <div className='team-container'>
        <h2>Team</h2>
        <br/>
        
    <Row xs={12} md={2}>
      {team_data.map((person, idx) => (
        <Col>
          <Card className='team-card'>
            <Card.Img variant="top" src={person.img}/>
            <Card.Body>
              <Card.Title className='primary-color card-title'>{person.name}</Card.Title>
              <Card.Title className='secondary-color card-subtitle'>{person.position}</Card.Title>
                <div className='card-skill-container'>
                {person.skills.map((skill)=>{
                    return <div className='d-flex flex-row align-items-center'>
                    <img src={skill.img} className='card-skill-icon'/>
                    <span className='primary-color icon-name'>{skill.name}</span>
                    </div>
                })}
                </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    </div>
  )
}

export default Team