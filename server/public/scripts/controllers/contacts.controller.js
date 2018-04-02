myApp.controller('ContactsController', ['$http', '$location', 'FamilyService', function($http, $location, FamilyService) {
    console.log('ContactsController created');
    var self = this;
    
    self.familyService = FamilyService;
    self.familyObject = FamilyService.familyObject;

    console.log('self.familyObject id', self.familyObject.id);
    
    self.getClass = function(pathName) {
        if($location.path() === '/emergency-contacts') {
            return 'isHidden';
        } else {
            return '';
        }
    }
}]);