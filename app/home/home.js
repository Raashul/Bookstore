(function(){
	angular.module('Rashul')
		.controller('HomeController',[ '$scope', "$rootScope", '$http', '$state', '$interval', "$location" , function($scope, $rootScope,  $http, $state, $interval, $location){

			if(localStorage.getItem('user_name') != null){

				var name = localStorage.getItem('user_name');
				$scope.user_email = localStorage.getItem('user_email');
				name = name.substr(0,name.indexOf(' ') + " ".length);

				$scope.display_text = "Hi " + name
				$scope.display_login_tab = true;

				//Hide or Display Login/ Logout Button
				$rootScope.hide_login = true;
				$rootScope.hide_logout = false;


			}

			//Hide or Display Login/ Logout Button
			else{

				$rootScope.hide_login = false;
				$rootScope.hide_logout = true;
			}




		  //GET each question upon click.
			$scope.getQuestion = function(id){

			var request = {
			  id: id
			}

		 $location.path('/post').search({id: request.id});

		}// end of getQuestion method


		function getWaste(initial){
			$http.get('api/home/getPosts').success(function(response){

				if(initial){
					$scope.posts = response;
				}
				else{
					if(response.length > $scope.users.length){
						$scope.incommingPost = response;
					}

				}
			});
		};



		  //Setting/Updating the homepage every second
		  //Interval will call the GET method every 5 seconds
			getWaste(true);

			$interval(function(){
				getWaste(false);

				if($scope.incommingPost){
				$scope.difference = $scope.incommingPost.length - $scope.users.length;

				}

			}, 100000)

			$scope.setNewPost = function(){
				$scope.posts = angular.copy($scope.incommingPost);
				$scope.incommingPost = undefined;
			}



	}])




}())