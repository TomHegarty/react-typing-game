import { useState } from 'react';
import './ProgressBar.css'; 

const ProgressBar = (percent:any, color:string) => {

    console.log(color);

    return (
        <div className="progress-bar-outer">
            <div className="progress-bar-inner">
                <div className="progress-bar" style={{width : `${percent.percent}%`, backgroundColor: color}}></div>
            </div>
        </div>
    );
}

export default ProgressBar; 