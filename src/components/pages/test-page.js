import React, { Component } from 'react';
import QuizTest from '../quiz-test';
export default class TestPage extends Component{
    render(){
        console.log();
        const {mode} = this.props.location.state;
        return(
            <div className="jumbotron text-d">
                <h4>{mode} Level</h4>
                <QuizTest mode={mode}/>
            </div>
        );
    }
}
