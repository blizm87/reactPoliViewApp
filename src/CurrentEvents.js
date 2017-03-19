import React, { Component } from 'react';
import '../public/css/CurrentEvents.css';

class CurrentEvents extends Component {
  constructor(){
    super();
    this.state = {
      newsCatagory: 'usa-today',
      articleFeed: [],
      articleFeed2: []
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(evt) {
    const category = evt.target.value;
    this.getArticles(category);
  }

  getArticles(category) {
    const API_KEY = '5bfcf544abf743e0985517c98f5dcefa';
    let url = `https://newsapi.org/v1/articles?source=${category}&sortBy=top&apiKey=${API_KEY}`;
    fetch(url).then( res => res.json() ).then( data => {
      this.setState({ articleFeed: data.articles });
    });
  }

  componentWillMount(){
    this.getArticles(this.state.newsCatagory);
  }

  render() {
    let articleFeed = this.state.articleFeed.map((article, i) => {
      return (
        <article className="newsArticle"  key={i}>
          <h4 key={i}>published by: {article.author}</h4>
          <p key={i+1}>{article.title}</p>
          <a href={article.url} target={article.url}>
            <img key={i+2} className="pure-img" src={article.urlToImage} alt="Error!!! Did not load!" width="450" height="300"/>
          </a>
          <p key={i+3}>{article.description}</p>
        </article>
      );
    });
    return (
      <div id="currentEvents">
        <div id="header">
          <h3 id="newsFeedHeader"><span>Current Events:</span>
          <select className="pure-button" onChange={this.handleSelectChange} id="feedChanger">
            <option value="usa-today">USA TODAY</option>
            <option value="the-economist">Economics</option>
            <option value="techradar">Technology</option>
            <option value="national-geographic">National Geo</option>
            <option value="espn">ESPN</option>
            <option value="cnn">CNN</option>
            <option value="bbc-news">BBC News</option>
          </select>
          </h3>
        </div>
        <section id="newsSectionContainer">
          {articleFeed}
        </section>
      </div>
    );
  }
}

export default CurrentEvents;
