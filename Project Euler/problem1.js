$(function () {
  $('#submitButton').on('click', calculateAnswer);
});


function calculateAnswer () {
	var inputVal = $('#inputBox').val();
	var multiples = [];
	for (var i = 1; i < inputVal; i++) {
		if (i % 3  === 0 | i % 5 === 0) {
			multiples.push(i);
		}
	}
	var outputVal = multiples.reduce((a, b) => a + b, 0);
	generateOutput (outputVal);
}

function generateOutput(output) {
	$('#answerDiv').removeClass("hidden");
	$('#output').text(output);
};
