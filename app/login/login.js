

(function(){
	angular.module('Rashul')

.controller('LoginController',['$scope', '$state', '$http', "$location", function($scope, $state, $http, $location){

    $scope.loginFacebook = function(req, res){
        $http.get('auth/facebook').success(function(response){

        })
    }

    $scope.loginGoogle = function(req, res){
        $http.get('auth/google').success(function(response){

        })
    }




}]);


}());