(function(){
	angular.module('Rashul', ['ui.router', 'ngFileUpload'])
		.config(function($stateProvider, $urlRouterProvider){

		$urlRouterProvider.otherwise('/');

			$stateProvider

			.state('main',{
				url: '/',
				templateUrl: 'app/home/home.html',
				controller: 'HomeController'
			})

		.state('signUp',{
			url: "/signup",
			templateUrl: "app/signup/signup.html",
			controller: "SignUpController"
		})



		.state('post_item',{
			url:'/post-item',
			templateUrl: 'app/post_item/post_item.html',
			controller: "PostItemController"
		})

		.state('more_info', {
			url: '/post?id',
			templateUrl: 'app/more_info/more_info.html',
			controller:'MoreInfoController'

	  })

		.state('category',{
				url: '/post/category/:category',
				templateUrl: 'app/category/category.html',
				controller: 'CategoryController'
			})


		.state('profile_info', {
			url: '/user?name/?email',
			templateUrl: 'app/success_login/success_login.html',
			controller:'SuccessLoginController'

	  })

		.state('logout',{
			url: '/logout',
			templateUrl: "app/logout/logout.html",
			controller: "LogoutController"
		})

		.state('about',{
			url: '/about',
			templateUrl: "app/about/about.html"
		})

		.state('/login',{
			url: '/login',
			templateUrl:"app/login/login.html",
			controller: "LoginController"
		});

		})
}());