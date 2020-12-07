import React from 'react';
import './dashboard.css';
import {
  Card, Button, Row, Col
} from 'react-bootstrap';
import {Link} from 'react-router-dom';




import Bodyweight from './Assets/Bodyweight.jpg';
import Weights from './Assets/Weights.jpg';
import MealPlan from './Assets/MealPlan.jpg';
import Macros from './Assets/Macros.jpg';
import WorkoutLog from './Assets/WorkoutLog.jpg';
import BodyTracker2 from './Assets/BodyTracker2.jpg';





class Dashboard extends React.Component {
    constructor(props){
        super(props);
        
    }

   

render(){
  return (
    <>
    <Row>
        <Col sm='6'>
           <Card className='Block' style={{ width: '25rem' }}>
               <Card.Img className='Card' variant='top' src={Bodyweight}/>
               <Card.Body>
                   <Card.Title>Bodyweight Exercises</Card.Title>
                   <Card.Text className='CardText'>
                       Perform any of these exercises from the comfort of your own home! No equipment needed!
                   </Card.Text>
                   <Link to="/bodyweight"><Button variant='primary'>See Exercises</Button></Link>
               </Card.Body>
            </Card> 
        </Col>
        <Col sm='6'>
           <Card className='Block' style={{ width: '25rem' }}>
               <Card.Img className='Card' variant='top' src={Weights}/>
               <Card.Body>
                   <Card.Title>Weightlifting Exercises</Card.Title>
                   <Card.Text className='CardText'>
                       Need guidance on proper form with weights? Or just see different ways of using weights? Check out our guide!
                   </Card.Text>
                   <Link to='/weights'><Button variant='primary'>See Exercises</Button></Link>
               </Card.Body>
            </Card> 
        </Col>
    </Row>
    <Row>
        <Col sm='6'>
           <Card className='Block' style={{ width: '25rem' }}>
               <Card.Img className='Card' variant='top' src={MealPlan}/>
               <Card.Body>
                   <Card.Title>Meal Plan Guide</Card.Title>
                   <Card.Text className='CardText'>
                        No calorie counting needed! Check out a customized meal plan for your current weight range!
                   </Card.Text>
                   <Link to="/mealplan"><Button variant='primary'>See Meal Plan</Button></Link>
               </Card.Body>
            </Card> 
        </Col>
        <Col sm='6'>
           <Card className='Block' style={{ width: '25rem' }}>
               <Card.Img className='Card' variant='top' src={Macros}/>
               <Card.Body>
                   <Card.Title>Track Your Macros!</Card.Title>
                   <Card.Text className='CardText'>
                       Want to track your calories, proteins, carbs, and fats? Just enter in the food and get back the info!
                   </Card.Text>
                   <Link to ="/foodtable"><Button variant='primary'>See Food Table</Button></Link>
               </Card.Body>
            </Card> 
        </Col>
    </Row>
    <Row>
        <Col sm='6'>
           <Card className='Block' style={{ width: '25rem' }}>
               <Card.Img className='Card' variant='top' src={WorkoutLog}/>
               <Card.Body>
                   <Card.Title>Track Your Workout</Card.Title>
                   <Card.Text className='CardText'>
                       It's important to track your progress to see improvement. Log your workout routine here to build upon it!
                   </Card.Text>
                   <Link to="/workouts"><Button variant='primary'>Log Workouts</Button></Link>
               </Card.Body>
            </Card> 
        </Col>
        <Col sm='6'>
           <Card className='Block' style={{ width: '25rem' }}>
               <Card.Img variant='top' src={BodyTracker2}/>
               <Card.Body >
                   <Card.Title>Body Tracker</Card.Title>
                   <Card.Text className='CardText'>
                       Track your body progress here! Tracking only your weight can be very misleading! You should be tracking body fat% and weight together. 
                   </Card.Text>
                   <Button variant='primary'>Go Somewhere</Button>
               </Card.Body>
            </Card> 
        </Col>
    </Row>
    </>

  );
};
};

export default Dashboard;