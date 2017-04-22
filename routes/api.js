var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/friends', function(req, res, next) {
	var result;
	var submission = req.body;
	submission.scores = submission["scores[]"];
	delete submission["scores[]"];

	if (global.surveyresults.length==0) {
		result={name:submission.name, photo:submission.photo}
	} else {
		try{
			var nearestmatch = {difference:100};
			for (var i=0; i<global.surveyresults.length; i++) {
				var difference = 0;
				var currentresult = global.surveyresults[i];
				for (var j=0; j<currentresult.scores.length; j++) {
					difference += Math.abs(currentresult.scores[j] - submission.scores[j]);
				}
				if (difference<nearestmatch.difference) {
					nearestmatch.difference=difference;
					nearestmatch.name=submission.name;
					nearestmatch.photo=submission.photo;
					nearestmatch.percent=(1-difference/40)*100;
				}
			}
			result=nearestmatch;

		}
		catch (err) {
			console.log(err.stack);
		}
		
	}
	global.surveyresults.push(submission);
	console.log(global.surveyresults);
  res.status(200).json(result).end();
});

module.exports = router;