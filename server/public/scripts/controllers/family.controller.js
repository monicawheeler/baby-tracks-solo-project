myApp.controller('FamilyController', ['FamilyService', function(FamilyService) {
	console.log('FamilyController created');
	var self = this;
	
	self.familyService = FamilyService;
	self.familyObject = FamilyService.familyObject;

	console.log('in family controller', self.familyObject.id);
	

    self.getChildList = function(id) {
        FamilyService.getChildList(self.familyObject.id);
	}
	
	self.getChildList(self.familyObject.id);
}]);
