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

	self.childList = {list: []};

  self.addChild = function() {
    if(self.child.first_name === '' || self.child.dob === '' || self.child.gender === '') {
      self.message = 'Enter first name, date of birth, and gender.'
    } else {
      console.log('sending to server', self.child);
      $http.post('/api/child', self.child).then(function(response) {
      console.log('success');
      self.getChildList();
    },
      function(response) {
        console.log('error');
        self.message = 'Something went wrong. Please try again.'
      })
    }
  };


  self.getChildList = function () {
    $http.get(`/api/child/${self.familyObject.id}`).then(function(response) {
      console.log('ChildService -- get child');
          if(response.data) {
              // user has a current session on the server
              self.childList.list = response.data;
              console.log('self.childList.list', self.childList.list);

          } else {
              console.log('ChildController -- getuser -- failure');
              // return error
          }
      },function(response){
          console.log('ChildController -- getuser -- failure: ', response);
          // return error
      });
}

  self.getChildList();

}]);
  