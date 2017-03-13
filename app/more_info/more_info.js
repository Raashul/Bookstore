(function(){
	angular.module('Rashul')
		.controller('MoreInfoController',[ '$scope', '$http', '$state', '$interval', "$location" , function($scope, $http, $state, $interval, $location){

				if(localStorage.getItem('user_name')== null || localStorage.getItem('user_name')== undefined){
				$scope.no_user_logged_in = true;
			}



			 var request = {
				id : $location.search().id,
				send_to: localStorage.getItem('user_email')
			  }

			$http.post('api/info/get', request).success(function(response){

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

				$http.post('api/sendEmail', request).success(function(response){

					//response is the Post Information we received
					var data = response;
					var email = response.email;

					$scope.email_sent_alert = true;


				}).error(function(err){
					console.log(err);
				})
			}


	}])




}())