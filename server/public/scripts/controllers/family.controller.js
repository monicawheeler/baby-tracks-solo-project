myApp.controller('FamilyController', ['FamilyService', function (FamilyService) {
	var self = this;

	// FamilyService variables
	self.familyService = FamilyService;
	self.familyObject = FamilyService.familyObject;
	self.message = FamilyService.message;

}]);
