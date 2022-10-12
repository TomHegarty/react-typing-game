import { useState } from 'react';
import './CompletionOutput.css'; 

const CompletionOutput = (message: any) => {

    const [completionMessage, setCompletionMessage] = useState<string>(message.message);

    return (
        <div className="completion-outer">
           <div className='completion-message'>{completionMessage}</div>
           <div className='reset-button'></div>
        </div>
    );
}

export default CompletionOutput; 