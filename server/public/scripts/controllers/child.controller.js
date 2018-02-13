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

  self.categoryList = ChildService.categoryList;
  self.childList = ChildService.childList;
  self.childListLength = ChildService.childListLength;

  self.getChildList = function (id) {
    const familyId = self.familyObject.id;
    ChildService.getChildList(familyId);
  }

  self.getCategoryList = function() {
    ChildService.getCategoryList();
  }

  self.addChild = function() {
    if(self.child.first_name === '' || self.child.dob === '' || self.child.gender === '') {
      self.message = 'Enter first name, date of birth, and gender.'
    } else {
      console.log('sending to server', self.child);
      $http.post('/api/child', self.child).then(function(response) {
      console.log('success');
      self.child = {};
      self.getChildList();
    },
      function(response) {
        console.log('error');
        self.message = 'Something went wrong. Please try again.'
      })
    }
  };


  self.getChildList();
  self.getCategoryList();

  self.deleteChild = function(id) {
    const childId = id;
    console.log('delete child by this id:', childId);
    
    $http.delete(`/api/child/${childId}`).then(function(response) {
      console.log('in delete child');
      if(response.data)
        console.log('child deleted succesfully');
        self.getChildList();
      }, function(response) {
          console.log('service does not exist');
          
      });
    }

    self.updateChild = function(data, id) {
      const childId = id;
      const childObject = data;
      $http.put(`/api/child/update/${childId}`, childObject).then(function(response) {
      console.log('id', childId, 'childObject', childObject);
        console.log('in update child');
        if(response.data)
          console.log('child updated succesfully');
          self.getChildList();
        }, function(response) {
            console.log('service does not exist');
            
        });
      }


}]);
  