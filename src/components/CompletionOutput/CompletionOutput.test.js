import { render } from "@testing-library/react";
import CompletionOutput from "../CompletionOutput/CompletionOutput";

test('should render completion output component', () => {
    render(<CompletionOutput time={10} mistakes={5} speed={100} completion={50}/>);

    const CompletionComponent = document.querySelector(".completion-outer");
    expect(CompletionComponent).toBeInTheDocument();

    const outputBoxes = CompletionComponent.querySelectorAll(".output-box-value");
    expect(outputBoxes[0].innerHTML).toBe("10s");
    expect(outputBoxes[1].innerHTML).toBe("5");
    expect(outputBoxes[2].innerHTML).toBe("100 wpm");
});