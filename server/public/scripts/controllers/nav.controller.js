myApp.controller('NavController', ['FamilyService', function (FamilyService) {
    console.log('NavController created');
    var self = this;

    self.showNav = false;

	self.familyService = FamilyService;
}]);
