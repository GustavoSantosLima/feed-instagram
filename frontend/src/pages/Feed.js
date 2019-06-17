import React, { Component } from 'react';
import io from 'socket.io-client';
import api from './../services/api';
import More from './../assets/more.svg';
import Like from './../assets/like.svg';
import Comment from './../assets/comment.svg';
import Send from './../assets/send.svg';

import './Feed.css';

class Feed extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    this.registerToSocket();
    const { data } = await api.get('posts');
    this.setState({ posts: data });
  }

  registerToSocket = () => {
    const socket = io('http://localhost:7777');

    socket.on('post', post => {
      this.setState({ posts: [post, ...this.state.posts] });
    });

    socket.on('like', like => {
      this.setState({
        posts: this.state.posts.map(post =>
          post._id === like._id ? like : post,
        ),
      });
    });
  };

  handleLike = id => {
    api.post(`/posts/${id}/like`);
  };

  render() {
    return (
      <section id="post-list">
        {this.state.posts.map((post, key) => (
          <article key={key}>
            <header>
              <div className="user-info">
                <span>{post.author}</span>
                <span className="place">{post.place}</span>
              </div>

              <img src={More} alt="Mais" />
            </header>

            <img
              src={`http://localhost:7777/file/${post.image}`}
              alt={post.image.split('.')[0]}
            />

            <footer>
              <div className="actions">
                <button type="button" onClick={() => this.handleLike(post._id)}>
                  <img src={Like} alt="" />
                </button>
                <img src={Comment} alt="" />
                <img src={Send} alt="" />
              </div>

              <strong>{post.likes} curtidas</strong>

              <p>
                {post.description}
                <span>{post.hashtags}</span>
              </p>
            </footer>
          </article>
        ))}
      </section>
    );
  }
}

export default Feed;
