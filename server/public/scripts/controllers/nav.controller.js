myApp.controller('NavController', ['FamilyService', function (FamilyService) {
    var self = this;

    // booleans to control nav view
    self.showNav = false;

    // FamilyService variables
	self.familyService = FamilyService;
}]);
