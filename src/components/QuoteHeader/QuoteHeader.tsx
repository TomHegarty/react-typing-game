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

    const dataFetchedRef = useRef(false);

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

        if(characterIndex === quote.quote.split("").length){
            alert(`your're winner`);
            return
        }

        if(key === quote.quote.split("")[characterIndex]){
            console.log("yes");
            setCharacterIndex(characterIndex + 1); //?
            setCompletionPercent((characterIndex/quote.quote.split("").length)*100);
        }else{
            console.log('no');
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
                <h1>{quote.quote}</h1>
                <p>-{quote.author}</p>
            </div>
            <ProgressBar percent={completionPercent}/>
        </>
    );
}

export default QuoteHeader; 