myApp.controller('TrackingController', ['$http', 'FamilyService', 'ChildService', 'EventService', function($http, FamilyService, ChildService, EventService) {
    console.log('TrackingController created');
    var self = this;
    self.message = '';
    console.log('self.message', self.message);
    

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

    self.trackEvent = function(child_id, notes, category_id, date, time, family_id) {
        let currentDateTime = new Date();
        let formattedDate = currentDateTime.toLocaleDateString();
        let formattedTime = currentDateTime.toLocaleTimeString();
        EventService.trackEvent(child_id, notes, category_id, formattedDate, formattedTime, self.familyObject.id);
    }

    self.updateCategoryList = function () {
        EventService.updateCategoryList();
    }

	self.getChildList(self.familyObject.id);
    self.getCategoryList();

}]);