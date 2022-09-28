import { useState, useEffect } from "react";
import './QuoteHeader.css'; 

const QuoteHeader = () => {

    
    const [quote, setQuote] = useState("Loading...");

    useEffect(() => {
        const fetchQuote = () => {
            fetch('https://api.api-ninjas.com/v1/quotes', {
                headers: { 
                    'X-Api-Key': '7kdEYjZywhrLKqyGpt+Tjg==7xwvtVkJWtHQzZ7x'
                },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);   
                setQuote(data[0]);    
            });
        }

        fetchQuote();
    },[]);

    return (
        <>
            <div className="quote-header">
                <h1>{quote.quote}</h1>
                <p>-{quote.author}</p>
                <div className="quote-category">{quote.category}</div>
            </div>
        </>
    );
}

export default QuoteHeader; 