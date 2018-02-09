myApp.controller('FamilyController', ['FamilyService', function(FamilyService) {
  console.log('FamilyController created');
  var self = this;
  self.familyService = FamilyService;
  self.familyObject = FamilyService.familyObject;
}]);
