import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './random-quiz.css';
import Logo from '../../images/favicon.png';
import GOAT from '../goat';

export default class RandomQuiz extends Component {
    state={
        mode:"Easy",
    }
    setMode(data){
        this.setState((mode)=>{
            return {
                mode:data,
            };
        })
    }
    render() {
      
      return (
        <div className="random-quiz jumbotron">
            <img className="quiz-image"
                 src={Logo}/>
            <div className="row setting-quiz d-flex flex-row align-items-center">
                <div className="col-4">
                    <div className="list-group setting-quiz-complexity" id="list-tab" role="tablist">
                      <a className="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" onClick={() => this.setMode("Easy")} href="#list-home" role="tab" aria-controls="home">Easy</a>
                      <a className="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" onClick={() => this.setMode("Norm")} href="#list-profile" role="tab" aria-controls="profile">Norm</a>
                      <a className="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" onClick={() => this.setMode("Boss")} href="#list-messages" role="tab" aria-controls="messages">Boss</a>
                    </div>
                  </div>
                  <div className="col-8 setting-quiz-goat">
                    <div className="tab-content" id="nav-tabContent">
                      <div className="tab-pane fade show active" id="list-home"              role="tabpanel"                 
                      aria-labelledby="list-home-list">
                        <div className="goat">
                          <GOAT mode='Easy'/>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                        <div className="goat">
                          <GOAT mode='Norm'/>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
                        <div className="goat">
                          <GOAT mode='Boss'/>
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
            <Link to={{pathname: '/test/',state: {mode:this.state.mode}}}>
                <button type="button" className="btn-warning start-btn">Start</button>
            </Link>
        </div>
      );
    }
}




