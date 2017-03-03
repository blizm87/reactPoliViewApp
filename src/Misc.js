import React, { Component } from 'react';
import '../public/css/Misc.css';

class Misc extends Component {
  constructor(){
    super();
    this.state = {
      catDefault: '9',
    }
    this.renderTrivia = this.renderTrivia.bind(this);
    this.renderTriviaControls = this.renderTriviaControls.bind(this);
    this.hidePlayTrivia = this.hidePlayTrivia.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  renderTrivia(category){
    //   const data = JSON.parse(body).results[0];
    //   var q = entities.decode(data.question);
    const url = `https://www.opentdb.com/api.php?amount=1&category=${category}&difficulty=medium&type=multiple`
    fetch(url).then( res => res.json() ).then( data => {
      console.log(data)
    });
  }

  renderTriviaControls(){
    this.timeout = setTimeout( () => {
      document.getElementById('catSelect').className = 'pure-button fadeIn'
      document.getElementById('startBtn').className = 'pure-button fadeIn'
      this.renderTrivia;
      this.timeout = null
    }, 700)

  }

  hidePlayTrivia(evt){
    evt.target.className = 'pure-button fadeOut'
    this.timeout = setTimeout( () => {
      document.getElementById('catSelect').className = 'pure-button hiddenControl'
      document.getElementById('startBtn').className = 'pure-button hiddenControl'
      this.renderTriviaControls();
      this.timeout = null
    }, 1000)
}

  handleChange(evt) {
    this.setState({
      catDefault: evt.target.value,
    })
    const category = evt.target.value
    this.renderTrivia(category)
  }

  handleClick(){
    const category = this.state.catDefault
    this.renderTrivia(category)
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  render() {
    return (
      <div id="misc">
        <button className="pure-button hiddenControlNone" id="startBtn" onClick={this.handleClick}>Start Game</button>
        <select className="pure-button hiddenControlNone" onChange={this.handleChange} id="catSelect">
          <option value="9">Random</option>
          <option value="29">Comics</option>
          <option value="12">Music</option>
          <option value="14">Television</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="18">Science: Computers</option>
          <option value="21">Sports</option>
        </select>
        <button className="pure-button" id="startTrivia" onClick={this.hidePlayTrivia}>Play Trivia</button>
      </div>
    );
  }
}

export default Misc;
