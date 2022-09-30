import { useState, useEffect } from "react";
import './QuoteHeader.css'; 

const QuoteHeader = () => {

    const [quote, setQuote] = useState({
        quote : "Xoading...",
        author: "loading..."
    });

    const typingDetection = (quote) => {
        const charArray = quote.split("");
        let characterIndex = 0; 

        console.log(charArray);

        document.addEventListener('keydown', (e) => {
            if(e.key == charArray[characterIndex]){
                console.log("yes");
                characterIndex++
            }else{
                console.log('no')
            }
        });
    }
    
    useEffect(() => {

        fetch('https://api.api-ninjas.com/v1/quotes', {
            headers: {
                'X-Api-Key': '7kdEYjZywhrLKqyGpt+Tjg==7xwvtVkJWtHQzZ7x'
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setQuote(data[0]);
        });

        typingDetection(quote.quote);

    },[])

 

    return (
        <>
            <div className="quote-header">
                <h1>{quote.quote}</h1>
                <p>-{quote.author}</p>
            </div>
        </>
    );
}

export default QuoteHeader; 