import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './Login';
import Navbar from './Navbar';
import Register from './Register';
import Home from './Home';
import Footer from './Footer';
import AddProduct from './AddProduct';
import Profile from './Profile';
import Category from './Category';
import Checkout from './Checkout';

class App extends Component{



  constructor(){
    super();           
    this.state = {
      user:  localStorage.getItem('tokenSavedInLocalStorage') !== undefined,
      verifiedAdmin: localStorage.getItem('verifiedAdmin')  ,
    }
    
  }

  logout = e => { //Any time user interacts with page theres an event. The user initiates the event on click
    console.log("logout 1")
     if(e){
      e.preventDefault()//Prevents from Refreshing the whole page
    }
    localStorage.removeItem('token');
    localStorage.removeItem('verifiedAdmin');
    this.setState({user:false, verifiedAdmin: false});

    window.location.replace('/login');
    
    console.log("logout 2")
  }

  login = e => { /*  login e method is setting state in the global component */
   
    this.setState({user:true, verifiedAdmin:e.verifiedAdmin});
   // console.log(`app.js login ${e.verifiedAdmin}`)
 
  }

    //Place this function on pages that require login, this prevents the user from seeing the page unless they are logged in.
    componentDidMount(){

    if(localStorage.getItem('tokenSavedInLocalStorage')){
      console.log("The User is Still Logged In")
    } else {
      //this.logout();
      console.log("App.js users been logged out")
    }
  }  

  render(){
    return (

      <Router>
        <div className="App">
          <Navbar  logout={this.logout} state={this.state}/>
          <div id="pages">
            <Switch>  
              <Route path='/' exact><Home /></Route>
              <Route path='/login' exact ><Login  verifiedAdmin={this.state.verifiedAdmin} setLogin= {x=> this.login(x)} /></Route>
              <Route path='/register' setUser={this.user} component={Register} exact  />
              <Route path='/addproduct' exact ><AddProduct setUser={this.user} /></Route>
              <Route path='/departments' exact ><AddProduct setUser={this.user} /></Route>
              <Route path='/offers' exact ><AddProduct setUser={this.user} /></Route>
              <Route path='/profile' exact ><Profile setUser={this.user} /></Route>
              <Route path='/categories' exact><Category setUser={this.user}  /></Route>
              <Route path='/categories/:category' ><Category setUser={this.user} /></Route>
              <Route path='/checkout' exact ><Checkout setUser={this.user} /></Route>
            </Switch>
          </div>
          <Footer />
        </div>
      
      </Router>
  
    );
  }

}

export default App;
