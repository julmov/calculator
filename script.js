const buttons = [
  "(",
  ")",
  "%",
  "AC",
  "7",
  "8",
  "9",
  "÷",
  "4",
  "5",
  "6",
  "×",
  "1",
  "2",
  "3",
  "-",
  "0",
  ".",
  "=",
  "+",
];

const display = document.createElement("input");
display.id = "display";
display.setAttribute("readonly", true);
document.getElementById("calculator").appendChild(display);

const keysContainer = document.createElement("div");
keysContainer.id = "keys";
document.getElementById("calculator").appendChild(keysContainer);

const history = document.createElement("div");
history.id = "history";
document.getElementById("hist").appendChild(history);
const historyOfOperations = document.createElement("h2");
historyOfOperations.id = "myH2";

buttons.forEach((btnText) => {
  const button = document.createElement("button");
  button.textContent = btnText;
  if (!isNaN(btnText) || btnText === ".") {
    button.addEventListener("click", () => appendToDisplay(btnText));
  } else if (btnText === "AC") {
    button.classList.add("symbol");
    button.addEventListener("click", clearDisplay);
  } else if (btnText === "=") {
    button.id = "equal";
    button.addEventListener("click", calculate);
  } else {
    button.classList.add("symbol");
    button.addEventListener("click", () => appendToDisplay(btnText));
  }
  keysContainer.appendChild(button);
});

function appendToDisplay(input) {
  display.value += input;
}

function clearDisplay() {
  display.value = "";
}

function computeResult(str) {
  return Function("return " + str)();
}

function calculate() {
  let expression = display.value;
  expression = expression.replace(/×/g, "*").replace(/÷/g, "/");
  display.value = computeResult(expression);
  history.innerHTML += expression + " = " + display.value + "<br>";
}
