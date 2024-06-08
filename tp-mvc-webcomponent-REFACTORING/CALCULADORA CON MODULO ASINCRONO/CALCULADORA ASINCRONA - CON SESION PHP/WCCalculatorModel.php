<?php

session_start();

class WCCalculatorModel
{
    private $expression = '';

    public function __construct()
    {
        if (isset($_SESSION['expression'])) {
            $this->expression = $_SESSION['expression'];
        }
    }

    public function addToExpression($value)
    {
        $this->expression .= $value;
        $_SESSION['expression'] = $this->expression;
        return $this->expression;
    }

    public function clearExpression()
    {
        $this->expression = '';
        $_SESSION['expression'] = $this->expression;
        return $this->expression;
    }

    public function calculateExpression()
    {
        try {
            $result = eval("return " . $this->expression . ";");
            $this->expression = '';
            $_SESSION['expression'] = $this->expression;
            return $result;
        } catch (Throwable $error) {
            return 'Error';
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $calculator = new WCCalculatorModel();

    $response = [];
    if (isset($data['action'])) {
        switch ($data['action']) {
            case 'addToExpression':
                $response['expression'] = $calculator->addToExpression($data['value']);
                break;
            case 'clearExpression':
                $response['expression'] = $calculator->clearExpression();
                break;
            case 'calculateExpression':
                $response['result'] = $calculator->calculateExpression();
                break;
        }
    }

    echo json_encode($response);
}
