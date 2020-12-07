import React, {useState} from 'react';
import { Form, FormGroup, Label, Input} from 'reactstrap';
import {Button} from 'react-bootstrap';
import APIURL from '../app/helpers/environment';
import './createworkout.css';

const WorkoutCreate = (props) => {
    const [exercise, setExercise] = useState('');
    const [musclegroup, setMusclegroup] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${APIURL}/log`, {
            method: 'POST',
            body: JSON.stringify({log: {exercise: exercise, musclegroup: musclegroup, reps: reps, weight: weight}}),
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => res.json())
        .then((logData) => {
            console.log(logData);
            setExercise('');
            setMusclegroup('');
            setReps('');
            setWeight('');
            props.fetchWorkouts();
        })
    }

    return(
        <>
        <div className='workout-auth-wrapper'>
        <div className='auth-inner'>
        <h3>Log a Workout</h3>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor='exercise'/>
                <Input name='exercise' value={exercise} onChange={(e) => setExercise(e.target.value)} placeholder='exercise'/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor='musclegroup'/>
                <Input type='select' name='musclegroup' value={musclegroup} onChange={(e) => setMusclegroup(e.target.value)}>
                    <option>Musclegroup worked?</option>
                    <option value='Chest'>Chest</option>
                    <option value='Arms'>Arms</option>
                    <option value='Legs'>Legs</option>
                    <option value='Shoulders'>Shoulders</option>
                    <option value='Abs'>Abs</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor='reps'/>
                <Input name='reps' value={reps} onChange={(e) => setReps(e.target.value)} placeholder='how many reps?'/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor='weight'/>
                <Input name='weight' value={weight} onChange={(e) => setWeight(e.target.value)} placeholder='how much weight?'/>
            </FormGroup>
            <Button variant='primary' type='submit'>Click to Submit</Button>
        </Form>
        </div>
        </div>
        </>
    )
}

export default WorkoutCreate;