import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import './newpost.css';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      subtitle: '',
      description: '',
      image: '',
      alert: ''
    };
  this.addPost    = this.addPost.bind(this);
  this.onAddPost  = this.onAddPost.bind(this);
  }

  async  componentDidMount(){
    if(!firebase.getCurrent()){
      this.props.history.replace('/');
      return null;
    }
    firebase.getUserName((info)=>{
      localStorage.name = info.val().name;
      this.setState({name: localStorage.name })
    })
  }

  addPost(e){
    e.preventDefault();
    this.onAddPost();
  }

  onAddPost = async () =>{
    if(this.state.titulo !== '' && this.state.image !== '' && this.state.description !== ''){
      let posts = firebase.app.ref('posts');
      let key = posts.push().key;
      await posts.child(key).set({
        title:        this.state.title,
        subtitle:     this.state.subtitle,
        image:        this.state.image,
        description:  this.state.description,
        author:       localStorage.name
      });
      this.props.history.push('/dashboard');
    }else {
      this.setState({alert: 'Preencha todos os campos!'});
    }
  }

  render(){
    return(
      <div>
        <header id="newpost">
          <Link to="/dashboard">Voltar</Link>
        </header>
        <form onSubmit={this.addPost} id="form-post" >
          <span>{this.state.alert}</span>
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
