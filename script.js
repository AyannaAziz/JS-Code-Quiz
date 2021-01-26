document.addEventListener('DOMContentLoaded', (event) => {


	//1. Setting intial required variables  & setup local storage
	const initialTime = 75;
	let time = 75;
	let score = 0;
	let qCount = 0;
	let timeset;
	let answers = document.querySelectorAll('#quizHolder button');

	//2. Sets array then if local storage exists it populates it into the array of records.
	let recordsArray = [];
	// Retrieve data if it exists or keep empty array otherwise.
	(localStorage.getItem('recordsArray')) ? recordsArray = JSON.parse(localStorage.getItem('recordsArray')): recordsArray = [];


	// function to quickly call elements
	let queryElement = (element) => {
		return document.querySelector(element);
	}

	// function to hide all sections then unhide the one provided by the parameter
	let onlyDisplaySection = (element) => {
		let sections = document.querySelectorAll("section");
		Array.from(sections).forEach((userItem) => {
			userItem.classList.add('hide');
		});
		queryElement(element).classList.remove('hide');
	}

	
	// function to set the question data in questionHolder section
	let setQuestionData = () => {
		queryElement('#quizHolder p').innerHTML = questions[qCount].title;
		queryElement('#quizHolder button:nth-of-type(1)').innerHTML = `1. ${questions[qCount].choices[0]}`;
		queryElement('#quizHolder button:nth-of-type(2)').innerHTML = `2. ${questions[qCount].choices[1]}`;
		queryElement('#quizHolder button:nth-of-type(3)').innerHTML = `3. ${questions[qCount].choices[2]}`;
		queryElement('#quizHolder button:nth-of-type(4)').innerHTML = `4. ${questions[qCount].choices[3]}`;
	}

	//function changes the question and has a parameter to control the text which is provided weather it is correct or wrong
	let quizUpdate = (answerCopy) => {
		queryElement('#scoreIndicator p').innerHTML = answerCopy;
		queryElement('#scoreIndicator').classList.remove('invisible', scoreIndicator());
		Array.from(answers).forEach(answer =>
		{
			answer.classList.add('disable');
		});

		// If all the questions have been answered exist the quiz section
		setTimeout(() => {
			if (qCount === questions.length) {
				onlyDisplaySection("#finish");
				time = 0;
				queryElement('#time').innerHTML = time;
			} else {
				// Updates copy in questions with the net array's question text.
				setQuestionData();
				// Removed disabled status.
				Array.from(answers).forEach(answer => {
					answer.classList.remove('disable');
				});
			}
		}, 1000);
	}

	// function handles time related events for the quiz
	let myTimer = () => {
		if (time > 0) {
			time = time - 1;
			queryElement('#time').innerHTML = time;
		} else {
			clearInterval(clock);
			queryElement('#score').innerHTML = score;
			onlyDisplaySection("#finish");
		}
	}


	// On intro button click start time and starts giving questions
	let clock;
	queryElement("#intro button").addEventListener("click", (e) => {
		//call above function to set Initial data in questionHolder section
		setQuestionData();
		onlyDisplaySection("#quizHolder");
		clock = setInterval(myTimer, 1000);
	});

	// Clears timeout if next question is answered before current timeout is reached or if form element has a requirement not met.

	let scoreIndicator = () => {
		clearTimeout(timeset);
		timeset = setTimeout(() => {
		    queryElement('#scoreIndicator').classList.add('invisible');
		}, 1000);
	}

//controls

	// Create an array of selected divs so I can refer to them with the this keyword and replace their values to then check against the answer property for all questions.
	Array.from(answers).forEach(check => {
		check.addEventListener('click', function (event) {
			// Handles events if a question is answered correctly
			if (this.innerHTML.substring(3, this.length) === questions[qCount].answer) {
				score = score + 1;
				qCount = qCount + 1;
				quizUpdate("Correct!");
			}else{
				// Handles events if a question is answered incorrectly.
				time = time - 10;
				qCount = qCount + 1;
				quizUpdate("Wrong :(");
			}
		});
	});

	