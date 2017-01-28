(function(){
	angular.module('Rashul', ['ui.router', 'ngFileUpload'])
		.config(function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise('/');



			$stateProvider
				.state('signUp',{
					url: "/signup",
					templateUrl: "app/signup/signup.html",
					controller: "SignUpController"

				})


        .state('main',{
            url: '/',
            templateUrl: 'app/home/home.html',
            controller: 'HomeController'
        })

        .state('post_item',{
            url:'/post-item',
            templateUrl: 'app/post_item/post_item.html',
            controller: "PostItemController"
        })

        .state('question-answer', {
        url: '/post?id',
        templateUrl: 'app/qa/qa.html',
        controller:'QaController'

      });








		})
}());