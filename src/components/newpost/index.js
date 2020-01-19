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
      file: null,
      alert: '',
      progress: 0
    };
  this.addPost      = this.addPost.bind(this);
  this.onAddPost    = this.onAddPost.bind(this);
  this.handleFile   = this.handleFile.bind(this);
  this.onHandleFile = this.onHandleFile.bind(this);
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

  handleFile = async (e) => {
    if (e.target.files[0]) {

      const selectedFile = e.target.files[0];

      if( selectedFile.type === 'image/png' || selectedFile.type === 'image/jpeg'  ){
         await this.setState({file: selectedFile});
         this.onHandleFile();
      }else {
        this.setState({alert: 'Envie uma imagem  tipo JPG ou PNG'});
        this.setState({file: null});
        return null;
      }

    }
  }

  onHandleFile = async () => {
    const { file  }   = this.state;
    const currentUid  = firebase.getCurrentUid();
    const uploadTaks = firebase.storage
    .ref(`images/${currentUid}/${file.name}`)
    .put(file);

    await uploadTaks.on('state_changed',
    (snapshot)=>{
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.setState({progress});
    },(err)=>{
      console.log(err);
    },
    ()=>{
      firebase.storage.ref(`images/${currentUid}`)
      .child(file.name).getDownloadURL()
      .then(url => {
        this.setState({image: url});
      })

    })

  }

  addPost(e){
    e.preventDefault();
    this.onAddPost();
  }

  onAddPost = async () =>{
    if(this.state.titulo !== '' && this.state.image !== '' && this.state.description !== '' && this.state.file !== null ){
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
        <label>Imagem:</label>
          <input type="file"
          onChange={this.handleFile} />
          { this.state.image !== '' ?
            <img src={this.state.image} width="250" height="150" alt="Capa do Post" />
            :
            <progress value={this.state.progress} max="100" />
          }
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
