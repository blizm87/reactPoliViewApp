import React, { Component } from 'react';
import '../public/css/YoutubeFrame.css';

class YoutubeFrame extends Component {
  constructor(){
    super();
    this.state = {
      searchReq: '',
      videoResp: []
    }

    this.handleSearchReq = this.handleSearchReq.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(evt){
    this.setState({
      searchReq: evt.target.value
    });
  }

  handleSearchReq(){
    const keyword = this.state.searchReq
    const url = 'https://hidden-reaches-26134.herokuapp.com/auth/searchVid?keyword=' + keyword

    fetch(url)
      // .then( res => res.json() )
      // .then( data => console.log(data) )
      // .catch(err => console.log(err) )
  }

  render() {
    return (
      <div id="youtube">
        <div>
          <h3>Youtube Search</h3>
        </div>
        <iframe id="player" type="text/html" width="400" height="280"
          src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com"
          frameBorder="0">
        </iframe>
            <input type="text" onChange={this.handleChange} id="searchInput" placeholder="Search For Videos" />
            <button onClick={this.handleSearchReq} id="searchButton">
              <img className="pure-img" src="assets/searchIcon.png" width="40" alt="Error in loading" />
            </button>
        <br/>
        <div id="searchFrame">
          <p>Frame for videos</p>
        </div>
      </div>
    );
  }
}

export default YoutubeFrame;
