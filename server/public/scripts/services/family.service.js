myApp.service('FamilyService', ['$http', '$location', function($http, $location){
  console.log('FamilyService Loaded');
  var self = this;
  self.familyObject = {};

  self.getuser = function(){
    console.log('FamilyService -- getuser');
    $http.get('/api/family').then(function(response) {
        if(response.data.username) {
            // user has a current session on the server
            self.familyObject.id = response.data.id;
            self.familyObject.username = response.data.username;
            self.familyObject.family_name = response.data.family_name;
            console.log('FamilyService -- getuser -- User Data: ', self.familyObject.username);
        } else {
            console.log('FamilyService -- getuser -- failure');
            // user has no session, bounce them back to the login page
            $location.path("/landing");
        }
    },function(response){
      console.log('FamilyService -- getuser -- failure: ', response);
      $location.path("/landing");
    });
  }

  self.logout = function() {
    console.log('FamilyService -- logout');
    $http.get('/api/family/logout').then(function(response) {
      console.log('FamilyService -- logout -- logged out');
      $location.path("/landing");
    });
  }
}]);
