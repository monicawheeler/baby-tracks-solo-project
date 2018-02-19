myApp.controller('AccountController', ['$http', 'FamilyService', function($http, FamilyService) {
    console.log('AccountController created');
    var self = this;
    
	self.message = FamilyService.message;

    self.familyService = FamilyService;
    self.familyObject = FamilyService.familyObject;
    
    self.updateUser = function(id, user) {
        FamilyService.updateUser(id, user);
    }

}]);