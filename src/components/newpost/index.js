import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

import './newpost.css';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      subtitle: '',
      description: '',
      image: '',
    };
  this.cadastrar = this.cadastrar.bind(this);
  }

  cadastrar(){

  }

  render(){
    return(
      <div>
        <header id="newpost">
          <Link to="/dashboard">Voltar</Link>
        </header>
        <form onSubmit={this.cadastrar} id="form-post" >
          <label>Título:</label>
          <input type="text" placeholder="Digite o título"
          value={this.state.title} onChange={(e)=> this.setState({title: e.target.value})} autoFocus />
          <label>Sub-título:</label>
          <input type="text" placeholder="Se houver digite o sub-titulo"
          value={this.state.subtitle} onChange={(e)=> this.setState({subtitle: e.target.value})} />
          <label>URL da imagem:</label>
          <input type="text" placeholder="Cole aqui a URL"
          value={this.state.image} onChange={(e)=> this.setState({image: e.target.value})} />
          <label>Descrição:</label>
          <textarea type="text" placeholder="Digite a descrição..."
          value={this.state.description} onChange={(e)=> this.setState({description: e.target.value})} />
          <button type="submit" >Cadastrar</button>
        </form>
      </div>
    );
  }
}

export default withRouter(NewPost);
