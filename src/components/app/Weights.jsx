import React from 'react';
import CardLog from './CardComponent';
import {Row, Input} from 'reactstrap';
import {Button} from 'react-bootstrap';
import './weights.css';
import APIURL from '../app/helpers/environment';





class WeightsComponent extends React.Component{
    constructor(props){
        super(props);
    
    this.state = {
        apparatus: '',
        bodypart: '',
        exercises: []

    }
    this.handleChange = this.handleChange.bind(this);
    this.fetchExercise = this.fetchExercise.bind(this);


};

    

    fetchExercise = () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({apparatus: `${this.state.apparatus}`, bodypart: `${this.state.bodypart}`})
            }
            // fetch('http://204.235.60.194/exrxapi/v1/allinclusive/exercises?exercisename=burpee')
            
            fetch(`${APIURL}/workout`, requestOptions)
            .then(function(response){
                return response.json();
            })
            .then(exercises => {
                console.log(exercises);
                 this.setState({exercises: exercises.exercises})
                 
                
            })
            }

            handleChange(event) {
                this.setState({[event.target.name]: event.target.value});
              }
              

    render(){
        return(
            <>
            <div className='weights-auth-wrapper'>
            <div className='auth-inner'>
            <h3>Look up Weighted Exercises!</h3>
                <Input type='select' value={this.state.apparatus} onChange={this.handleChange} name='apparatus' >
                    <option></option>
                    <option value='dumbbell'>Dumbbells</option>
                    <option value='barbell'>Barbell</option>
                </Input>
                <Input onChange={this.handleChange} value={this.state.bodypart}  type='select' name='bodypart'>
                    <option></option>
                    <option value='chest'>Chest</option>
                    <option value='forearms'>Forearms</option>
                    <option value='upper arms'>Upper Arms</option>
                    <option value='thigh'>Legs</option>
                    <option value='calves'>Calves</option>
                    <option value='hips'>Hips</option>
                    <option value='back'>Back</option>
                    <option value='neck'>Neck</option>
                    <option value='shoulder'>Shoulders</option>
                    <option value='waist'>Core/Abs</option>
                </Input>
                <Button variant='primary' onClick={this.fetchExercise}>Search</Button>
                </div>
                </div>
                <Row>
                    {this.state.exercises.map(exercise => {return(<CardLog key={exercise.Exercise_Id} exercise={exercise}/>)})}
                </Row>
                </> 
        )
    }
}

export default WeightsComponent;