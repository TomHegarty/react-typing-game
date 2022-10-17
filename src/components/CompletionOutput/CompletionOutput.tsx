
import './CompletionOutput.css'; 
import { Stats } from '../../types';

const CompletionOutput = (message: Stats) => {

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
            <div className="output-box">
                <div className="output-box-header">Completion</div>
                <div className="output-box-value">{message.completion}%</div>
            </div>
        </div>
    );
}

export default CompletionOutput; 