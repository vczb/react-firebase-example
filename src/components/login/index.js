import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.login    = this.login.bind(this);
    this.onLogin  = this.onLogin.bind(this);
  }

  login(e){
    e.preventDefault();

    this.onLogin();
  }

  onLogin = async () => {

    try{

      const {email, password} = this.state;

      await firebase.login(email, password).catch((err) => {
        console.log(err);
      });
      this.props.history.replace('/dashboard');
    }catch(err){
      alert(err.message);
    }


  }

  componentDidMount(){
    if(firebase.getCurrent()){
      return this.props.history.replace('/dashboard');
    }
  }

  render(){
    return(
      <div>
        <form onSubmit={this.login} id="login" >
          <label> Email: </label><br/>
          <input type="email" autoComplete="off" autoFocus
          value={this.state.email} onChange={(e)=> this.setState({email: e.target.value})}
          placeholder="Digite seu email"  />
          <label> Password: </label><br/>
          <input type="password" autoComplete="off" autoFocus
          value={this.state.password} onChange={(e)=> this.setState({password: e.target.value})}
          placeholder="Digite sua senha"  />
          <button type="submit" > Entrar </button>
          <Link to="/register">É novo por aqui ? Cadastre-se</Link>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
