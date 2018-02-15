var myApp = angular.module('myApp', ['ngRoute', 'ngMessages']);

/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  console.log('myApp -- config')
  $routeProvider
    .when('/', {
      redirectTo: 'landing'
    })
    .when('/landing', {
      templateUrl: '/views/templates/landing.html',
      controller: 'LandingController as vm'
    })
    .when('/login', {
      templateUrl: '/views/templates/login.html',
      controller: 'LoginController as vm'
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as vm'
    })
    .when('/family', {
      templateUrl: '/views/templates/family.html',
      controller: 'FamilyController as vm',
      resolve: {
        getuser : function(FamilyService){
          return FamilyService.getuser();
        }
      }
    })
    .when('/account', {
      templateUrl: '/views/templates/account.html',
      controller: 'InfoController as vm',
      resolve: {
        getuser : function(FamilyService){
          return FamilyService.getuser();
        }
      }
    })
    .when('/info', {
      templateUrl: '/views/templates/account.html',
      controller: 'InfoController as vm',
      resolve: {
        getuser : function(FamilyService){
          return FamilyService.getuser();
        }
      }
    })
    .when('/manage-children', {
      templateUrl: '/views/templates/manage-children.html',
      controller: 'ChildController as vm',
      resolve: {
        getuser : function(FamilyService){
          return FamilyService.getuser();
        }
      }
    })
    .when('/tracking', {
      templateUrl: '/views/templates/tracking.html',
      controller: 'EventController as vm',
      resolve: {
        getuser : function(FamilyService){
          return FamilyService.getuser();
        }
      }
    })
    .otherwise({
      template: '<h1>404</h1>'
    });
}]);
