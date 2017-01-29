(function(){
    angular.module('Rashul')
        .controller('HomeController',[ '$scope', '$http', '$state', '$interval', "$location" , function($scope, $http, $state, $interval, $location){


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
                        console.log($scope.posts);

                        console.log($scope.posts.image);
                    }else{
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
                 console.log('working');
                if($scope.incommingPost){
                    console.log($scope.incommingPost);
                   console.log('there is a difference');
                $scope.difference = $scope.incommingPost.length - $scope.users.length;

                }

            }, 100000)

            $scope.setNewPost = function(){
                $scope.posts = angular.copy($scope.incommingPost);
                $scope.incommingPost = undefined;
            }




    }])




}())