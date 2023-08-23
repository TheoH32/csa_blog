<!DOCTYPE html>
<html>
<head>
    <title>Simple Calculator</title>
</head>
<body>
    <h1>Simple Calculator</h1>
    <input type="text" id="result" readonly>
    <br>
    <button onclick="appendToResult('7')">7</button>
    <button onclick="appendToResult('8')">8</button>
    <button onclick="appendToResult('9')">9</button>
    <button onclick="appendToResult('+')">+</button>
    <br>
    <button onclick="appendToResult('4')">4</button>
    <button onclick="appendToResult('5')">5</button>
    <button onclick="appendToResult('6')">6</button>
    <button onclick="appendToResult('-')">-</button>
    <br>
    <button onclick="appendToResult('1')">1</button>
    <button onclick="appendToResult('2')">2</button>
    <button onclick="appendToResult('3')">3</button>
    <button onclick="appendToResult('*')">*</button>
    <br>
    <button onclick="appendToResult('0')">0</button>
    <button onclick="clearResult()">C</button>
    <button onclick="calculateResult()">=</button>
    <button onclick="appendToResult('/')">/</button>
    <br>
    <script>
        let currentInput = "";
        function appendToResult(value) {
            currentInput += value;
            document.getElementById("result").value = currentInput;
        }
        function clearResult() {
            currentInput = "";
            document.getElementById("result").value = "";
        }
        function calculateResult() {
            try {
                currentInput = eval(currentInput).toString();
                document.getElementById("result").value = currentInput;
            } catch (error) {
                document.getElementById("result").value = "Error";
            }
        }
    </script>
</body>
</html>
