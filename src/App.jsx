import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';



import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/app/Dashboard';
import BodyWeightComponent from './components/app/BodyWeight';
import WeightsComponent from './components/app/Weights';
import MealPlan from './components/app/MealPlan';
import Footer from './components/app/Footer';
import FoodTableComponent from './components/app/FoodTable';
import WorkoutIndex from './components/workouts/IndexWorkouts';
import WorkoutCreate from './components/workouts/CreateWorkout';
import FoodEntryComponent from './components/app/FoodEntry';
import FoodUpdateComponent from './components/app/FoodUpdate';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token : '',

    }
  }
  
  
  
  componentDidMount () {
    if (localStorage.getItem("authToken")) {
      this.setState({token:localStorage.getItem("authToken")})
      
    }
  }

   clickLogout = () => {
    localStorage.clear();
    this.setState({token:''})
  }


   authenticateUser = (token) => {
    localStorage.setItem("authToken", token);
    this.setState({token: token})
 };

    protectedViews = () => {
      if (this.state.token){
        return(
     <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/login"}>AllFitness</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/dashboard"}>Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link onClick={this.clickLogout} className="nav-link" to={"/login"}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
  
        <div className="yay">
          <div className="yay">
            <Switch>
              {/* <Route exact path='/'><Login authenticateUser={this.authenticateUser}/></Route> */}
              <Route path="/login"><Login authenticateUser={this.authenticateUser}/></Route>
              <Route path="/register"><Register authenticateUser={this.authenticateUser}/></Route>
              <Route path="/dashboard"><Dashboard /></Route>
              <Route path ="/bodyweight"><BodyWeightComponent /></Route>
              <Route path="/weights"><WeightsComponent /></Route>
              <Route path="/mealplan"><MealPlan /></Route>
              <Route path="/foodtable"><FoodTableComponent  token={this.state.token}/></Route>
              <Route path="/workouts"><WorkoutIndex token={this.state.token}/></Route>
              <Route path="/foodentry"><FoodEntryComponent token={this.state.token}/></Route>
              <Route path="/foodupdate"><FoodUpdateComponent token={this.state.token}/></Route>
            </Switch>
          </div>
        </div>

      </div>)
      

      }else{
        return(
        <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/login"}>AllFitness</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/login"}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/register"}>Register</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
  
        <div className="yay">
          <div className="yay">
            <Switch>
              {/* <Route exact path='/'><Login authenticateUser={this.authenticateUser}/></Route> */}
              <Route path="/login" ><Login authenticateUser={this.authenticateUser}/></Route>
              <Route path="/register"><Register authenticateUser={this.authenticateUser}/></Route>
            </Switch>
          </div>
        </div>
      </div>)
      }
    }

  render(){
  return(
    <Router>
      {this.protectedViews()}
      {/* <Footer/> */}
    </Router>
  )
}}

export default App;
