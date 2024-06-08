export class WCCalculatorController {
    constructor(view) {
        this.view = view;
        this.initialize();
        this.expression = ''; // Inicializar la expresión
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
        // Agregar el valor al final de la expresión
        this.expression += value;
        this.view.updateDisplay(this.expression); // Actualizar el display
    }

    onButtonClearClick() {
        // Limpiar la expresión
        this.expression = '';
        this.view.clearDisplay(); // Limpiar el display
    }

    onButtonCalculateClick() {
        // Enviar la expresión completa para su evaluación
        this.sendRequest('calculateExpression', this.expression)
            .then(response => {
                if (response.result !== 'Error') {
                    console.log(response);
                    this.view.calculateDisplay(response.result); // Mostrar el resultado en el display
                    this.expression = response.result; // Inicializar la expresión
                } else {
                    // Manejar el caso de error
                    console.error('Error al evaluar la expresión');
                }
            });
    }

    async sendRequest(action, expression = '') {
        console.log(action);
        console.log(expression);
        const response = await fetch('WCCalculatorModel.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action, expression })
        });
        return await response.json();
    }
}
