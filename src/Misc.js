import React, { Component } from 'react';
import entities from 'html-entities';
import '../public/css/Misc.css';

class Misc extends Component {
  constructor(){
    super();
    this.state = {
      catDefault: '9',
      trivQuery: {},
      trivAnswers: [],
      mixedAnswers: []
    }
    this.mixAnswers = this.mixAnswers.bind(this);
    this.renderTriviaGame = this.renderTriviaGame.bind(this);
    this.renderTriviaControls = this.renderTriviaControls.bind(this);
    this.hidePlayTrivia = this.hidePlayTrivia.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  mixAnswers() {
    let i = 0;
    while( i < 4){
      let num = Math.floor(Math.random() * this.state.trivAnswers.length);
      let result = this.state.trivAnswers.splice(num, 1)
      this.state.mixedAnswers.push(result[0])
      ++i
    }
    console.log("I am mixed Answers")
    console.log(this.state.mixedAnswers)
  }

  renderTriviaGame(category) {
    document.getElementById('preGameNotice').className = 'fadeOut'
    this.timeout = setTimeout( () => {
      document.getElementById('preGameNotice').className = 'hiddenControlNone'
      document.getElementById('trivQA').className = 'hiddenControl'
      const url = `https://hidden-reaches-26134.herokuapp.com/trivGame?category=${this.state.catDefault}`
      fetch(url).then( res => res.json() ).then( data => {
        console.log(data)
        let question = entities.AllHtmlEntities.decode(data.data.question);
        let correctAnswer = {
          answer: entities.AllHtmlEntities.decode(data.data.correct_answer),
          isRight: true
        }
        this.state.trivAnswers.push(correctAnswer)
        data.data.incorrect_answers.map((incAnswer, i) => {
          let incorrectAnswer = {
            answer: entities.AllHtmlEntities.decode(incAnswer),
            isRight: false
          }
          this.state.trivAnswers.push(incorrectAnswer)
        })
        this.setState({
          trivQuery: {
            question: question
          }
        })
        this.mixAnswers();
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
      trivQuery: {},
      trivAnswers: [],
      mixedAnswers: []
    })
    const category = evt.target.value
    this.renderTriviaGame(category)
  }

  handleClick(){
    this.setState({
      trivQuery: {},
      trivAnswers: [],
      mixedAnswers: []
    })
    const category = this.state.catDefault
    this.renderTriviaGame(category)
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  render() {
    let mixSelection = this.state.mixedAnswers.map((obj, i) => {
      console.log("I am object from render answers")
      console.log(obj)
      if(obj.isRight == true){
        return (
          <button className="pure-button trivBtnSelect rightAnswer" key={i+1}>{obj.answer}</button>
        )
      } else {
          return (
            <button className="pure-button trivBtnSelect wrongAnswer" key={i+1}>{obj.answer}</button>
          );
      }
    });
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
              <p>{this.state.trivQuery.question}</p>
              <div id="mcAnswers">
                {mixSelection}
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
