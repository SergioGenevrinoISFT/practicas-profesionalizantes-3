export class WCCalculatorController {
    constructor(view) {
        this.view = view;
        this.initialize();
    }

    initialize() {
        this.view.initialize();
        this.addEventListeners();
    }

    addEventListeners() {
        const buttons = [
            this.view.btn7, this.view.btn8, this.view.btn9, this.view.btnPlus,
            this.view.btn4, this.view.btn5, this.view.btn6, this.view.btnMinus,
            this.view.btn3, this.view.btn2, this.view.btn1, this.view.btnProduct,
            this.view.btn0, this.view.btnDecimalPoint, this.view.btnCalculate, this.view.btnDivision,
            this.view.btnClear
        ];

        buttons.forEach(button => {
            if (button.textContent === "BORRAR") {
                button.addEventListener("click", this.onButtonClearClick.bind(this));
            } else if (button.textContent === "=") {
                button.addEventListener("click", this.onButtonCalculateClick.bind(this));
            } else {
                button.addEventListener("click", () => this.onButtonClick(button.textContent));
            }
        });
    }

    onButtonClick(value) {
        this.sendRequest('addToExpression', value)
            .then(response => this.view.updateDisplay(response.expression));
    }

    onButtonClearClick() {
        this.sendRequest('clearExpression')
            .then(() => this.view.clearDisplay());
    }

    onButtonCalculateClick() {
        this.sendRequest('calculateExpression')
            .then(response => this.view.calculateDisplay(response.result));
    }

    async sendRequest(action, value = '') {
        const response = await fetch('WCCalculatorModel.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action, value })
        });
        return await response.json();
    }
}
