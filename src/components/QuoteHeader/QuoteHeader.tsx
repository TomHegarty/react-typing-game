import { useState, useEffect, useRef, useCallback } from "react";
import './QuoteHeader.css'; 

import ProgressBar from '../ProgressBar/ProgressBar';
import CompletionOutput from '../CompletionOutput/CompletionOutput';

let timerset:boolean = false;
let timer:any = 0;

const QuoteHeader = () => {

    const [quote, setQuote] = useState({
        quote: "loading...", 
        author: "loading...",
        category: "loading..."
    });
    const [characterIndex, setCharacterIndex] = useState<number>(0);
    const [completionPercent, setCompletionPercent] = useState<number>(0);
    const [progressColor, setProgressColor] = useState<string>('red');
    const [seconds, setSeconds] = useState<number>(0);
    const [mistakes, setMistakes] = useState<number>(0);
    const [speed, setSpeed] = useState<number>(0);

    const dataFetchedRef = useRef(false);
    const correct = useRef<any>();
    const currentLetter = useRef<any>();
    const remaining = useRef<any>();

    const divElRef = useCallback((divElement:HTMLDivElement) => {
        if (divElement) {
            divElement.focus();
        }
    }, []);

    const fetchData = ():void => {
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

    const handleTimer = (state:string):void => {
        if(timerset && state === "start") return; 
        timerset = true;

        if(state === "start"){
            timer = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        }else if(state === "stop"){
            clearInterval(timer);
        }
    }

    const handleKeyPress = (key: string):void => {

        // complete
        if(characterIndex === quote.quote.split("").length - 1){
    
            setCompletionPercent(100);
            setCharacterIndex((prevCharacterIndex) => characterIndex + 1);
            setSeconds((prevSeconds) => prevSeconds);
            handleTimer("stop"); // this isn't working ???
            return;
        }

        if(key === quote.quote.split("")[characterIndex]){
            // correct key
            if(!timerset) handleTimer("start");
            
            setProgressColor('green');
            setCharacterIndex(characterIndex + 1); 
            setCompletionPercent( Math.floor((characterIndex/quote.quote.split("").length)*100) );

            let splitContent = quote.quote.split('');
            let correctLetters = [quote.quote.slice(0, characterIndex)];
            correctLetters.push(splitContent[characterIndex]);
            
            correct.current.innerHTML = correctLetters.join('');
            currentLetter.current.innerHTML = splitContent[characterIndex + 1];
            remaining.current.innerHTML = splitContent.slice(characterIndex + 2).join('');

            // speed calucalation
            const completeWords = quote.quote.slice(0, characterIndex).split(' ').length - 1;
            setSpeed( Math.round((completeWords / seconds) * 60));

        }else if(completionPercent < 100) {
            // wrong key
            setProgressColor('red');
            setMistakes((prevMistakes) => mistakes + 1);
        }
    }; 

    useEffect(() => {
        // guard to prevent strict mode re-rendering on 2nd call
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
            <CompletionOutput time={seconds} mistakes={mistakes} speed={speed} completion={completionPercent}></CompletionOutput>
        </>
    );
}

export default QuoteHeader; 