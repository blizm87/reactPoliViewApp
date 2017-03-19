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
            <div id="header" className="pure-g">
              <div className="pure-u-1">
                <h1>
                  PoliView.com
                </h1>
                <img id="pure-img" src="assets/earth-spinning.gif" alt="Error!!! Did not load!" width="75" />
                <nav>
                  <section >
                      <span>Login with:</span>
                    <a href="https://hidden-reaches-26134.herokuapp.com/auth/youtube/login" id="loginTitle">
                      <img src="assets/youtube-icon.png" alt="Error!!! Did not load!" width="38" />
                    </a>
                    <a href="https://hidden-reaches-26134.herokuapp.com/auth/youtube/signout" id="logoutLink">
                      <button className="pure-button"> Sign Out </button>
                    </a>
                  </section>
                </nav>
              </div>
              <div className="pure-u-1 pure-u-md-1-1 pure-u-sm-1-1 pure-u-xs-1" id="quoteOfTheDay_Container">
                <QuoteOfTheDay />
              </div>
            </div>
            <div className="pure-g">
              <div className="pure-u-lg-1-3 pure-u-md-1-1 pure-u-sm-1-1 pure-u-xs-1" id="youtubeFrame_Container">
                <div className="pure-u-1">
                  <YoutubeFrame />
                </div>
              </div>
              <div className="pure-u-lg-1-3 pure-u-md-1-1 pure-u-sm-1-1 pure-u-xs-1" id="currentEvents_Container">
                <div className="pure-u-1">
                  <CurrentEvents />
                </div>
              </div>
              <div className="pure-u-lg-1-3 pure-u-md-1-1 pure-u-sm-1-1 pure-u-xs-1" id="misc_Container">
                <div className="pure-u-1">
                  <Misc />
                </div>
              </div>
            </div>
          </div>
        </GroupTransition>
      </div>
    );
  }
}

export default MainPage;
