import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import './register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    };
    this.register   = this.register.bind(this);
    this.onRegister = this.onRegister.bind(this);
  }

  register(e){
    e.preventDefault();

    this.onRegister();
  }

  onRegister = async () => {

    try{

      const {name, email, password} = this.state;

      await firebase.register(name, email, password).catch((err) => {
        console.log(err);
      });
      this.props.history.replace('/dashboard');
    }catch(err){
      alert(err.message);
    }


  }


  render(){
    return(
      <div>
        <form onSubmit={this.register} id="register" >
          <label> Nome: </label><br/>
          <input type="text" autoComplete="off" autoFocus
          value={this.state.name} onChange={(e)=> this.setState({name: e.target.value})}
          placeholder="Digite seu nome"  />
          <label> Email: </label><br/>
          <input type="email" autoComplete="off"
          value={this.state.email} onChange={(e)=> this.setState({email: e.target.value})}
          placeholder="Digite seu email"  />
          <label> Password: </label><br/>
          <input type="password" autoComplete="off" autoFocus
          value={this.state.password} onChange={(e)=> this.setState({password: e.target.value})}
          placeholder="Digite sua senha"  />
          <button type="submit" > Cadastrar </button>
        </form>
      </div>
    );
  }
}

export default withRouter(Register);
