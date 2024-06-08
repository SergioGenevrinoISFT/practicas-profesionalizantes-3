import { WCCalculatorModel } from './model.js';
import { WCCalculatorController } from './controller.js';

class WCCalculatorView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // DISPLAY
        this.display = document.createElement("input");
        this.display.classList.add("displayResult");
        this.display.setAttribute("type", "text");
        this.display.setAttribute("disabled", true);
        this.display.style.height = "40px";
        this.display.style.fontSize = "24px";
        this.display.style.width = "100%";
        this.display.style.textAlign = "right";

        // BUTTONS
        this.btn7 = this.createButton("7", "numberButton");
        this.btn8 = this.createButton("8", "numberButton");
        this.btn9 = this.createButton("9", "numberButton");
        this.btnPlus = this.createButton("+", "operatorButton");

        this.btn4 = this.createButton("4", "numberButton");
        this.btn5 = this.createButton("5", "numberButton");
        this.btn6 = this.createButton("6", "numberButton");
        this.btnMinus = this.createButton("-", "operatorButton");

        this.btn3 = this.createButton("3", "numberButton");
        this.btn2 = this.createButton("2", "numberButton");
        this.btn1 = this.createButton("1", "numberButton");
        this.btnProduct = this.createButton("*", "operatorButton");

        this.btn0 = this.createButton("0", "numberButton");
        this.btnDecimalPoint = this.createButton(".", "numberButton");
        this.btnCalculate = this.createButton("=", "calculateButton");
        this.btnDivision = this.createButton("/", "operatorButton");

        this.btnClear = this.createButton("BORRAR", "clearButton");

        this.generateCalculator();
    }

    connectedCallback() {

    }

    initialize() {

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

        // DISPLAY ROW
        const displayRow = document.createElement("tr");
        const displayCell = document.createElement("td");
        displayCell.setAttribute("colspan", "4");
        displayCell.appendChild(this.display);
        displayRow.appendChild(displayCell);
        table.appendChild(displayRow);

        // ROW 1
        const row1 = document.createElement("tr");
        row1.appendChild(this.createButtonCell(this.btn7));
        row1.appendChild(this.createButtonCell(this.btn8));
        row1.appendChild(this.createButtonCell(this.btn9));
        row1.appendChild(this.createButtonCell(this.btnPlus));
        table.appendChild(row1);

        // ROW 2
        const row2 = document.createElement("tr");
        row2.appendChild(this.createButtonCell(this.btn4));
        row2.appendChild(this.createButtonCell(this.btn5));
        row2.appendChild(this.createButtonCell(this.btn6));
        row2.appendChild(this.createButtonCell(this.btnMinus));
        table.appendChild(row2);

        // ROW 3
        const row3 = document.createElement("tr");
        row3.appendChild(this.createButtonCell(this.btn3));
        row3.appendChild(this.createButtonCell(this.btn2));
        row3.appendChild(this.createButtonCell(this.btn1));
        row3.appendChild(this.createButtonCell(this.btnProduct));
        table.appendChild(row3);

        // ROW 4
        const row4 = document.createElement("tr");
        row4.appendChild(this.createButtonCell(this.btn0));
        row4.appendChild(this.createButtonCell(this.btnDecimalPoint));
        row4.appendChild(this.createButtonCell(this.btnCalculate));
        row4.appendChild(this.createButtonCell(this.btnDivision));
        table.appendChild(row4);

        // ROW 5
        const row5 = document.createElement("tr");
        const clearCell = document.createElement("td");
        clearCell.setAttribute("colspan", "4");
        clearCell.appendChild(this.btnClear);
        row5.appendChild(clearCell);
        table.appendChild(row5);

        this.shadowRoot.appendChild(table);
    }

    createButton(value, className) {
        const button = document.createElement("button");
        button.classList.add(className);
        button.textContent = value;
        button.style.width = "100%";
        button.style.height = "50px";
        button.style.fontSize = "18px";
        button.style.margin = "5px";
        return button;
    }

    createButtonCell(button) {
        const cell = document.createElement("td");
        cell.appendChild(button);
        return cell;
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

// CREACION DE INSTANCIAS DEL MODELO Y CONTROLADOR
document.addEventListener('DOMContentLoaded', () => {

    const calculatorView = document.querySelector('my-wccalc');
    const calculatorModel = new WCCalculatorModel();
    new WCCalculatorController(calculatorView, calculatorModel);
});
