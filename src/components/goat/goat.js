import React, { Component } from 'react';
import fire from '../../services/fire'
import  './goat.css'
export default class GOAT extends Component{
    constructor(props){
        super(props)
        console.log('Creat Goat')
    }
    state={
        table:null
    }

    static setToGOAT=(mode,username,score,stopTime)=>{
        fire.database().ref('goat/'+mode+'/'+username).set({
            score:score,
            time:stopTime
        })
    }
    setTable=()=>{
        this.setState({table:(this.getGOAT(this.props.mode))});
    }
    getGOAT=(mode)=>{
        let table = [];
        var data = fire.database().ref('/goat/' + mode);
        data.orderByChild('score').limitToLast(5).once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                const tr =  {
                    id:table.length+1,
                    name:childSnapshot.key,
                    score:childSnapshot.val()['score'],
                    time:childSnapshot.val()['time']
                }
                table.push(tr);
                if(table.length===5){
                    return table;
                }
            });
        });
        console.log(table);
        return  table;   
    }

    toTable=(data)=>{
        let array = [];
        for(let i = data.length-1;i>=0;i--){
            const tr =  <tr><td>{array.length+1}</td><td>{data[i].name}</td><td>{data[i].score}</td><td>{data[i].time}</td></tr>
            array.push(tr);
        }
        
        return array;
    }

    render(){
        const {table} = this.state;
        console.log(table);
        if(table===null){
            this.setTable();
        }
        else if(!(table===null)){
            console.log(table);
            const tableContent = this.toTable(table);
            return(
                <div>
                    <table>
                        <tbody> 
                            <tr>
                                <th>№</th><th>User Name</th><th>Score</th><th>Finish Time</th>
                            </tr>
                            {tableContent['0']}
                            {tableContent['1']}
                            {tableContent['2']}
                            {tableContent['3']}
                            {tableContent['4']}
                        </tbody>
                    </table>
                </div>
            );
        }
        return(
            <div>Loading...</div>
        )
    }
}
