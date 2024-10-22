const inputValue = document.getElementById("user-input");

// Event listeners for numbers (improved readability)
const numbers = document.querySelectorAll(".numbers");
numbers.forEach(function (item) {
  item.addEventListener("click", function (e) {
    // Clear "NaN" or "0" on first input
    if (inputValue.innerText === "NaN" || inputValue.innerText === "0") {
      inputValue.innerText = "";
    }
    inputValue.innerText += e.target.innerHTML.trim();
  });
});

// Event listeners for operations (improved clarity, error handling)
const operations = document.querySelectorAll(".operations");
operations.forEach(function (item) {
  item.addEventListener("click", function (e) {
    let currentInput = inputValue.innerText;
    let lastChar = currentInput.charAt(currentInput.length - 1);

    switch (e.target.innerHTML) {
      case "=":
        try {
          inputValue.innerText = eval(currentInput); // Use eval cautiously (consider alternatives)
        } catch (error) {
          console.error("Invalid expression:", error.message);
          inputValue.innerText = "Error"; // Inform user of invalid calculation
        }
        break;
      case "AC":
        inputValue.innerText = 0;
        break;
      case "DEL":
        inputValue.innerText = currentInput.slice(0, -1); // More efficient slicing
        if (inputValue.innerText.length === 0) {
          inputValue.innerText = 0;
        }
        break;
      default:
        // Only append operators if the last character is a number or another operator
        if (!isNaN(lastChar) || isOperator(lastChar)) {
          inputValue.innerText += e.target.innerHTML;
        }
    }
  });
});

// Helper function to check for operators (optional)
function isOperator(char) {
  return ["+", "-", "*", "/", "."].includes(char);
}
