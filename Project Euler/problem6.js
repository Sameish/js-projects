$(function () {
  $('#submitButton').on('click', calculateAnswer);
});


function calculateAnswer() {
	var inputVal = parseInt($('#inputBox').val());
	var numbers = [];
	for (var i = 1; i <= inputVal; i++) {
		numbers.push(i);
	};

	var squareNums = numbers.map(function(x) {
		return x * x;
	});

	var sumOfNums = numbers.reduce((a,b) => a + b, 0);
	var sumOfSqaures = squareNums.reduce((a,b) => a + b, 0);
	var squareOfSum = (sumOfNums)*(sumOfNums);
	var difference = squareOfSum - sumOfSqaures;

	generateOutput(difference);
};


function generateOutput(output) {
	$('#answerDiv').removeClass("hidden");
	$('#output').text(output);
};
