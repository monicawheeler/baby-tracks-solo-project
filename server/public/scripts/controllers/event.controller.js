myApp.controller('EventController', ['$http', 'FamilyService', 'ChildService', 'EventService', function($http, FamilyService, ChildService, EventService) {
    console.log('EventController created');
    var self = this;

    self.message = '';
    
    self.familyService = FamilyService;
    self.familyObject = FamilyService.familyObject;
    self.childService = ChildService;

    self.categoryList = ChildService.categoryList;
    self.childList = ChildService.childList;

    self.childEvents = EventService.childEvents;
    self.categoryFeeding = EventService.categoryFeeding;
    self.categorySleeping = EventService.categorySleeping;
    self.categoryDiapering = EventService.categoryDiapering;
    self.categoryMedication = EventService.categoryMedication;
    self.categoryOther = EventService.categoryOther;

    self.feedingTimeDifferenceInHours = EventService.feedingTimeDifferenceInHours;
    console.log('self.time in hours', self.feedingTimeDifferenceInHours);
    

    self.getChildList = function(id) {
        ChildService.getChildList(self.familyObject.id);
    }

    self.getCategoryList = function() {
        ChildService.getCategoryList();
    }

    self.updateUser = function(id, user) {
        FamilyService.updateUser(id, user);
    }

    self.trackEvent = function(child_id, notes, category_id, family_id, datetime) {
        let currentDateTime = new Date();
        EventService.trackEvent(child_id, notes, category_id, self.familyObject.id, currentDateTime);
    }

    self.getChildEventList = function (id) {
        EventService.getChildEventList(id);
    }

	self.getChildList(self.familyObject.id);
    self.getCategoryList();

}]);