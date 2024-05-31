class WCCalculatorModel {
    constructor() {
        this.expression = '';
    }

    addToExpression(value) {
        this.expression += value;
    }

    clearExpression() {
        this.expression = '';
    }

    calculateExpression() {
        try {
            return eval(this.expression);
        } catch (error) {
            return 'Error';
        }
    }
}

class WCCalculatorController {
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

class WCCalculatorView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.display = null;
        this.buttons = [
            { id: "button7", value: "7", className: "numberButton" },
            { id: "button8", value: "8", className: "numberButton" },
            { id: "button9", value: "9", className: "numberButton" },
            { id: "buttonPlus", value: "+", className: "operatorButton" },
            { id: "button4", value: "4", className: "numberButton" },
            { id: "button5", value: "5", className: "numberButton" },
            { id: "button6", value: "6", className: "numberButton" },
            { id: "buttonMinus", value: "-", className: "operatorButton" },
            { id: "button3", value: "3", className: "numberButton" },
            { id: "button2", value: "2", className: "numberButton" },
            { id: "button1", value: "1", className: "numberButton" },
            { id: "buttonProduct", value: "*", className: "operatorButton" },
            { id: "button0", value: "0", className: "numberButton" },
            { id: "buttonDecimalPoint", value: ".", className: "numberButton" },
            { id: "buttonCalculate", value: "=", className: "calculateButton" },
            { id: "buttonDivision", value: "/", className: "operatorButton" },
            { id: "buttonClear", value: "BORRAR", className: "clearButton" }
        ];
    }

    connectedCallback() {
        const calculatorModel = new WCCalculatorModel();
        const calculatorController = new WCCalculatorController(this, calculatorModel);
    }

    initialize() {
        this.generateCalculator();
    }

    generateCalculator() {
        const style = document.createElement('style');
        style.textContent = `

        .numberButton {
            background-color: blue;
            color: #FFFFFF;
            border-color: #FFFFFF;
            border-radius: 6px;
            width: 100%;
        }

        .operatorButton {
            background-color: #00FF04;
            color: #FFFFFF;
            border-color: #FFFFFF;
            border-radius: 6px;
            width: 100%;
        }

        .clearButton {
            background-color: #FF0000;
            color: #FFFFFF;
            border-color: #FFFFFF;
            width: 100%;
            border-radius: 6px;
        }

        .calculateButton {
            background-color: #FFB900;
            color: #FFFFFF;
            border-color: #FFFFFF;
            width: 100%;
            border-radius: 6px;
        }

        .displayResult {
            border-radius: 6px;
        }
        `;
        this.shadowRoot.appendChild(style);

        const table = document.createElement("table");
        table.style.width = "400px";

        // DISPLAY
        const displayRow = document.createElement("tr");
        const displayCell = document.createElement("td");
        displayCell.setAttribute("colspan", "8");
        this.display = document.createElement("input");
        this.display.classList.add("displayResult");
        this.display.setAttribute("id", "display");
        this.display.setAttribute("type", "text");
        this.display.setAttribute("disabled", true);
        this.display.style.height = "40px";
        this.display.style.fontSize = "24px";
        this.display.style.width = "400px";
        this.display.style.textAlign = "right";
        displayCell.appendChild(this.display);
        displayRow.appendChild(displayCell);
        table.appendChild(displayRow);


        // BOTONES
        for (let i = 0; i < this.buttons.length; i += 4) {
            const row = document.createElement("tr");
            for (let j = i; j < i + 4 && j < this.buttons.length; j++) {
                const button = document.createElement("button");
                button.setAttribute("id", this.buttons[j].id);
                button.classList.add(this.buttons[j].className);
                button.textContent = this.buttons[j].value;
                button.style.width = "10px)";
                button.style.height = "50px";
                button.style.fontSize = "18px";
                button.style.margin = "5px";
                const cell = document.createElement("td");
                if (this.buttons[j].id === "buttonClear") {
                    cell.setAttribute("colspan", "4");
                }
                cell.appendChild(button);
                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        this.shadowRoot.appendChild(table);
    }

    updateDisplay(value) {
        this.display.value += value;
    }

    clearDisplay() {
        this.display.value = '';
    }

    calculateDisplay(value) {
        this.clearDisplay();
        this.display.value = value;
    }
}

customElements.define('my-wccalc', WCCalculatorView);
