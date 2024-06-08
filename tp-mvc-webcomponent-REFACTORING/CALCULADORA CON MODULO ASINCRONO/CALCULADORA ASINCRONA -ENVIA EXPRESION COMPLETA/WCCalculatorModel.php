<?php


class WCCalculatorModel
{
    private $expression = '';

    public function __construct()
    {
        if (isset($_SESSION['expression'])) {
            $this->expression = $_SESSION['expression'];
        }
    }

    public function calculateExpression($expression)
    {
        try {
            $result = eval("return " . $expression . ";");
            return $result;
        } catch (Throwable $error) {
            return 'Error';
        }
    }

    public function clearExpression()
    {
        $this->expression = '';
        $_SESSION['expression'] = $this->expression;
        return $this->expression;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $calculator = new WCCalculatorModel();

    $response = [];
    if (isset($data['action'])) {
        switch ($data['action']) {
            case 'clearExpression':
                $response['expression'] = $calculator->clearExpression();
                break;
            case 'calculateExpression':
                $response['result'] = $calculator->calculateExpression($data['expression']);
                break;
        }
    }

    echo json_encode($response);
}
