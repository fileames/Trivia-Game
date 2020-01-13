import React from 'react';
import logo from './logo.svg';
import './App.css';

class Welcome extends React.Component {
  constructor(props){
    super(props);
    this.state={
      page:props.page,
      category:"",
      difficulty:"",
      click:props.click
    }
    this.handleChange=this.handleChange.bind(this)
  }

  handleChange(event) {
        const {name, value, type, checked} = event.target
        this.setState({ [name]: value })
        console.log("diff: "+this.state.difficulty)
  }

  render(){
    return (
      <div className="App-header">
          <img src="https://upload.wikimedia.org/wikipedia/en/2/27/Trivia.png" className="App-logo" alt="logo" />
          <h2>Choose a category</h2>
          <div className="radio-group" onChange={this.handleChange}>
            <input type="radio" id="option-one" name="category" value="21"/>
              <label htmlFor="option-one">Sports</label>
            <input type="radio" id="option-two" name="category" value="17"/>
              <label htmlFor="option-two">Science</label>
            <input type="radio" id="option-three" name="category" value="23"/>
              <label htmlFor="option-three">History</label>
          </div>
          <h2>Choose a difficulty</h2>
          <div className="radio-group" onChange={this.handleChange}>
            <input type="radio" id="option-one-dif" name="difficulty" value="easy"/>
              <label htmlFor="option-one-dif">Easy</label>
            <input type="radio" id="option-two-dif" name="difficulty" value="medium"/>
              <label htmlFor="option-two-dif">Medium</label>
            <input type="radio" id="option-three-dif" name="difficulty" value="hard"/>
              <label htmlFor="option-three-dif">Hard</label>
          </div>
          <button onClick={() => this.state.click(this.state.category,this.state.difficulty)} className="getStarted">Let's Start</button>
      </div>
    );
  }

}

export default Welcome;
