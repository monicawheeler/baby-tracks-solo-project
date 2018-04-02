var myApp = angular.module('myApp', ['ngRoute', 'ngMessages', 'ngAnimate', 'angularMoment']);

/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	console.log('myApp -- config')
	$routeProvider
		.when('/', {
			redirectTo: 'landing'
		})
		.when('/landing', {
			templateUrl: '/views/templates/landing.html'
		})
		.when('/login-new', {
			templateUrl: '/views/templates/login-new.html',
			controller: 'LoginController as vm'
		})
		.when('/login', {
			templateUrl: '/views/templates/login.html',
			controller: 'LoginController as vm'
		})
		.when('/register', {
			templateUrl: '/views/templates/register.html',
			controller: 'LoginController as vm'
		})
		.when('/account', {
			templateUrl: '/views/templates/account.html',
			controller: 'AccountController as vm',
			resolve: {
				getuser: function (FamilyService) {
					return FamilyService.getuser();
				}
			}
		})
		.when('/manage-children', {
			templateUrl: '/views/templates/manage-children.html',
			controller: 'ChildController as vm',
			resolve: {
				getuser: function (FamilyService) {
					return FamilyService.getuser();
				}
			}
		})
		.when('/emergency-contacts', {
			templateUrl: '/views/templates/emergency-contacts.html',
			controller: 'ContactsController as vm',
			resolve: {
				getuser: function (FamilyService) {
					return FamilyService.getuser();
				}
			}
		})
		.when('/tracking', {
			templateUrl: '/views/templates/tracking.html',
			controller: 'EventController as vm',
			resolve: {
				getuser: function (FamilyService) {
					return FamilyService.getuser();
				}
			}
		})
		.otherwise({
			templateUrl: '/views/templates/404.html'
		});
}]);
