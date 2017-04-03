(function(){
	angular.module('Rashul')
		.controller('LogoutController',[ '$scope', '$http', '$state', "$location", '$timeout', function($scope, $http, $state, $location, $timeout){
			//Clear the localstorage.
			localStorage.removeItem("user_name");
			localStorage.removeItem("user_email");

			//change url to home
			$timeout(function(){
		  	$location.path("/");
			},2000);

	}])

}())