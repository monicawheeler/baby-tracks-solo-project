myApp.controller('EventController', ['$http', 'FamilyService', 'ChildService', 'EventService', function($http, FamilyService, ChildService, EventService) {
    console.log('EventController created');
    var self = this;

    self.showEventHistory = false;

    self.showNewFeedingEvent = false;
    self.showNewSleepingEvent = false;
    self.showNewDiaperingEvent = false;
    self.showNewMedicationEvent = false;
    self.showNewOtherEvent = false;

    self.editFeedingNotes = false;
    self.editSleepingNotes = false;
    self.editDiaperingNotes = false;
    self.editMedicationNotes = false;
    self.editOtherNotes = false;

    self.showNewFeedingNotes = false;
    self.showNewSleepingNotes = false;
    self.showNewDiaperingNotes = false;
    self.showNewMedicationNotes = false;
    self.showNewOtherNotes = false;
    
    self.showFeedingTrackingButton = true;
    self.showSleepingTrackingButton = true;
    self.showDiaperingTrackingButton = true;
    self.showMedicationTrackingButton = true;
    self.showOtherTrackingButton = true;

    self.message = '';
    
    self.familyService = FamilyService;
    self.familyObject = FamilyService.familyObject;

    self.childService = ChildService;
    self.categoryList = ChildService.categoryList;
    self.childList = FamilyService.childList;

    self.childEvents = EventService.childEvents;
    self.categoryFeeding = EventService.categoryFeeding;
    self.categorySleeping = EventService.categorySleeping;
    self.categoryDiapering = EventService.categoryDiapering;
    self.categoryMedication = EventService.categoryMedication;
    self.categoryOther = EventService.categoryOther;

    self.getChildList = function(id) {
        FamilyService.getChildList(self.familyObject.id);
    }

    self.getCategoryList = function() {
        ChildService.getCategoryList();
    }

    self.updateUser = function(id, user) {
        FamilyService.updateUser(id, user);
    }

    self.trackEvent = function(child_id, notes, category_id, datetime) {
        let currentDateTime = new Date();
        EventService.trackEvent(child_id, notes, category_id, currentDateTime);
    }

    self.getChildEventList = function (id) {
        EventService.getChildEventList(id);
    }

    self.updateNotes = function(eventId, notes, childId) {
        EventService.updateNotes(eventId, notes, childId);
    }

	self.getChildList(self.familyObject.id);
    self.getCategoryList();

}]);