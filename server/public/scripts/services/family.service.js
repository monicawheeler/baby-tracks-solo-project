myApp.service('FamilyService', ['$http', '$location', function($http, $location){
  console.log('FamilyService Loaded');
  var self = this;
  self.userObject = {};

  self.getuser = function(){
    console.log('FamilyService -- getuser');
    $http.get('/api/family').then(function(response) {
        if(response.data.username) {
            // user has a curret session on the server
            self.userObject.userName = response.data.username;
            console.log('FamilyService -- getuser -- User Data: ', self.userObject.userName);
        } else {
            console.log('FamilyService -- getuser -- failure');
            // user has no session, bounce them back to the login page
            $location.path("/landing");
        }
    },function(response){
      console.log('FamilyService -- getuser -- failure: ', response);
      $location.path("/landing");
    });
  },

  self.logout = function() {
    console.log('FamilyService -- logout');
    $http.get('/api/family/logout').then(function(response) {
      console.log('FamilyService -- logout -- logged out');
      $location.path("/landing");
    });
  }
}]);
