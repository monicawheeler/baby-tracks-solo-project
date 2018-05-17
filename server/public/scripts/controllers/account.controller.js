myApp.controller('AccountController', ['$http', 'FamilyService', function($http, FamilyService) {
    var self = this;
    
    self.message = FamilyService.message;

    self.familyService = FamilyService;
    self.familyObject = FamilyService.familyObject;
    
    // Go to FamilyService to updateUser
    self.updateUser = function(id, user) {
        FamilyService.updateUser(id, user);
    }
}]);