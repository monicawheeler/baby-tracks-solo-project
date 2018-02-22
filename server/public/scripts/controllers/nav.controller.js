myApp.controller('NavController', ['FamilyService', function (FamilyService) {
    console.log('NavController created');
    var self = this;

    // booleans to control nav view
    self.showNav = false;

    // FamilyService variables
	self.familyService = FamilyService;
}]);
