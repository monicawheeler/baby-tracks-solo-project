myApp.controller('InfoController', ['$http', 'FamilyService', function($http, FamilyService, ChildService) {
    console.log('InfoController created');
    var self = this;

    self.familyService = FamilyService;
    self.familyObject = FamilyService.familyObject;
    
    self.updateUser = function(id, user) {
        FamilyService.updateUser(id, user);
    }

}]);