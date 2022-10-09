import './App.css';
import { useState, useEffect } from 'react';

// Componenets 
import QuoteHeader from './components/QuoteHeader/QuoteHeader';
import ProgressBar from './components/ProgressBar/ProgressBar';

function App() {
    return (
      <div className="App">
        <QuoteHeader />
        <ProgressBar percent={"40"}/>
      </div>
    );
}

export default App;
