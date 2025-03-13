const playerName = sessionStorage.getItem("playerName") || "Wildcat";

let questions = [
	{
		prompt: "Who was the first person to approximate pi to 35 decimal places?",
		options: [
			"Ludolph van Ceulen",
			"Liu Hui",
			"Bhaskara II",
			"Jamshid al-Kashi",
		],
		answer: "Ludolph van Ceulen",
	},
	{
		prompt: "How did Ludolph van Ceulen approximate pi to 35 decimal places?",
		options: [
			"He inscribed a 2^62-sided polygon into a circle",
			"He used a Taylor/Maclaurin expansion",
			"He inscribed a 348-sided polygon into a circle",
			"He applied Simpson's Rule to approximate an integral that converges to pi",
		],
		answer: "He inscribed a 2^62-sided polygon into a circle",
	},
	{
		prompt: "What is the definition of pi?",
		options: [
			"Circumference divided by diameter",
			"Diameter divided by circumference",
			"Diameter divided by circumference squared",
			"Pi is pi",
		],
		answer: "Circumference divided by diameter",
	},
	{
		prompt: "What computational method is used for record-breaking pi approximations?",
		options: [
			"Chudnovsky's algorithm",
			"Monte Carlo estimations",
			"Machin's formula",
			"Gauss-Legendre algorithm",
		],
		answer: "Chudnovsky's algorithm",
	},
	{
		prompt: "What year was Pi Day first celebrated?",
		options: ["1956", "1988", "1975", "1995"],
		answer: "1988",
	},
	{
		prompt: "Which famous scientist's birthday coincides with Pi Day?",
		options: [
			"Archimedes",
			"Charles Darwin",
			"Albert Einstein",
			"Isaac Newton",
		],
		answer: "Albert Einstein",
	},
	{
		prompt: "What is the shape most commonly associated with pi?",
		options: ["Circle", "Square", "Triangle", "Oval"],
		answer: "Circle",
	},
	{
		prompt: "What is the name of the mathematician who first rigorously proved that π is irrational?",
		options: ["Euclid", "Pythagoras", "Johann Lambert", "Isaac Newton"],
		answer: "Johann Lambert",
	},
	{
		prompt: "What is the mathematical symbol for pi?",
		options: ["𝝿", "𝞥", "𝞓", "𝚺"],
		answer: "𝝿",
	},
	{
		prompt: "Which ancient Greek mathematician first estimated pi using inscribed and circumscribed polygons?",
		options: ["Euclid", "Archimedes", "Ptolemy", "Hippocrates"],
		answer: "Archimedes",
	},
	{
		prompt: "What is the continued fraction representation of pi used for approximations?",
		options: [
			"3 + 1/(7 + 1/(15 + 1/(1 + 1/292)))",
			"3 + 1/(5 + 1/(12 + 1/(4 + 1/9)))",
			"3 + 1/(6 + 1/(10 + 1/(3 + 1/8)))",
			"3 + 1/(4 + 1/(11 + 1/(6 + 1/20)))",
		],
		answer: "3 + 1/(7 + 1/(15 + 1/(1 + 1/292)))",
	},
	{
		prompt: "What famous formula expresses pi in terms of an infinite product involving prime numbers?",
		options: [
			"Euler's product formula",
			"Wallis product formula",
			"Machin's formula",
			"Ramanujan’s pi formula",
		],
		answer: "Wallis product formula",
	},
	{
		prompt: "What famous identity links pi, e, i, 1, and 0?",
		options: [
			"Euler's identity",
			"Taylor's theorem",
			"Fourier's equation",
			"Newton’s formula",
		],
		answer: "Euler's identity",
	},
	{
		prompt: "What is the approximate value of pi to 10 decimal places?",
		options: [
			"3.1415926535",
			"3.1415926543",
			"3.1415926538",
			"3.1415926527",
		],
		answer: "3.1415926535",
	},
	{
		prompt: "Which famous mathematician developed an infinite series for calculating pi that begins with π/4 = 1 - 1/3 + 1/5 - 1/7 + ...?",
		options: ["Leibniz", "Newton", "Gauss", "Euler"],
		answer: "Leibniz",
	},
	{
		prompt: "Which irrational number is closely related to pi and appears in trigonometric integrals?",
		options: [
			"Euler's number (e)",
			"The golden ratio (φ)",
			"The square root of 2",
			"The Feigenbaum constant",
		],
		answer: "Euler's number (e)",
	},
	{
		prompt: "What is the term for an algorithm that rapidly converges to pi using arithmetic and geometric means?",
		options: [
			"Gauss-Legendre algorithm",
			"Newton-Raphson method",
			"Euler-Maclaurin formula",
			"Monte Carlo estimation",
		],
		answer: "Gauss-Legendre algorithm",
	},
	{
		prompt: "Which ancient civilization first recorded a rough approximation of pi as 3.125?",
		options: ["Babylonians", "Egyptians", "Greeks", "Chinese"],
		answer: "Babylonians",
	},
];

Array.prototype.shuffle = function () {
	for (let i = this.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[this[i], this[j]] = [this[j], this[i]];
	}
	return this;
};

// shuffle questions
questions = questions.shuffle();

let prompt = document.getElementById("prompt");
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
let button4 = document.getElementById("button4");
let submit = document.getElementById("submit");
let selected;

let scoreDisplay = document.getElementById("score");
let livesDisplay = document.getElementById("lives");

let question, answer, options;
let questionIndex = 0;

let score = 0;
let lives = 2;

function displayQuestion() {
	selected = null;

	question = questions[questionIndex];
	answer = question.answer;
	options = question.options;

	updateScoreInfo();

	prompt.textContent = question.prompt;
	button1.textContent = options[0];
	button2.textContent = options[1];
	button3.textContent = options[2];
	button4.textContent = options[3];
}

function checkQuestion() {
	if (selected === null) {
		alert("Please select an answer");
	} else {
		if (options[selected] === answer) {
			score++;
			if (score === 3) {
				sessionStorage.setItem("win", "1");
				console.log("just set it to 1");
				window.location.href = "gameover.html";
			} else {
				questionIndex++;
				resetButtons();
				displayQuestion();
				lives = 2;
			}
		} else {
			alert("Incorrect!");
			resetButtons();
			lives--;
			if (lives === 0) {
				sessionStorage.setItem("win", "0");
				console.log("just set it to 0");
				window.location.href = "gameover.html";
			}
		}
		updateScoreInfo();
	}
}

function updateScoreInfo() {
	scoreDisplay.textContent = `Score: ${score}`;
	livesDisplay.textContent = `Lives: ${lives}`;
}

const resetButtons = () => {
	document
		.querySelectorAll("button")
		.forEach((btn) => btn.classList.remove("selected"));
};

const changeSelected = (index) => {
	resetButtons();
	selected = index;
	document.getElementById(`button${selected + 1}`).classList.add("selected");
};

button1.addEventListener("click", () => changeSelected(0));
button2.addEventListener("click", () => changeSelected(1));
button3.addEventListener("click", () => changeSelected(2));
button4.addEventListener("click", () => changeSelected(3));
submit.addEventListener("click", checkQuestion);

// resets attempt each time, remove in prod?
sessionStorage.removeItem("win");
displayQuestion();
