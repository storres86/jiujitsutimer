import React, { Component } from 'react';
import './App.css';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      // these are in seconds  (to get miliseconds --* by 1000) (25 mins is 1500 secs and 5 mins is 300 seconds )
      session_length: 25,  //1500000
      break_length: 5, // 300000
      real_session_length:1500000,
      real_break_length:300000,
      running: false,
      start: 0,
      running_break: false,
      start_break: 0,
    }

    this.handleClick = this.handleClick.bind(this);
    this.playandpause = this.playandpause.bind(this);
    this.reset = this.reset.bind(this);
    this.timer_session = null;
    this.timer_break = null;
  }

  componentDidMount(){
    this.setState({start: this.state.real_session_length, start_break: this.state.real_break_length})
  }

  playandpause(){
    // this.setState({running: !this.state.running},this.runningTime); this is currently working to for just when session is on
 if (this.state.running && !this.state.running_break && this.state.start < this.state.real_session_length){
  console.log("pandp2");
      this.setState({running: !this.state.running},this.runningTime);
    } else if (!this.state.running && !this.state.running_break && this.state.start < this.state.real_session_length) {
      console.log("pandp3");
      this.setState({running: !this.state.running},this.runningTime);
  } else if (!this.state.running && this.state.running_break && this.state.start_break < this.state.real_break_length) {
    console.log("pandp4");
    this.setState({running_break: !this.state.running_break},this.runningTime_break);
    } else if (!this.state.running && !this.state.running_break && this.state.start_break < this.state.real_break_length){
      console.log("pandp5");
      this.setState({running_break: true},this.runningTime_break);
    } else if (!this.state.running && !this.state.running_break){
      console.log("pandp1");
      this.setState({running: !this.state.running},this.runningTime)
    } 
  }
//works in ms
  // runningTime(){
  //   if (this.state.running === true){
  //     clearInterval(this.timer_break);
  //     this.timer_session = setInterval(() => {this.setState((prevState)=> {return {start: prevState.start - 1000} }
  //     )},1000);
  //   } else if (!this.state.running){
  //     clearInterval(this.timer_session);
  //   }
  // }

    runningTime(){
    if (this.state.running === true){
      clearInterval(this.timer_break);
      this.timer_session = setInterval(() => {this.setState((prevState)=> {return {start: prevState.start - 1000} }
      )},1000);
    } else if (!this.state.running){
      clearInterval(this.timer_session);
    }
  }

      runningTime_break(){
      if (this.state.running_break){
    clearInterval(this.timer_session);
    this.timer_break = setInterval(() => {this.setState((prevState)=> {return {start_break: prevState.start_break - 1000} }
    )},1000);}
    else if (!this.state.running_break){
      clearInterval(this.timer_break)
    }
  }


//works in ms
  //   runningTime_break(){
  //     if (this.state.running_break){
  //   clearInterval(this.timer_session);
  //   this.timer_break = setInterval(() => {this.setState((prevState)=> {return {start_break: prevState.start_break - 1000} }
  //   )},1000);}
  //   else if (!this.state.running_break){
  //     clearInterval(this.timer_break)
  //   }
  // }

  reset(){
    clearInterval(this.timer_session)
    clearInterval(this.timer_break);
    let myAudio = document.getElementById("beep");
    myAudio.pause();
    myAudio.currentTime = 0;
    let myWarning = document.getElementById("warning");
    myWarning.pause();
    myWarning.currentTime = 0;

    this.setState({start: 1500000, start_break: 300000,  real_session_length: 1500000, real_break_length: 300000,session_length:25,break_length: 5,running: false, running_break:false })
  }



  handleClick(x, y){
    console.log(this.state.session_length);
    if (!this.state.running && !this.state.running_break ){
      
    switch(x){
      case "break-decrement":
      this.setState((prevState) => {
      return {real_break_length: prevState.real_break_length - y, start_break: prevState.real_break_length - y, break_length: prevState.break_length - 1 }
      })
      break;

      case "break-increment":
      this.setState((prevState) => {
      return {real_break_length: prevState.real_break_length + y, start_break:prevState.real_break_length + y, break_length: prevState.break_length +1  }
      })
      break;

      case "session-decrement":
      this.setState((prevState) => {
        return {real_session_length:prevState.real_session_length -y, start:prevState.real_session_length -y, session_length: prevState.session_length - 1 }
      })
      break;

      case "session-increment":
        this.setState((prevState) => {
          return {real_session_length: prevState.real_session_length + y, start:prevState.real_session_length + y, session_length: prevState.session_length + 1 }
        })
        break
      }
    }
  };

  buzzer(){
    if (this.state.start === 0 && this.state.running || this.state.start_break === 0 && this.state.running_break){
      let myAudio = document.getElementById("beep");
            myAudio.load();
    myAudio.play();
    myAudio.currentTime = 0;
    } else if (this.state.start === 30000 && this.state.running || this.state.start_break === 0 && this.state.running_break) {
      let myWarning = document.getElementById("warning");
      myWarning.load();
      myWarning.play();
    }
  }
// This is the function that will decide when to start running break and when to switch back. 
  mySwitcher(){
    if (this.state.start < 0 && this.state.running === true ){
      console.log("First if in myswitcher just ran");
      clearInterval(this.timer_session);
      return this.setState({start: this.state.real_session_length, running: false, running_break:true}, this.runningTime_break)
    } else if (this.state.start_break < 0 && this.state.running_break == true){
      console.log("else if just ran in mySwitcher");
      return this.setState({running : true, running_break: false,start_break:this.state.real_break_length },this.runningTime)
    }
  }
