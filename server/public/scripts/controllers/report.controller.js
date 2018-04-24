myApp.controller('ReportController', ['FamilyService', function (FamilyService) {
    console.log('ReportController created');
    var self = this;

    // FamilyService variables
	self.familyService = FamilyService;
}]);
