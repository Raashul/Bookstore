(function(){
  angular.module('Rashul')
    .controller('PostItemController',['Upload', '$scope', '$http', '$state', function(Upload, $scope, $http, $state){


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
          }).success(function(data){

          }).error(function(err){
            console.log(err);
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