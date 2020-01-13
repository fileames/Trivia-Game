import React from 'react';
import logo from './logo.svg';
import './App.css';
import Welcome from './Welcome.js'
import Question from './Question.js'

class App extends React.Component {
  constructor(){
    super();
    this.state={
      page:0,
      category:"21",
      difficulty:"easy"
    }
    this.click=this.click.bind(this);
    this.restart=this.restart.bind(this);
  }

  click(cate,diff){
    this.setState({
      category:cate,
      difficulty:diff,
      page:1,
    })
  }

  restart(){
    this.setState({
      page:0,
    })
  }

  render(){
    if(this.state.page===0)
      return(<Welcome click = {this.click} />)
    else if(this.state.page===1)
      return(<Question restart={this.restart}
        url={"https://opentdb.com/api.php?amount=10&category="+this.state.category+"&difficulty="+this.state.difficulty+"&type=multiple"}/>)
  }

}

export default App;
