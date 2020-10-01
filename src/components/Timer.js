import React from 'react'
import '../App.css';
class Timer extends React.Component{
  constructor(props){
    super(props)
    this.state={
      count:15,
      false:props.false,
      setTime:props.setTime
    }
  }
  componentDidMount(){
      this.myInterval=setInterval(()=>{
        if(this.state.count===0){
          this.state.false(true)
        }
        this.setState(prevState=>({
          count:prevState.count-1
        }))
      },1000)
  }

  componentWillUnmount(){
    console.log("unmount:"+this.state.count)
    this.state.setTime(this.state.count);
    clearInterval(this.myInterval)
  }

  render(){
    const{count}=this.state
    return(
      <p className="head">{this.state.count}</p>
    )
  }

}
export default Timer
