import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';

class DashBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: localStorage.name
    };
    this.logout = this.logout.bind(this);
  }

  async  componentDidMount(){
    if(!firebase.getCurrent()){
      this.props.history.replace('/login');
      return null;
    }
    firebase.getUserName((info)=>{
      localStorage.name = info.val().name;
      this.setState({name: localStorage.name })
    })
  }

  logout(){

  }

  render(){
    return(
      <div>
        <div id="dashboard" >
          <h1 className="user-info" >Olá {this.state.name}</h1>
          <Link to="/dashboard/new" >Novo Post</Link>
        </div>
        <p>
          Logado com {this.state.email}
          <button onClick={()=> this.logout()} ></button>
        </p>
      </div>
    );
  }
}
export default withRouter(DashBoard);
