import React from 'react';
import './App.css';
import App from './App.js';
import Lottie from 'react-lottie';
import * as animationDataSuccess from './13540-sign-for-success-alert.json'
import * as animationDataFailure from './13865-sign-for-error-flat-style.json'
import * as animationFinish from './11142-finishing.json'
import Timer from './Timer.js'
class Question extends React.Component{
  constructor(props){
    super(props)
    this.state={
      url:this.props.url,
      response_code: 0,
      results: [{
        question:"",
        correct_answer: "",
        incorrect_answers: ["","","",""]
      }],
      isCorrectPage:4,
      qNumber:0,
      totalPoints:0,
      restart:props.restart,
      isStopped: false,
      isPaused: false,
      time:0
    }
    this.defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationFinish.default,
        rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    this.questionPrint=this.questionPrint.bind(this);
    this.setTime=this.setTime.bind(this);
    this.correctTrue=this.questionHandle.bind(this,true,true);
    this.falseTrue=this.questionHandle.bind(this,true,false);
    this.correctFalse=this.questionHandle.bind(this,false,true);
  }

  //Used to calculate the earned point with respect to remaining time.
  //Given to Timer as a prop
  setTime(timeLeft){
    this.setState({
      time:timeLeft
    })
  }
  componentDidMount(){
    this.setState({
    isCorrectPage:4,
    })
    fetch(this.state.url)
      .then(response=>response.json())
      .then(data => {
        let tmpArray = []
        for (var i = 0; i < data.results.length; i++) {
          console.log(data.results[i])
            tmpArray.push({
              question:data.results[i].question,
              correct_answer: data.results[i].correct_answer,
              incorrect_answers: data.results[i].incorrect_answers
            })
        }

        this.setState({
        response_code:data.response_code,
        results:tmpArray
      })
    }
    )
    .catch(error => {
                    this.setState({
                      response_code: 1,
                    });
                })
    this.setState({
    isCorrectPage:1,
    })
  }
  //Prints the answer options.
  //rand: Random number to place the correct answer
  //th:Current option number
  questionPrint(qNo,rand,th){
    if(th===rand){
      return(
        <button className="option" onClick={this.correctTrue}>
        {this.state.results[qNo].correct_answer}
        </button>
      )
    }
    else{
      if(rand<th){
        th=th-1;
      }
      return(
        <button className="option" onClick={this.falseTrue}>
        {this.state.results[qNo].incorrect_answers[th]}
        </button>
      )
    }
  }
  //Sets the state to next page
  questionHandle(change,corf,time,timeOut){
    //change: True when an answers is selected or time is over
    //corf: (Correct or False) If true is answer is correct false otherwise
    //time: Shows the remaiing time for the particular question, used to update totalPoints
    //timeOut: Used when time for answering is over to print the corresponding message
    if(change){
      if(corf){
        this.setState(prevState=>({
          qNumber:prevState.qNumber+1,
          isCorrectPage:2,
        }))
      }
      else{
        if(timeOut){
          this.setState(prevState=>({
            time:0,
            qNumber:prevState.qNumber+1,
            isCorrectPage:3,
          }))
        }
        else{
          this.setState(prevState=>({
            //totalPoints:prevState.totalPoints,
            qNumber:prevState.qNumber+1,
            isCorrectPage:3,
          }))
        }
      }

    }
    else{
      if(corf){
        this.setState(prevState=>({
          totalPoints:prevState.totalPoints+Math.round(100*(this.state.time)/15),
          isCorrectPage:1,
        }))
      }
      else{
        this.setState({
          isCorrectPage:1,
        })
      }

    }
  }


  render(){
    //isCorrectPage is the page qNumber
    // 1: Question page
    // 2: When a question is answered correctly
    // 3: When question is answered wrong and game is finished
    if(this.state.response_code!==0){
      return(
        <div className="App-header">
          <h1 className="point">Something is wrong!</h1>
          <button className="getStarted" onClick={this.state.restart}>Try Again</button>
        </div>
      )
    }
    else if(this.state.isCorrectPage===2){
      this.defaultOptions["animationData"]=animationDataSuccess.default
      return(
        <div className="App-header">
              <Lottie
              options={this.defaultOptions}
              height={300}
              width={300}
              isStopped={this.state.isStopped}
              isPaused={this.state.isPaused}/>
              <h1 className="point"  >You have <br />
              {this.state.totalPoints+Math.round(100*(this.state.time)/15)} points</h1>
            <button className="getStarted" onClick={this.correctFalse}>Next Question</button>
        </div>
      )
    }
    else if(this.state.isCorrectPage===3){
      this.defaultOptions["animationData"]=animationDataFailure.default
      const text=this.state.time===0?"Time is over!":"Wrong Answer!";
      return(
        <div className="App-header">
        <Lottie options={this.defaultOptions}
        height={300}
        width={300}
        isStopped={this.state.isStopped}
        isPaused={this.state.isPaused}/>
            <h2 >Correct Answer: {this.state.results[this.state.qNumber-1].correct_answer} </h2>
            <h1 className="point">{text}</h1>
            <h1 className="point"  >You finished the game with <br />
            {this.state.totalPoints} points</h1>
            <button className="getStarted" onClick={this.state.restart}>Start Over</button>
        </div>
      )
    }
    else if(this.state.isCorrectPage===1){
      if(this.state.qNumber===10){
        this.defaultOptions["animationData"]=animationFinish.default
        return(
          <div className="App-header">
            <Lottie options={this.defaultOptions}
            height={300}
            width={300}
            isStopped={this.state.isStopped}
            isPaused={this.state.isPaused}/>
            <h1 className="point">Congratulations!</h1>
            <h1 className="point">You finished the game with<br/>
            {this.state.totalPoints+" points"}</h1>
            <button className="getStarted" onClick={this.state.restart}>Play Again</button>
          </div>
        )
      }
      const m=Math.floor(Math.random() * 4);
      const q=this.state.qNumber+1
        return(
            <div className="App-header">
            <header className="Question-header">
              <p className="head">{"Question: "+q+"/10"}</p>
              <p className="head">{"Points: "+this.state.totalPoints}</p>
              <Timer false={this.falseTrue} setTime={this.setTime}/>
            </header>
              <h1 className="question">{this.state.results[this.state.qNumber].question}</h1>
              {this.questionPrint(this.state.qNumber,m,0)}
              {this.questionPrint(this.state.qNumber,m,1)}
              {this.questionPrint(this.state.qNumber,m,2)}
              {this.questionPrint(this.state.qNumber,m,3)}
            </div>
        )

    }
    else {
      return(
        <div className="App-header">
        <h1>Loading</h1>
        </div>
      )
    }


  }

}
export default Question;
