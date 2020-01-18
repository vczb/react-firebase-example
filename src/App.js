import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import firebase from './firebase';
import './App.css';

import Home       from './components/home';
import Header     from './components/header';

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
          <Route exact path='/' component={Home}/>
        </Switch>
      </BrowserRouter>
    ) : (
      <h1>Carregando...</h1>
    );
  }
}
