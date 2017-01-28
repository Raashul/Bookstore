(function(){
  angular.module('Rashul')
    .controller('PostItemController',['$scope', '$http', '$state', function($scope, $http, $state){

      $scope.postItem = function(req, res){

        var request = {
          name: $scope.name,
          email: $scope.email,
          item_name: $scope.item,
          item_text: $scope.text,
          item_price: $scope.price

        }


        $http.post('api/post_item', request).success(function(response){

          alert('Post is saved');

        })

      }

    }])


}())