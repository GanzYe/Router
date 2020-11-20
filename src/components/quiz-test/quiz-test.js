import React, { Component } from 'react';
import Stopwatch from 'just-stopwatch';
import EngineQuiz from '../../services/engineQuiz';
import QuizTestItem from '../quiz-test-item'
import './quiz-test.css'
import GOAT from '../goat';

export default class QuizTest extends Component{
    constructor(props) {
        super(props)
        this.updateCorrectCout = this.updateCorrectCout.bind(this)
    }
    
    state={
        questions:null,
        currentQuestion:null,
        idCurrentQuestion:-1,
        correctCount:0,
        selected:false,
        finish:false,
        timer:null,
        stopTime:null,
        timerIsLaunched:false,
        username:null,
        score:null,
        isResult:false
    }
    setResult=(username)=>{  //<<<<----------------------------------------
        const {stopTime,correctCount} = this.state;
        const score = parseFloat((((correctCount/stopTime)*2)*100).toFixed(1));
        GOAT.setToGOAT(this.props.mode,username,score,stopTime);
        this.setState({username:username,score:score,isResult:true})
    }
    confirmUsername=()=>{
        const username = document.querySelector('.username');
        if(username.value === ''||username.value[1]===' '){
            console.log("ERRROR")
            username.classList += ' incorrectName';
            return;
        }
        const _userName = username.value;
        document.querySelector('.confirm-block').remove();
        console.log("result");
        this.setResult(_userName);
        // console.log(this.setResult);
    }

    setData=(data)=>{
        this.setState({questions:data})
    }

    async questionRender(){
        const {questions} = this.state;
        if(questions===null){
            console.log("GET Questions");
            const quiz = new EngineQuiz();
            if(this.props.mode==="Easy"){
                await quiz.getEasyQuastion().then(this.setData);
            }
            else if(this.props.mode==="Norm"){
                await quiz.getNormQuastion().then(this.setData);
            }
            else if(this.props.mode==="Boss"){
                await quiz.getBossQuastion().then(this.setData);
            }
        }
    }
    
    setCurrentQuestionAndId=(data,id)=>{
        this.setState({currentQuestion:data,idCurrentQuestion:id})
    }
    
    updateCorrectCout(mark){
        let data = this.state.correctCount;
        let _selected = null;
        if(mark) {
            ++data;
            _selected=true;
        }
        else if(!mark) {
            --data;
            _selected=true;
        };
        this.setState({correctCount:data,selected:_selected});
    }
    
    updateCurrentQuastion(isNext=false){
        let id = this.state.idCurrentQuestion;
        if(id===-1){
            ++id;
            this.setCurrentQuestionAndId(<QuizTestItem data={this.state.questions[id]} id={id} updateCorrectCout={this.updateCorrectCout}/>,id);
        }
        else if(isNext&&id>-1&&this.state.questions.length-1>id){
            ++id;
            this.setCurrentQuestionAndId(<QuizTestItem data={this.state.questions[id]} id={id}
            updateCorrectCout={this.updateCorrectCout}/>,id);
        }
        else if(isNext&&this.state.questions.length-1===id){
            const time = this.state.timer.Stop();
            this.setState({finish:true,stopTime:(parseFloat(((parseFloat(time.toFixed(0)))/1000).toFixed(2)))});
        }
    }

    
    render(){
        if(!this.state.timerIsLaunched){
            const timer = Stopwatch().Start();
            console.log("Start Watch")
            this.setState({timerIsLaunched:true,timer:timer})
        }
        const {questions} = this.state;
        if(questions===null){
            this.questionRender();
        }
        
        const {currentQuestion} = this.state;
        const {finish,isResult,username,stopTime} = this.state;
        let resultBlock = null;
        if(isResult){
            const {timer,score}= this.state;
            resultBlock=<div className="result-block">
                            <h1>Your results:</h1>
                            <div className="result-block-content d-flex flex-column align-items-center">
                                <div className="time">Within {stopTime} seconds</div>
                                <div className="score">{username} scored: {score} points</div>
                                <GOAT mode={this.props.mode}/>
                            </div>
                        </div>
        }
        if(finish){
            return(
                <div className="result-content">
                    <div className="confirm-block">
                        <h1>Enter the username to get your result</h1>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control username" placeholder="Username"     aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
                            <div className="input-group-append">
                                 <button className="btn btn-outline-secondary confirm-btn" type="button"    onClick={this.confirmUsername}>Confirm</button>
                            </div>
                        </div>
                    </div>
                    {resultBlock}
                </div>
            )
        }
        if(!(questions===null)){
            this.updateCurrentQuastion();
            let {idCurrentQuestion} = this.state;
            return(
                <div className="d-flex flex-column align-items-center">
                    <div className="quastionCount">
                        <p>Qeustion {idCurrentQuestion+1} of {questions.length}</p>
                    </div>
                    <div className="correctCount">
                        {this.state.correctCount}
                    </div>
                    {currentQuestion}
                    <div className="next-quastion-btn">
                        <button type="button" 
                                onClick={()=>{
                                    if(this.state.selected){
                                        this.updateCurrentQuastion(true);
                                        this.setState({selected:false});
                                    }       
                                }}  
                                className="btn-warning start-btn">
                            NEXT
                        </button>
                    </div>
                </div>
            );
        }
        return(
           <div>Loading...</div>
        );
    }
}
