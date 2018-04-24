myApp.controller('ReportController', ['FamilyService', 'ReportService', function (FamilyService, ReportService) {
    console.log('ReportController created');
    var self = this;

    // FamilyService variables
	self.familyService = FamilyService;
}]);
