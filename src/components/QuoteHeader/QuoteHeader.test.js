import { render } from "@testing-library/react";
import QuoteHeader from "../CompletionOutput/CompletionOutput";

test('should render QuoteHeader component', () => {
    render(<QuoteHeader />);

    console.log(document.querySelector(".quote-header"));
    
    const QuoteHeaderComponent = document.querySelector(".quote-header");
    expect(QuoteHeaderComponent).toBeInTheDocument();
});

test('should handle key press when focused', () => {
    render(<QuoteHeader />);
    const QuoteHeaderComponent = document.querySelector(".quote-header");

    expect(QuoteHeaderComponent).toHaveFocus(true);

    // wrapper.find('button').simulate('keydown', {which: 13})
});