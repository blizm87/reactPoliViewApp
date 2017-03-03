import React, { Component } from 'react';
import entities from 'html-entities';
import '../public/css/QuoteOfTheDay.css';

class QuoteOfTheDay extends Component {
  constructor() {
    super();
    this.state = {};
  }

  getQuote() {
    const url = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
    fetch(url).then( res => res.json() ).then( data => {
      let content = data[0].content;
      let rmPTag = content.replace("<p>", '');
      let clearContent = rmPTag.replace("</p>", '');
      let newContent = entities.AllHtmlEntities.decode(clearContent);
      this.setState({
        quote_author: data[0].title,
        quote_content: newContent
      });
    });
  }

  componentWillMount() {
    this.getQuote();
  }

  render() {
    return (
      <div className="pure-g">
        <div className="pure-u-5-5">
          <div id="dailyQuote">
            <h3>QUOTE OF THE DAY</h3>
            <p>by: {this.state.quote_author}</p>
            <p>{this.state.quote_content}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default QuoteOfTheDay;
