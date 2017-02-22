$(function () {
  $('#submitButton').on('click', calculateAnswer);
});


function calculateAnswer() {
	var inputVal = parseInt($('#inputBox').val());
	var divisible = false;
	var number = 1;
	var i = 1;
	do {
		for (i = 1; i < inputVal+1; i++) {
				if (number % i !== 0) {
					divisible = false;
					number = number + 1;
					break;	
				}
			//console.log(i);
			if (i === inputVal) {
				divisible = true;
				break;
			}
		}
	} while (divisible === false);
	return generateOutput(number);
};



function generateOutput(output) {
	$('#answerDiv').removeClass("hidden");
	$('#output').text(output);
};
