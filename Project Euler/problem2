$(function () {
  $('#submitButton').on('click', calculateAnswer);
});


function calculateAnswer () {
	var inputVal = $('#inputBox').val();
	var fibonacci = [0,1];
	var i;
	while (fibonacci[fibonacci.length - 1] < inputVal) {
		i = fibonacci[fibonacci.length - 2] + fibonacci[fibonacci.length - 1];
		fibonacci.push(i);
		console.info(fibonacci);
	}
	fibonacci.pop();
	var outputVal = fibonacci.filter((a) => a % 2 === 0).reduce((a, b) => a + b, 0);
	generateOutput (outputVal);
};


function generateOutput(output) {
	$('#answerDiv').removeClass("hidden");
	$('#output').text(output);
};
