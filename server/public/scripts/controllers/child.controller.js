myApp.controller('ChildController', ['$http', 'FamilyService', 'ChildService', function($http, FamilyService, ChildService) {
  console.log('ChildController created');
  var self = this;

  self.showAddChild = false;
  self.addChildBtn = true;

  self.childService = ChildService;
  
  self.familyService = FamilyService;
  self.familyObject = FamilyService.familyObject;
  
  self.message = '';
  
  self.child = {
    first_name: '',
    dob: '',
    gender: '',
    family_id: self.familyObject.id
  };

  self.addChild = function() {
    if(self.child.first_name === '' || self.child.dob === '' || self.child.gender === '') {
      self.message = 'Enter first name, date of birth, and gender.'
    } else {
      console.log('sending to server', self.child);
      $http.post('/api/child', self.child).then(function(response) {
      console.log('success');
      // add once function is written
      // self.getChildren();
    },
      function(response) {
        console.log('error');
        self.message = 'Something went wrong. Please try again.'
      })
    }
  };   
}]);
  