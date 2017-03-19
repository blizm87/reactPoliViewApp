import React, { Component } from 'react';
import entities from 'html-entities';
import '../public/css/QuoteOfTheDay.css';

class QuoteOfTheDay extends Component {
  constructor() {
    super();
    this.state = {};
    this.getQuote = this.getQuote.bind(this);
  }

  getQuote() {
    fetch('https://hidden-reaches-26134.herokuapp.com/quote').then( res => res.json() ).then( data => {
      let content = data.data[0].content;
      let rmPTag = content.replace("<p>", '');
      let clearContent = rmPTag.replace("</p>", '');
      let newContent = entities.AllHtmlEntities.decode(clearContent);
      this.setState({
        quote_author: data.data[0].title,
        quote_content: newContent
      });
    });
  }

  componentWillMount() {
    this.getQuote();
  }

  render() {
    return (
      <div id="quoteOfTheDay">
        <div id="dailyQuote">
          <h3>QUOTE OF THE DAY</h3>
          <p>by: {this.state.quote_author}</p>
          <p>{this.state.quote_content}</p>
        </div>
      </div>
    );
  }
}

export default QuoteOfTheDay;
