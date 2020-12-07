import React, {useState} from 'react';
import { FormGroup, Form, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
import {Button} from 'react-bootstrap';
import './edit.css';

const WorkoutEdit = (props) => {
    const [editExercise, setEditExercise] = useState(props.workoutToUpdate.exercise);
    const [editMuscleGroup, setEditMuscleGroup] = useState(props.workoutToUpdate.musclegroup);
    const [editReps, setEditReps] = useState(props.workoutToUpdate.reps);
    const [editWeight, setEditWeight] = useState(props.workoutToUpdate.weight);

    const workoutUpdate = (event, workout) => {
        event.preventDefault();
        fetch(`http://localhost:4500/log/${props.workoutToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({log: {exercise: editExercise, musclegroup: editMuscleGroup, reps: editReps, weight: editWeight}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => {
            props.fetchWorkouts();
            props.updateOff();
        })
    }

    return(
        <div className='edit-auth-wrappe'>
        <div className='auth-inner'>
       <Modal isOpen={true}>
           <ModalHeader>Update Workout</ModalHeader>
           <ModalBody>
               <Form onSubmit={workoutUpdate}>
                   <FormGroup>
                       <Label htmlfor='exercise'>Edit Exercise:</Label>
                       <Input name='exercise' value={editExercise} onChange={(e) => setEditExercise(e.target.value)}/>
                   </FormGroup>
                   <FormGroup>
                       <Label htmlfor='musclegroup'>Edit Muscle Group:</Label>
                       <Input type='select' name='musclegroup' value={editMuscleGroup} onChange={(e) => setEditMuscleGroup(e.target.value)}>
                           <option></option>
                           <option value='Chest'>Chest</option>
                           <option value='Arms'>Arms</option>
                           <option value='Legs'>Legs</option>
                           <option value='Shoulders'>Shoulders</option>
                           <option value='Abs'>Abs</option>
                        </Input>
                   </FormGroup>
                   <FormGroup>
                       <Label htmlfor='reps'>Edit Reps:</Label>
                       <Input name='reps' value={editReps} onChange={(e) => setEditReps(e.target.value)}/>
                   </FormGroup>
                   <FormGroup>
                       <Label htmlfor='weight'>Edit Weight:</Label>
                       <Input name='weight' value={editWeight} onChange={(e) => setEditWeight(e.target.value)}/>
                   </FormGroup>
                   <Button variant='primary' type='submit'>Update the workout!</Button>
               </Form>
           </ModalBody>
       </Modal>
       </div>
       </div>
    )

}

export default WorkoutEdit;