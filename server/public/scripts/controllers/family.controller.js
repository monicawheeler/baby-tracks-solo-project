myApp.controller('FamilyController', ['FamilyService', function (FamilyService) {
	console.log('FamilyController created');
	var self = this;

	self.message = FamilyService.message;

	self.familyService = FamilyService;
	self.familyObject = FamilyService.familyObject;

}]);
