export class WCCalculatorModel {
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
