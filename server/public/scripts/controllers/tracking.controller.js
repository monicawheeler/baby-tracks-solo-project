myApp.controller('TrackingController', ['$http', 'FamilyService', 'ChildService', function($http, FamilyService, ChildService) {
    console.log('TrackingController created');
    var self = this;

    self.familyService = FamilyService;
    self.familyObject = FamilyService.familyObject;
    self.childService = ChildService;

    self.categoryList = ChildService.categoryList;
    self.childList = ChildService.childList;

    self.getChildList = function(id) {
        ChildService.getChildList(self.familyObject.id);
    }

    self.getCategoryList = function() {
        ChildService.getCategoryList();
    }

    self.updateUser = function(id, user) {
        FamilyService.updateUser(id, user);
    }

	self.getChildList(self.familyObject.id);
    self.getCategoryList();

}]);