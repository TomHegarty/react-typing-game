import { useState } from 'react';
import './ProgressBar.css'; 

const ProgressBar = (percent:any) => {

    return (
        <div className="progress-bar-outer">
            <div className="progress-bar-inner">
                <div className="progress-bar" style={{width : `${Math.floor(percent.percent)}%`, backgroundColor: percent.color}}></div>
            </div>
        </div>
    );
}

export default ProgressBar; 