document.addEventListener('DOMContentLoaded', (event) => {

	//1. Setting intial required variables 
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


}