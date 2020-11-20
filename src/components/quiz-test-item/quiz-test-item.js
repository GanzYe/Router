import React, { Component } from 'react';
import './quiz-test-item.css';

export default class QuizTestItem extends Component{
    state={
        idQuastion:null,
        question:null,
        correctAnswer:null,
        answers:null,
        selectedAnswer:null
    }

    setData=(data,id)=>{
        this.setState(({
            question:data.name,
            correctAnswer:data.answers[0],
            answers:data.answers,
            idQuastion:id,
            selectedAnswer:null})
        )
    }

    updateData(data,id){
        const {idQuastion} = this.state;
        if(!(id===idQuastion)){
            this.setData(data,id);
            let answers = document.getElementsByClassName("option")
            for(let i=0;i<answers.length;i++){
                answers.item(i).classList="option";        
            }     
            this.setData(data,id);
        }
    }

    clikOfAnswer(data){
        const {selectedAnswer} = this.state;
        if(selectedAnswer===null){
            const {correctAnswer} = this.state;
            // console.log(data.target, correctAnswer);
            if(correctAnswer===data.target.textContent){
                data.target.classList+=' correct';
                this.setState({selectedAnswer:true});
                console.log(document.querySelector('.correctCount').textContent='true');
                this.props.updateCorrectCout(true);
            }
            else{
                data.target.classList+=' incorrect';
                this.setState({selectedAnswer:false});
                this.props.updateCorrectCout(false);
            }
        }
    }

    shuffle(array,id) {
        const {selectedAnswer} = this.state;
        // console.log(id,idQuastion);
        if((selectedAnswer===null)){
            var currentIndex = array.length, temporaryValue, randomIndex;
            
            while (0 !== currentIndex) {
            
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
            
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }
            return array;
        }
    }

    render(){
        this.updateData(this.props.data,this.props.id);
        
        const {question,correctAnswer,answers} = this.state;

        if(answers===null){
            return(
                <div>ERROR</div>
            )
        }

        this.shuffle(answers,this.props.id);
        return(
            <div className="item-body">
                <div className="quastion-body">
                    <div className="quastion">
                        <h2>{question}</h2>
                    </div>
                    <div className="option-container">
                        <div className="option" 
                            onClick={((data) => this.clikOfAnswer(data))}>{answers[0]}</div>
                        <div className="option" 
                            onClick={((data) => this.clikOfAnswer(data))}>{answers[1]}</div>
                        <div className="option"
                            onClick={((data) => this.clikOfAnswer(data))}>{answers[2]}</div>
                        <div className="option"
                            onClick={((data) => this.clikOfAnswer(data))}>{answers[3]}</div>
                    </div>
                    <div className="answeres-indicator"></div>
                </div>
            </div>
        );
    }
}
