(function(){
	angular.module('Rashul')
		.controller('HomeController',[ '$scope', "$rootScope", '$http', '$state', '$interval', "$location" , '$window', function($scope, $rootScope,  $http, $state, $interval, $location, $window){

			//First of all check if the user is logged in from localhost
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

			} //end if if and else

		  //Click event for each post
		  // User will be redirected to another page with url /post?id=xxxxxx
			$scope.getQuestion = function(id){

				var request = {
				  id: id
				}

			 $location.path('/post').search({id: request.id});

		}// end of getQuestion method


		function getWaste(initial){

			$http.get('api/home/getPosts').success(function(response){

				//Default values for Badges.
				//Set them to their label badges
				$scope.math_category = 0;
				$scope.science_category = 0;
				$scope.english_category = 0;
				$scope.history_category = 0;
				$scope.other_category = 0;
				$scope.language_category = 0;


				for (var i = 0; i < response.length; i++) {
					if(response[i].category == "Math"){
						$scope.math_category += 1;
					}

					else if(response[i].category == "Science"){
						$scope.science_category += 1;
					}

					else if(response[i].category == "English"){
						$scope.english_category += 1;
					}

					else if(response[i].category == "History"){
						$scope.history_category += 1;
					}

					else if(response[i].category == "Language"){
						$scope.language_category += 1;
					}

					else if(response[i].category == "Other"){
						$scope.other_category += 1;
					}

				}

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


			//Click event upon category click
			//When user clicks 'Science' OR 'Math' etc

		$scope.getCategory = function(category){

				var request = {
			  category: category
			}
			console.log(request.category);

			// $location.path('/post/category').search({category: request.category});

			 // $location.path('/post/category/' + request.category);

			 $location.path('/post/category').search({category:request.category});



			console.log('testing');





		}




	}])




}())