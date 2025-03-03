const playerName = sessionStorage.getItem("playerName") || "Wildcat";

let questions = [
	{
		prompt: "who was the first person to approximate pi to 35 decimal places?",
		options: ["ludolph van ceulen", "liu hui", "Bhaskara the 2nd", "jamshid al kashi"],
		answer: "ludolph van ceulen",
	},
	{
		prompt: "How did ludolph van ceulen approximate pi to 35 decimal places?",
		options: [
			"he inscribed a 2^62 sided polygon into a circle", 
			"he used a taylor/maclaurin expansion", 
			"he inscribed a 348 sided polygon into a circle", 
			"he applied simpsons rule to approximate an integral that converges to pi"
		],
		answer: "he inscribed a 2^62 sided polygon into a circle",
	},
	{
		prompt: "what's the definition of pi?",
		options: [
			"circumference divided by diameter",
			"diameter divided by circumference",
			"pi is pi",
		],
		answer: "circumference divided by diameter"
	},
	{
		prompt: "what computational method is used for record breaking pi approximations?",
		options: [
			"Chudnovsky's algorithm",
			"monte carlo estimations",
			"machin formula",
			"gauss-legendre algorithm",
		],
		answer: "Chudnovsky's algorithm",
	},
	{
		prompt: "What is the name of the mathematician who first rigorously proved that π is irrational?",
		options: ["Euclid", "Pythagoras", "Johann Lambert", "Isaac Newton"],
		answer: "Johann Lambert",
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
	for (let i = 0; i < 4; i++) {
		document.getElementById(`button${i + 1}`).style.backgroundColor = "";
	}
};

const changeSelected = (index) => {
	resetButtons();
	selected = index;
	document.getElementById(`button${selected + 1}`).style.backgroundColor =
		"#ccc";
};

button1.addEventListener("click", () => changeSelected(0));
button2.addEventListener("click", () => changeSelected(1));
button3.addEventListener("click", () => changeSelected(2));
button4.addEventListener("click", () => changeSelected(3));
submit.addEventListener("click", checkQuestion);

// resets attempt each time, remove in prod?
sessionStorage.removeItem("win");
displayQuestion();
