myApp.controller('InfoController', ['FamilyService', function(FamilyService) {
  console.log('InfoController created');
  var self = this;
  self.familyService = FamilyService;
}]);
