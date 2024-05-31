export class WCCalculatorController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.initialize();
    }

    initialize() {
        this.view.initialize();
        this.addEventListeners();
    }

    addEventListeners() {
        this.view.buttons.forEach(button => {
            const element = this.view.shadowRoot.getElementById(button.id);
            if (element) {
                if (button.id === "buttonClear") {
                    element.addEventListener("click", this.onButtonClearClick.bind(this));
                } else if (button.id === "buttonCalculate") {
                    element.addEventListener("click", this.onButtonCalculateClick.bind(this));
                } else {
                    element.addEventListener("click", () => this.onButtonClick(button.value));
                }
            }
        });
    }

    onButtonClick(value) {
        this.model.addToExpression(value);
        this.view.updateDisplay(value);
    }

    onButtonClearClick() {
        this.model.clearExpression();
        this.view.clearDisplay();
    }

    onButtonCalculateClick() {
        const result = this.model.calculateExpression();
        this.view.calculateDisplay(result);
    }
}
