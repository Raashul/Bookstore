(function(){
	angular.module('Rashul')
		.controller('MoreInfoController',[ '$scope', '$http', '$state', '$interval', "$location" , function($scope, $http, $state, $interval, $location){

			 var id = {
				id : $location.search().id
			  }

			console.log(id);

			$http.post('api/info/get', id).success(function(response){

				//response is the Post Information we received
				$scope.post = response;

			}).error(function(err){
				console.log(err);
			})


			// $scope.contactSeller = function(req,res){

			//     $http.get('api/test').success(function(response){
			//         console.log('hello');
			//         res.send('hi');
			//     });

			// }

			$scope.sendEmailToSeller = function(){

				$http.post('api/sendEmail', id).success(function(response){

					//response is the Post Information we received
					var data = response;
					var email = response.email;

				}).error(function(err){
					console.log(err);
				})
			}


	}])




}())