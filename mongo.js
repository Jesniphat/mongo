var promise = require('bluebird');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';


function checksomething(){

	this.getjes = function(callbackOk, callbackError){
		var $scope = {};
		$scope.getFirst = [];

		var Jestest = function(){
			var deferred = promise.pending();

			MongoClient.connect(url, function(err, db) {
				assert.equal(null, err);
				var cursor = db.collection('jes').find({});

				cursor.each(function(err, doc) {
					assert.equal(err, null);
					console.log("err = ", err);
					if (doc != null) {
						// console.log("Doc = ", doc);
						$scope.getFirst.push(doc);
					} else{
						// console.log("Ohoo = ",$scope.getFirst);
						if($scope.getFirst.length > 0){
							deferred.resolve("That Ok");
						} else {
							deferred.reject("On data");
						}
					}
				});

			});

			return deferred.promise;
		}


		Jestest()
	    .then(function() {
	      console.log("from promise = ", arguments);
	      callbackOk($scope.getFirst);
	    }).catch(function(e){
	  	  console.log(e);
	      callbackError(e);
	  	});
	}

}


var john = new checksomething();

john.getjes(function(Ok){
	console.log("if Ok = ", Ok);
}, function(error){
	console.log("if error = ", error);
}); 
