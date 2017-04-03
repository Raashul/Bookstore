(function(){
	angular.module('Rashul')

.controller('LoginController',['$scope', '$state', '$http', "$location", function($scope, $state, $http, $location){

//Login With google button function
		$scope.login_google = function(req, res){
			$http.get('/auth/google').success(function(response){
				console.log(response);
				$location.path('/');
			})
		}
}]);

}());