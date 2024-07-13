import data from "./question.json"
import "./App.css"
import { useEffect, useState } from "react"

export const App = () => {
  const[current,setCurrent]=useState(0);
  const[score,setScore]=useState(0);
  const[time,setTime]=useState(10);
  const[showScore,setShowScore]=useState(false);
  useEffect(()=>{
    let interval;
    if(time>0 && !showScore){
       interval=setInterval(()=>{
        setTime((x)=> x-1);
      },1000)
    }
    else if(current<data.length-1){
      setCurrent((x)=>x+1);
      setTime(10);
    }
    else{
      clearInterval(interval);
      setShowScore(true);
    }
    return()=> clearInterval(interval);
  },[time,showScore])
  const handleAnswer=(selected)=>{
      if(selected===data[current].answer){
        setScore((s)=>s+1);
      }
      if(current<data.length-1){
        setCurrent((prev)=>prev+1);
        setTime(10);
      }
      else{
        setShowScore(true);
        
      }
  }
  const restart=()=>{
    setCurrent(0);
    setScore(0);
    setShowScore(false);
    setTime(10);

  }
  return (
   <>
   <div className="quiz">

  {showScore ?(
    <div className="score">
    <h2>Your Score {score}/{data.length}</h2>
    <button onClick={restart}>Restart</button>
  </div>
  ):(
    <div className="question">
    <h2>Question : {current+1} </h2>
    <p>{data[current].question}</p>
    <div className="option">
       {
        data[current].options.map((option,index)=>(
          <button key={index} onClick={()=> handleAnswer(option)}>{option}</button>
        ))
       }
    </div>
    <div className="time">
      Time left : <span>{time}</span>
    </div>

  </div>
  )}  
  
   </div>
   </>
  )
}
