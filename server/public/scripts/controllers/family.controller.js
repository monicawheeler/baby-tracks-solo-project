myApp.controller('FamilyController', ['FamilyService', function (FamilyService) {
	console.log('FamilyController created');
	var self = this;

	// FamilyService variables
	self.familyService = FamilyService;
	self.familyObject = FamilyService.familyObject;
	self.message = FamilyService.message;

}]);
