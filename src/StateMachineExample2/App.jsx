import React, {useState, useRef, useEffect} from 'react';
import "./app.css";


export const App = () => {
  const stateMachineRef= useRef(null);

  const [curMode, setCurMode] = useState(STATE_MACHINE.init);
  const [buttonText , setButtonText] = useState(createtext(curMode))

  useEffect(()=>{
    setButtonText(createtext(curMode))
  },[curMode])


  const handleClick = () => {
    // .dataset这个API的使用：
    const curTheme = stateMachineRef?.current?.dataset.theme;
    // 通过 STATE_MACHINE来获取下一个theme ;)
    const nextTheme = STATE_MACHINE.states[curTheme].on['CLICK'];
    setCurMode(nextTheme);
  }

  return (
    <div className='stateMachineII' data-theme={curMode} ref={stateMachineRef}  >
        <input type='email' placeholder='your@email.com'/>
        <button type='submit' onClick={handleClick}> {buttonText} </button>
    </div>
  )
};

/************************************** Helper function *********************************************/
const createtext = (mode) => {
  switch(mode){
      case "init": return 'Subscribe';
      case "pending": return 'Subscribing';
      case "error": return 'Subscribed error';
      case "success": return 'Subscribe success';
      default: return 'Subscribe';
  }
}

const STATE_MACHINE = {
  init: 'init',
  states:{
    pending: { on: { CLICK:'error' } },
    error: { on: { CLICK:'success' } },
    success: { on: { CLICK:'init' } },
    init: { on: {CLICK: 'pending'}}
  }
}
