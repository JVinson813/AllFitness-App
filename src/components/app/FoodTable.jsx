import React, {useState, useEffect} from 'react';
import { Table, Container } from 'reactstrap';
import {Button} from 'react-bootstrap';
import Log from './Log';
import APIURL from '../app/helpers/environment';
import './foodtable.css';

import FoodEntryComponent from './FoodEntry';

const FoodTableComponent = (props) => {

  const [logs, setLogs] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [ updateModalOpen, setUpdateModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  
  const [dayLog, setDayLog] = useState(0);


  //const calorieTotal = {props.calories}

  

  const deleteFood = (activeId) => {
    fetch(`${APIURL}/food/${activeId}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': props.token
      })
    })
    .then(() => fetchFoodTable())
  }

  
  const fetchFoodTable = (() => {
    fetch(`${APIURL}/food/getall`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": props.token
      }
      })
      .then(response => response.json())
      .then(data => setLogs(data))
      .catch(error => console.log(error));
      });

  // useEffect(() => {
  //   fetchFoodTable();
  // }, [])
  useEffect(() => {
    fetchFoodTable();
  }, [])
  
  // Get today's dat in UTC and calculate local offset
  let todayUTC = new Date()/*.toISOString().slice(0, 10);*/
  let offset = todayUTC.getTimezoneOffset() * 60 * 1000;
  let localTime = todayUTC - offset;
  
  // Create YYYY-MM-DD strings for days
  //let todayLocal = new Date(localTime).toISOString().slice(0,10);
  let todayLocal = new Date(localTime - dayLog * 86400000).toISOString().split('T')[0];

  //let todaysLog = logs.filter(key => key.date_eaten === todayLocal);
  let todaysLog = logs?.filter(key => key.date_eaten === todayLocal);

  let todaysBreakfast = todaysLog?.filter(key => key.meal === "Breakfast");
  let todaysLunch = todaysLog?.filter(key => key.meal === "Lunch");
  let todaysDinner = todaysLog?.filter(key => key.meal === "Dinner");
  let todaysSnack = todaysLog?.filter(key => key.meal === "Snack");

  const calTotal = todaysLog?.reduce((totalCalories, today) => totalCalories + today.calories, 0);
  const breakfastTotal = todaysBreakfast?.reduce((totalCalories, breakfast) => totalCalories + breakfast.calories, 0);
  const lunchTotal = todaysLunch?.reduce((totalCalories, lunch) => totalCalories + lunch.calories, 0);
  const dinnerTotal = todaysDinner?.reduce((totalCalories, dinner) => totalCalories + dinner.calories, 0);
  const snackTotal = todaysSnack?.reduce((totalCalories, snack) => totalCalories + snack.calories, 0);
  
  const proteinTotal = todaysLog?.reduce((totalProtein, today) => totalProtein + today.protein_in_grams, 0);
  const breakfastProtein = todaysBreakfast?.reduce((totalProtein, breakfast) => totalProtein + breakfast.protein_in_grams, 0);
  const lunchProtein = todaysLunch?.reduce((totalProtein, lunch) => totalProtein + lunch.protein_in_grams, 0);
  const dinnerProtein = todaysDinner?.reduce((totalProtein, dinner) => totalProtein + dinner.protein_in_grams, 0);
  const snackProtein = todaysSnack?.reduce((totalProtein, snack) => totalProtein + snack.protein_in_grams, 0);
  
  const carbsTotal = todaysLog?.reduce((totalCarbs, today) => totalCarbs + today.carbs_in_grams, 0);
  const breakfastCarbs = todaysBreakfast?.reduce((totalCarbs, breakfast) => totalCarbs + breakfast.carbs_in_grams, 0);
  const lunchCarbs = todaysLunch?.reduce((totalCarbs, lunch) => totalCarbs + lunch.carbs_in_grams, 0);
  const dinnerCarbs = todaysDinner?.reduce((totalCarbs, dinner) => totalCarbs + dinner.carbs_in_grams, 0);
  const snackCarbs = todaysSnack?.reduce((totalCarbs, snack) => totalCarbs + snack.carbs_in_grams, 0);
  
  const fatTotal = todaysLog?.reduce((totalFat, today) => totalFat + today.fat_in_grams, 0);
  const breakfastFat = todaysBreakfast?.reduce((totalFat, breakfast) => totalFat + breakfast.fat_in_grams, 0);
  const lunchFat = todaysLunch?.reduce((totalFat, lunch) => totalFat + lunch.fat_in_grams, 0);
  const dinnerFat = todaysDinner?.reduce((totalFat, dinner) => totalFat + dinner.fat_in_grams, 0);
  const snackFat = todaysSnack?.reduce((totalFat, snack) => totalFat + snack.fat_in_grams, 0);
  
  
  return(
    <>
    <div className='foodtable-auth-wrapper'>
    <div className='auth-inner'>
    <Container fluid="md">
      <h3>Track your Food Here!</h3>
      <Button className='addFood' variant='primary' onClick={() => setAddModalOpen(true)} className="my-4">Add Food</Button>
      <h1>{todayLocal}</h1>
      <Table>
        <thead>
          <tr>
            <th>Food</th>
            <th>Servings</th>
            <th>Calories</th>
            <th>Carbs (g)</th>
            <th>Protein (g)</th>
            <th>Fats (g)</th>
            <th>Edit Entries</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colSpan="2">Breakfast</th>
            <th>{breakfastTotal}</th>
            <th>{breakfastCarbs}</th>
            <th>{breakfastProtein}</th>
            <th>{breakfastFat}</th>
            <th></th>
          </tr>
            {
              todaysBreakfast?.map(log => {
                return(
                  <Log 
                    deleteFood={deleteFood}
                    fetchFoodTable={fetchFoodTable}
                    modalOpen={updateModalOpen}
                    setModalOpen={setUpdateModalOpen}
                    token={props.token}
                    activeId={log.id}
                    key={log.id}
                    title={log.date_eaten} 
                    name={log.name} 
                    servings={log.servings} 
                    calories={log.calories} 
                    meal={log.meal}
                    fat={log.fat_in_grams}
                    protein={log.protein_in_grams}
                    carbs={log.carbs_in_grams} />
                )
              })
            }
          <tr>
            <th colSpan="2">Lunch</th>
            <th>{lunchTotal}</th>
            <th>{lunchCarbs}</th>
            <th>{lunchProtein}</th>
            <th>{lunchFat}</th>
            <th></th>
          </tr>
          {
            todaysLunch?.map(log => {
              return(
                <Log 
                  deleteFood={deleteFood}
                  fetchFoodTable={fetchFoodTable}
                  modalOpen={updateModalOpen}
                  setModalOpen={setUpdateModalOpen}
                  token={props.token}
                  activeId={log.id}
                  key={log.id}
                  title={log.date_eaten} 
                  name={log.name} 
                  servings={log.servings} 
                  calories={log.calories} 
                  meal={log.meal}
                  fat={log.fat_in_grams}
                  protein={log.protein_in_grams}
                  carbs={log.carbs_in_grams} />
              )
            })
          }
          <tr>
            <th colSpan="2">Dinner</th>
            <th>{dinnerTotal}</th>
            <th>{dinnerCarbs}</th>
            <th>{dinnerProtein}</th>
            <th>{dinnerFat}</th>
            <th></th>
          </tr>
          {
            todaysDinner?.map(log => {
              return(
                <Log 
                  deleteFood={deleteFood}
                  fetchFoodTable={fetchFoodTable}
                  modalOpen={updateModalOpen}
                  setModalOpen={setUpdateModalOpen}
                  token={props.token}
                  activeId={log.id}
                  key={log.id}
                  title={log.date_eaten} 
                  name={log.name} 
                  servings={log.servings} 
                  calories={log.calories} 
                  meal={log.meal}
                  fat={log.fat_in_grams}
                  protein={log.protein_in_grams}
                  carbs={log.carbs_in_grams} />
              )
            })
          }
          <tr>
            <th colSpan="2">Snack</th>
            <th>{snackTotal}</th>
            <th>{snackCarbs}</th>
            <th>{snackProtein}</th>
            <th>{snackFat}</th>
            <th></th>
          </tr>
          {
            todaysSnack?.map(log => {
              return(
                <Log 
                  deleteFood={deleteFood}
                  fetchFoodTable={fetchFoodTable}
                  modalOpen={updateModalOpen}
                  setModalOpen={setUpdateModalOpen}
                  token={props.token}
                  activeId={log.id}
                  key={log.id}
                  title={log.date_eaten} 
                  name={log.name} 
                  servings={log.servings} 
                  calories={log.calories} 
                  meal={log.meal}
                  fat={log.fat_in_grams}
                  protein={log.protein_in_grams}
                  carbs={log.carbs_in_grams} />
              )
            })
          }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">Total</td>
            <td>{calTotal}</td>
            <td>{carbsTotal}</td>
            <td>{proteinTotal}</td>
            <td>{fatTotal}</td>
          </tr>
        </tfoot>
      </Table>
      <Button className="yesterday" onClick={() => setDayLog(dayLog + 1)}>&#x3C;&#x3C; yesterday</Button>
      <br/><br/>
      <Button className="tomorrow" onClick={() => setDayLog(dayLog -1)}>&#x3E;&#x3E;next day</Button>
    </Container>
    <FoodEntryComponent token={props.token} isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} fetchFoodTable={fetchFoodTable}/>
    </div>
    </div>
    </>
  );
  
};



export default FoodTableComponent;