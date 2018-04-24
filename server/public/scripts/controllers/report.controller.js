myApp.controller('ReportController', ['FamilyService', 'ReportService', function (FamilyService, ReportService) {
    console.log('ReportController created');
    var self = this;

    self.familyService = FamilyService;
    self.familyObject = FamilyService.familyObject;
}]);
