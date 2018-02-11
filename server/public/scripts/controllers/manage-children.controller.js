myApp.controller('ManageChildrenController', ['FamilyService', function(FamilyService) {
  console.log('ManageChildrenController created');
  var self = this;
  self.familyService = FamilyService;
  
  self.showAddChild = false;
  self.addChildBtn = true;
  self.familyObject = FamilyService.familyObject;

  self.child = {
    first_name: '',
    dob: '',
    gender: '',
    family_id: self.familyObject.id
  };

  self.message = '';

  self.addChild = function () {
    if (self.child.first_name === '' || self.child.dob === '' || self.child.gender === '') {
      self.message = "Please complete all fields!";
      console.log('child', self.child);
      
    } else {
      console.log('child', self.child);
      
    }
  }
}]);
  