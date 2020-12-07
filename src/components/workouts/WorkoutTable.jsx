import React from 'react';
import {Table, Button} from 'reactstrap';
import APIURL from '../app/helpers/environment';
import './table.css';

const WorkoutTable = (props) => {

    const deleteWorkout = (workout) => {
        console.log(workout);
        fetch(`${APIURL}/log/${workout.id}`, {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then(res => res.text())
        .then(res => console.log(res))
        .then(() => props.fetchWorkouts())
    }

    const workoutMapper = () => {
        return props.workouts.map((workout, index) => {
            return(
                <tr key={index}>
                    <th scope='row'>{workout.id}</th>
                    <td>{workout.exercise}</td>
                    <td>{workout.musclegroup}</td>
                    <td>{workout.reps}</td>
                    <td>{workout.weight}</td>
                    <td>
                        <Button color="warning" onClick={() => {props.editUpdateWorkout(workout); props.updateOn()}}>Update</Button>
                        <Button color="danger" onClick={() => {deleteWorkout(workout)}}>Delete</Button>
                    </td>
                </tr>
            )
        })
    }
    
    return(
        <>
        <div className='table-auth-wrappe'>
        <div className='auth-inner'>
        <h3>Workout History</h3>
        <hr/>
        <Table striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Exercise</th>
                    <th>Musclegroup</th>
                    <th>Reps</th>
                    <th>Weight</th>
                </tr>
            </thead>
            <tbody>
                {workoutMapper()}
            </tbody>
        </Table>
        </div>
        </div>
        </>
    )
}

export default WorkoutTable;