import { useState, useEffect, useRef, useCallback, Component } from "react";
import './QuoteHeader.css'; 

import ProgressBar from '../ProgressBar/ProgressBar';
import CompletionOutput from '../CompletionOutput/CompletionOutput';

const QuoteHeader = () => {

    const [quote, setQuote] = useState({
        quote: "loading...", 
        author: "loading...",
        category: "loading..."
    });
    const [characterIndex, setCharacterIndex] = useState<number>(0);
    const [completionPercent, setCompletionPercent] = useState<number>(0);
    const [completionMessage, setcompletionMessage] = useState<string>('keep typing');
    const [progressColor, setProgressColor] = useState<string>('red');

    const dataFetchedRef = useRef(false);
    const correct = useRef<any>();
    const currentLetter = useRef<any>();
    const remaining = useRef<any>();

    const divElRef = useCallback((divElement:HTMLDivElement) => {
        if (divElement) {
            divElement.focus();
        }
    }, []);

    const fetchData = () => {
        fetch('https://api.api-ninjas.com/v1/quotes', {
            headers: {
                'X-Api-Key': process.env.REACT_APP_QUOTE_API_KEY as string
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setQuote(data[0]);
        })
    }

    const handleKeyPress = (key: string) => {

        if(characterIndex === quote.quote.split("").length - 1){
            console.log('done');
            setcompletionMessage(`your're winner`); 
            setCharacterIndex(characterIndex + 1); //?
            setCompletionPercent(100);
            return;
        }

        if(key === quote.quote.split("")[characterIndex]){
            setProgressColor('green');
            setCharacterIndex(characterIndex + 1); //?
            setCompletionPercent((characterIndex/quote.quote.split("").length)*100);

            let splitContent = quote.quote.split('');
            let correctLetters = [quote.quote.slice(0, characterIndex)];
            correctLetters.push(splitContent[characterIndex]);
            
            correct.current.innerHTML = correctLetters.join('');
            currentLetter.current.innerHTML = splitContent[characterIndex + 1];
            remaining.current.innerHTML = splitContent.slice(characterIndex + 2).join('');
        }else{
            setProgressColor('red');
            setcompletionMessage('wrong key');
        }
    }; 

    useEffect(() => {
        // guard to prevetn strict mode re-rendering on 2nd call
        if (dataFetchedRef.current) return;

        dataFetchedRef.current = true;
        fetchData();
    },[])

    return (
        <>
            <div className="quote-header" ref={divElRef} tabIndex={1} onKeyDown={(e: any) => handleKeyPress(e.key)}>
                <h1>
                    <span ref={correct} className="correct"></span>
                    <span ref={currentLetter} className="current"></span>
                    <span ref={remaining}>{quote.quote}</span>
                </h1>
                <p>-{quote.author}</p>
            </div>
            <ProgressBar percent={completionPercent} color={progressColor}/>
            <CompletionOutput message={completionMessage}></CompletionOutput>
        </>
    );
}

export default QuoteHeader; 