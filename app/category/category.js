(function(){
	angular.module('Rashul')
		.controller('CategoryController',[ '$scope', "$http", "$rootScope", "$location", '$stateParams', function($scope, $http, $rootScope, $location, $stateParams){

			if(localStorage.getItem('user_name') != null){

				var name = localStorage.getItem('user_name');
				$scope.user_email = localStorage.getItem('user_email');
				name = name.substr(0,name.indexOf(' ') + " ".length);

				$scope.display_login_tab = true;

				//Hide or Display Login/ Logout Button
				$rootScope.hide_login = true;
				$rootScope.hide_logout = false;


			}
			//Hide or Display Login/ Logout Button
			else{

				$rootScope.hide_login = false;
				$rootScope.hide_logout = true;

			} //end if if and else

			var request = {
				category: $stateParams.category
			}


			$http.post('api/post/category', request).success(function(response){

				if(response.length > 0){
						$scope.posts = response;
						$scope.display_text = request.category;
				}
				else{
					$scope.display_text = "No Books";
				}



			}).error(function(err){
				console.log(err)
			})



	}])




}())