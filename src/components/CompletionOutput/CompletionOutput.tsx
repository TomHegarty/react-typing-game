import { MutableRefObject, useEffect, useRef } from 'react';
import './CompletionOutput.css'; 
import { Stats } from '../../types';

const CompletionOutput = (message: Stats) => {

    const button = useRef<any>();

    const reset = () => {
        console.log('reset')
    }
    
    useEffect(() => {
        if(message.completion > 10){
            button.current.innerHTML = '<button>restart</button>' // there should be a way to do this more 'reactish' ??
        }
    });

    return (
        <div className="completion-outer">
            <div className="output-box">
                <div className="output-box-header">Time</div> 
                <div className="output-box-value">{message.time}s</div>
            </div>
            <div className="output-box">
                <div className="output-box-header">Mistakes</div>
                <div className="output-box-value">{message.mistakes}</div>
            </div>
            <div className="output-box">
                <div className="output-box-header">Speed</div>
                <div className="output-box-value">{message.speed} wpm</div>
            </div>
            <div ref={button} className="output-box">
                <div className="output-box-header">Complete</div>
                <div className="output-box-value">{message.completion}%</div>
            </div>
        </div>
    );
}

export default CompletionOutput; 