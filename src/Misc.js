import React, { Component } from 'react';
import entities from 'html-entities';
import '../public/css/Misc.css';

class Misc extends Component {
  constructor(){
    super();
    this.state = {
      catDefault: '9',
      trivData: {}
    }
    this.renderTriviaGame = this.renderTriviaGame.bind(this);
    this.renderTriviaControls = this.renderTriviaControls.bind(this);
    this.hidePlayTrivia = this.hidePlayTrivia.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  renderTriviaGame(category) {
    //   const data = JSON.parse(body).results[0];
    //   var q = entities.decode(data.question);
    document.getElementById('preGameNotice').className = 'fadeOut'
    this.timeout = setTimeout( () => {
      document.getElementById('preGameNotice').className = 'hiddenControlNone'
      document.getElementById('trivQA').className = 'hiddenControl'
      const url = `https://hidden-reaches-26134.herokuapp.com/?category=${this.state.catDefault}`
      fetch(url).then( res => res.json() ).then( data => {
        let question = entities.AllHtmlEntities.decode(data.data.question);
        let correct_answer = entities.AllHtmlEntities.decode(data.data.correct_answer);
        let incorrectOne = entities.AllHtmlEntities.decode(data.data.incorrect_answers[0]);
        let incorrectTwo = entities.AllHtmlEntities.decode(data.data.incorrect_answers[1]);
        let incorrectThree = entities.AllHtmlEntities.decode(data.data.incorrect_answers[2]);
        console.log(data.data)
        this.setState({
          trivData: {
            question: question,
            correct_answer: correct_answer,
            incorrectOne: incorrectOne,
            incorrectTwo: incorrectTwo,
            incorrectThree: incorrectThree
          }
        })
        document.getElementById('trivQA').className = 'fadeIn'
      });
      this.timeout = null
    }, 1000)

  }

  renderTriviaControls(){
    this.timeout = setTimeout( () => {
      document.getElementById('catSelect').className = 'pure-button fadeIn'
      document.getElementById('startBtn').className = 'pure-button fadeIn'
      document.getElementById('triviaGame').className = 'fadeIn'
      this.timeout = null
    }, 700)
  }

  hidePlayTrivia(evt){
    evt.target.className = 'pure-button fadeOut'
    this.timeout = setTimeout( () => {
      document.getElementById('triviaGame').className = 'hiddenControl'
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
    this.renderTriviaGame(category)
  }

  handleClick(){
    const category = this.state.catDefault
    this.renderTriviaGame(category)
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  render() {
    return (
      <div id="misc">
        <div className="hiddenControlNone" id="triviaGame">
          <div>
            <h3>Trivia Game</h3>
          </div>
          <div id="triviaGameInner">
            <p id="preGameNotice">Press Start when ready</p>
            <div id="trivQA" className="hiddenControlNone">
              <h4 id="trivQAHeader">Question</h4>
              <p>{this.state.trivData.question}</p>
              <div id="mcAnswers">
                <button className="pure-button trivBtnSelect">Correct answer: {this.state.trivData.correct_answer}</button>
                <button className="pure-button trivBtnSelect">Incorrect answer: {this.state.trivData.incorrectOne}</button>
                <button className="pure-button trivBtnSelect">Incorrect answer: {this.state.trivData.incorrectTwo}</button>
                <button className="pure-button trivBtnSelect">Incorrect answer: {this.state.trivData.incorrectThree}</button>
              </div>
            </div>
          </div>
        </div>
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
