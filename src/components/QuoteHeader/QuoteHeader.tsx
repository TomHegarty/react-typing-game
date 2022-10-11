import { useState, useEffect, useRef, useCallback, Component } from "react";
import './QuoteHeader.css'; 

import ProgressBar from '../ProgressBar/ProgressBar';

const QuoteHeader = () => {

    const [quote, setQuote] = useState({
        quote: "loading...", 
        author: "loading...",
        category: "loading..."
    });
    const [characterIndex, setCharacterIndex] = useState<number>(0);
    const [completionPercent, setCompletionPercent] = useState<number>(0);
    const [progressColor, setProgressColor] = useState<string>('red');

    const dataFetchedRef = useRef(false);
    let quoteBody = useRef<any>();

    const divElRef = useCallback((divElement:HTMLDivElement) => {
        if (divElement) {
            divElement.focus();
        }
    }, []);

    const fetchData = () => {
        fetch('https://api.api-ninjas.com/v1/quotes', {
            headers: {
                'X-Api-Key': '7kdEYjZywhrLKqyGpt+Tjg==7xwvtVkJWtHQzZ7x'
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setQuote(data[0]);
        })
    }

    const handleKeyPress = (key: string) => {

        if(characterIndex === quote.quote.split("").length - 1){
            alert(`your're winner`);
            return
        }

        if(key === quote.quote.split("")[characterIndex]){
            console.log("yes");
            setProgressColor('green');
            setCharacterIndex(characterIndex + 1); //?
            setCompletionPercent((characterIndex/quote.quote.split("").length)*100);

            let splitContent = quote.quote.split('');
            let correctLetters = [quote.quote.slice(0, characterIndex)];
            correctLetters.push(splitContent[characterIndex]);
            quoteBody.current.innerHTML = `<span class="custom">${correctLetters.join('')}</span>${splitContent.slice(characterIndex + 1).join('')}`; // better way of doing this for sure

        }else{
            console.log('no');
            setProgressColor('red');
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
                <h1 ref={quoteBody}>{quote.quote}</h1>
                <p>-{quote.author}</p>
            </div>
            <ProgressBar percent={completionPercent} color={progressColor}/>
        </>
    );
}

export default QuoteHeader; 