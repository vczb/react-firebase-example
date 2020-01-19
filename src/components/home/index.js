import React, { Component } from 'react';
import './home.css';
import firebase from '../../firebase';

class Home extends Component {

  state = {
    posts: []
  }

  componentDidMount(){
    firebase.app.ref('posts').once('value', (snapshot) => {
      let state = this.state;
      state.posts = [];
      snapshot.forEach((childItem)=>{
        state.posts.push({
          key:          childItem.key,
          title:        childItem.val().title,
          subtitle:     childItem.val().subtitle,
          author:       childItem.val().author,
          description:  childItem.val().description,
          image:        childItem.val().image,
          link:         childItem.val().link
        })
      });
      state.posts.reverse();
      this.setState(state);
    })
  }

  render(){
    return(
      <section id="post">
        {this.state.posts.map((post)=>{
          return(
            <article key={post.key} >
              <header>
                <div className="title" >
                  <strong> {post.title} </strong>
                  <span> {post.subtitle} </span>
                  <span>Autor: {post.author} </span>
                </div>
              </header>
              <img src={post.image} alt="Capa do Post" />
              <footer>
                <p>
                  {post.description}
                </p>
              </footer>
            </article>
          );
        })}
      </section>
    );
  }
}
export default Home;
