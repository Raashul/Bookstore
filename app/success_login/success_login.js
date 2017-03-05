(function(){
	angular.module('Rashul')
		.controller('SuccessLoginController',[ '$scope', '$http', '$state', "$location", '$timeout', function($scope, $http, $state, $location, $timeout){

			var user = {
				name: $location.search().name,
				email: $location.search().email
			}

			localStorage.setItem('user_name', user.name);
			localStorage.setItem('user_email', user.email);

			$timeout(function(){
			  logged_in = true;
			  $location.url("/");
			},2000);


	}])




}())