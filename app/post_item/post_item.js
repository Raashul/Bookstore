(function(){
	angular.module('Rashul')
		.controller('PostItemController',['Upload', '$scope', '$http', '$state', '$location', function(Upload, $scope, $http, $state, $location){

			if(localStorage.getItem('user_name')== null || localStorage.getItem('user_name')== undefined){
				$scope.no_user_logged_in 		= true
				$scope.show_submit_button		= true

			}

			else{
				$scope.name = localStorage.getItem('user_name');
				$scope.email = localStorage.getItem('user_email')
			}


		$scope.postItem = function(req, res){

			$scope.$watch(function(){
				return $scope.file
			}, function(){
				$scope.upload($scope.file);
			});


		$scope.upload = function(file){
		if(file)

			Upload.upload({
				url: 'api/post_item',
				method: 'POST',
				data: {
					name: $scope.name,
					email: $scope.email,
					item_name: $scope.item,
					item_text: $scope.text,
					item_price: $scope.price,
					item_version: $scope.edition,
					image : ""
						},
				file: file

			}).progress(function(evt){
				console.log('firing');
				$location.path('/');
			}).success(function(data){
				console.log('submitted');
				$location.path('/');
			}).error(function(err){
				$location.path('/login');
			})
		}


				// var request = {
				//   name: $scope.name,
				//   email: $scope.email,
				//   item_name: $scope.item,
				//   item_text: $scope.text,
				//   item_price: $scope.price,
				//   item_version: $scope.edition

				// }

				// console.log(request);

				// $http.post('api/post_item', request).success(function(response){

				//   alert('Post is saved');

				// })

			}

		}])


}())