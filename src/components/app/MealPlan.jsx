import React from 'react';
import {Input} from 'reactstrap';
import './mealplan.css';

import Nutrition125 from './Assets/Nutrition125.pdf';
import Nutrition175 from './Assets/Nutrition175.pdf';
import Nutrition225 from './Assets/Nutrition225.pdf';




class MealPlan extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            weightrange: 1
        }
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    render(){
        return(
            <div className='MealPlan'>
                <div className='mealplan-auth-wrapper'>
                <div className='auth-inner'>
                <h3>Select your weight range!</h3>
                <Input type='select' value={this.state.weightrange} onChange={this.handleChange} name='weightrange' >
                    <option></option>
                    <option value={1}>100-150 pounds</option>
                    <option value={2}>150-200 pounds</option>
                    <option value={3}>200-250 pounds</option>
                </Input>
                </div>
                </div>
            <iframe  title='awesome' src={this.state.weightrange === 1 ? Nutrition125 : this.state.weightrange === 2 ? Nutrition175 : this.state.weightrange === 3 ? Nutrition225: null} className='mealImg' />
            </div>
        )
    }
}

export default MealPlan;