import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import firebase from './firebase';
import './App.css';

import Home       from './components/home';
import DashBoard  from './components/dashboard';
import Login      from './components/login';
import Header     from './components/header';
import Register   from './components/register';
import NewPost   from './components/newpost';

export default class App extends Component {


    state = {
      firebaseInitialized: false
    };

    componentDidMount(){
      firebase.isInitialized().then(res => {
      this.setState({firebaseInitialized: res});
      })
    }

  render(){
    return this.state.firebaseInitialized !== false ? (
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path='/'               component={Home}/>
          <Route exact path='/login'          component={Login}/>
          <Route exact path='/dashboard'      component={DashBoard}/>
          <Route exact path='/dashboard/new'  component={NewPost}/>
          <Route exact path='/register'       component={Register}/>
        </Switch>
      </BrowserRouter>
    ) : (
      <h1>Carregando...</h1>
    );
  }
}