// working with ms
  // limiter(){
  //   if (!this.state.running && !this.state.running_break && this.state.session_length === 0 ){
  //     console.log("limiter min ran");
  //     this.setState({session_length: 60000, start: 60000})
  //   } else if (!this.state.running && !this.state.running_break && this.state.session_length > 3600000) {
  //     console.log("limiter max ran");
  //     this.setState({session_length: 3600000, start: 3600000})
  //   } else if (!this.state.running && !this.state.running_break && this.state.break_length === 0 ){
  //     this.setState({break_length: 60000, start_break: 60000})
  //   } else if (!this.state.running && !this.state.running_break && this.state.break_length > 3600000){
  //     this.setState({break_length: 3600000, start_break: 3600000})
  //   }
  // }

    limiter(){
    if (!this.state.running && !this.state.running_break && this.state.real_session_length === 0 && this.state.session_length === 0 ){
      console.log("limiter min ran");
      this.setState({real_session_length: 60000, start: 60000, session_length: 1})
    } else if (!this.state.running && !this.state.running_break && this.state.real_session_length > 3600000 && this.state.session_length > 60) {
      console.log("limiter max ran");
      this.setState({real_session_length: 3600000, start: 3600000, session_length: 60})
    } else if (!this.state.running && !this.state.running_break && this.state.real_break_length === 0 && this.state.break_length === 0){
      this.setState({real_break_length: 60000, start_break: 60000, break_length:1 })
    } else if (!this.state.running && !this.state.running_break && this.state.real_break_length > 3600000 && this.state.break_length > 60){
      this.setState({real_break_length: 3600000, start_break: 3600000, break_length:60})
    }
  }

  redAlertText(){
    if (this.state.start && this.state.start < 30000){
      document.getElementById("time-left").style.color="red"
    } else if (this.state.start && this.state.start > 30000) {
      document.getElementById("time-left").style.color="black"
    }
  }



  render(){
    this.limiter();
this.mySwitcher();
this.redAlertText();
    
// this works in ms
    function milisecondConverter(x){
      let date = new Date(x);
      let h =date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      // console.log(date);
      // console.log(h,m,s);
      if (x == 3600000){
        return "60"+":"+"00"
      } else if (m < 10 && s === 0){
        return "0"+(m) + ":" + "0"+s;
      }else if (m <10 && s >= 1 && s <= 9){
        return "0"+(m) + ":"+"0" + s;
      }
      else if (m < 10){
        return "0"+(m) + ":" + s;
      }  else if (m >= 10 && s <10){
        return (m) + ":" + "0"+s;
      }
      else if  (s === 0) {
        return (m) + ":" + s+"0";
      } else if (m == 0 && s == 0 ) {
        return "00:00"
      }
      else {
        return (m) + ":" + s;
      }
    }



    function milisecondConverterNoSec(x){
      let date = new Date(x);
      let h =date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      if (x === 3600000 ){
        return 60
      } else {return m}


        



    }
   

    this.buzzer();

  return (
<div className="App container-fluid">
  <div className = "row">
  <h1 className="display-1 col-xl justify-content-md-center">Jiu Jitsu Round Timer</h1>
  </div>
    
    
      <div id = "break-label" className="row justify-content-center" >
      <button id = "break-decrement" className="down btn btn-primary col-2" onClick={() => this.handleClick("break-decrement", 60000)}>Down</button>
      <span className="col-3 display-5">Break Length</span>
      <button id = "break-increment" className="up btn btn-primary col-2 " onClick={() => this.handleClick("break-increment", 60000)}>Up</button>
      </div>
        <div className="row">
        <p id = "break-length" className="col align-self-center display-4">{this.state.break_length}</p>
        </div>
    
  
  <div id = "session-label" className="row justify-content-center">
  <button id = "session-decrement" className="down btn btn-primary col-2" onClick={() => this.handleClick("session-decrement", 60000)}>Down</button>
 <span className="col-3 display-5">Session Length</span>
  <button id = "session-increment" className="up btn btn-primary col-2" onClick={()=> this.handleClick("session-increment", 60000)}>Up</button>
  </div>
  
  <div className="row">
  <p id = "session-length" className="col align-self-center display-4">{this.state.session_length}</p>
  </div>
      
      

      <div id = "timer-label">
      {this.state.running && !this.state.running_break || 
      !this.state.running && !this.state.running_break && this.state.start <= this.state.real_session_length && this.state.start_break == this.state.real_break_length 
      ? <p className="display-4">Session</p> :<p className="display-4">Break</p> }
      <div id = "time-left" className="display-4">
      {this.state.running && !this.state.running_break || 
      !this.state.running && !this.state.running_break && this.state.start <= this.state.real_session_length && this.state.start_break == this.state.real_break_length 
      ? <p className="animate__animated animate__flipInX ">{milisecondConverter(this.state.start)}</p> : <p>{milisecondConverter(this.state.start_break)}</p>}</div>
      </div>
      <div className="row justify-content-center">
      <button id="start_stop" className= "btn-primary"onClick={this.playandpause}>Play/Pause</button>
      <button id = "reset" className="btn btn-danger" onClick={this.reset}>Reset</button>

      </div>
      
      
    
          

      
      
          <audio className = "buzzer" id="beep" preload="preload">
          <source src="https://dl3.pushbulletusercontent.com/UVA244Bze0Yk5P0lBfYdcDjE4kBpXXDS/Boxing_arena_sound-Samantha_Enrico-246597508.mp3" type="audio/mp3" />
          </audio>

          <audio className = "warningBuzzer" id="warning" preload="preload">
          <source src="https://dl3.pushbulletusercontent.com/CWDbV8a0TWbdqVeKGIeksXDkFznVYXBh/Red%20Alert-SoundBible.com-108009997.mp3" type="audio/mp3" />
          </audio>
    </div>
  );
  }
}

export default App;
