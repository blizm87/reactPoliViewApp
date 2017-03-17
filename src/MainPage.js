import React, { Component } from 'react';
import QuoteOfTheDay from './QuoteOfTheDay.js';
import YoutubeFrame from './YoutubeFrame.js';
import CurrentEvents from './CurrentEvents.js';
import Misc from './Misc.js';
import GroupTransition from 'react-addons-css-transition-group';
import '../public/css/MainPage.css';

class MainPage extends Component {
  render() {
    return (
      <div>
        <GroupTransition transitionName="mainRender"
          transitionAppear={true} transitionAppearTimeout={5000}
          transitionEnter={false} transitionLeave={false}>

          <div className="main_Container">
            <h1>
              PoliView.com
            </h1>
                  <img id="pure-img" src="../public/assets/earth-spinning-rotating-animation-23.gif" alt="Error!!! Did not load!" width="75" />
            <nav>
              <section >
                  <span>Login with:</span>
                <a href="https://hidden-reaches-26134.herokuapp.com/auth/youtube/login" id="loginTitle">
                  <img src="../public/assets/youtube-icon.png" alt="Error!!! Did not load!" width="38" />
                </a>
                <a href="https://hidden-reaches-26134.herokuapp.com/auth/youtube/signout" id="logoutLink">
                  <button className="pure-button"> Sign Out </button>
                </a>
              </section>
            </nav>
            <QuoteOfTheDay />
            <div className="pure-g">
              <div className="pure-u-1 pure-u-md-1-3" id="youtubeFrame_Container">
                <YoutubeFrame />
              </div>
              <div className="pure-u-1 pure-u-md-1-3" id="currentEvents_Container">
                <CurrentEvents />
              </div>
              <div className="pure-u-1 pure-u-md-1-3" id="misc_Container">
                <Misc />
              </div>
            </div>
          </div>
        </GroupTransition>
      </div>
    );
  }
}

export default MainPage;
