import { useState } from 'react';
import './CompletionOutput.css'; 

const CompletionOutput = (message: any) => {

    let totalSeconds:number = 0;

    const setTime = () => {
        console.log(`starting timer`);
        setInterval(() => {
            totalSeconds++;
            console.log(totalSeconds);
        }, 1000);
    }
    
    if(message.timerState == 'start'){
        setTime();
    }

    return (
        <div className="completion-outer">
           <div className='completion-message'>{message.message}</div>
           <div>{totalSeconds}</div>
           <div className='reset-button'></div>
        </div>
    );
}

export default CompletionOutput; 