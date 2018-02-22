myApp.controller('EventController', ['$http', 'FamilyService', 'ChildService', 'EventService', 'moment', function($http, FamilyService, ChildService, EventService, moment) {
    console.log('EventController created');
    var self = this;


    self.exampleDate = moment().hour(8).minute(0).second(0).toDate();
    console.log('exampleDate', self.exampleDate);
    
    
    
	self.message = EventService.message;

    self.showEventHistory = false;
    self.showChildTracking = false;
    self.showEventColumns = false;

    self.showNewFeedingEvent = false;
    self.showNewSleepingEvent = false;
    self.showNewDiaperingEvent = false;
    self.showNewBathingEvent = false;
    self.showNewMedicationEvent = false;
    self.showNewOtherEvent = false;

    self.editFeedingNotes = false;
    self.editSleepingNotes = false;
    self.editDiaperingNotes = false;
    self.editBathingNotes = false;
    self.editMedicationNotes = false;
    self.editOtherNotes = false;

    self.showNewFeedingNotes = false;
    self.showNewSleepingNotes = false;
    self.showNewDiaperingNotes = false;
    self.showNewBathingNotes = false;
    self.showNewMedicationNotes = false;
    self.showNewOtherNotes = false;
    
    self.showFeedingTrackingButton = true;
    self.showSleepingTrackingButton = true;
    self.showDiaperingTrackingButton = true;
    self.showBathingTrackingButton = true;
    self.showMedicationTrackingButton = true;
    self.showOtherTrackingButton = true;
    
    self.familyService = FamilyService;
    self.familyObject = FamilyService.familyObject;

    self.childService = ChildService;
    self.categoryList = ChildService.categoryList;
    

    self.childEvents = EventService.childEvents;

    self.categoryFeeding = EventService.categoryFeeding;
    self.categorySleeping = EventService.categorySleeping;
    self.categoryDiapering = EventService.categoryDiapering;
    self.categoryBathing = EventService.categoryBathing;
    self.categoryMedication = EventService.categoryMedication;
    self.categoryOther = EventService.categoryOther;

	self.getChildList = function (familyId) {
		ChildService.getChildList(self.familyObject.id);
    }
    
	self.getChildList(self.familyObject.id);

	self.childList = ChildService.childList;
	console.log('childList variable in event controller', self.childList);


    self.getCategoryList = function() {
        ChildService.getCategoryList();
    }

    self.trackEvent = function(child_id, notes, category_id) {
        let currentDateTime = new Date();
        EventService.trackEvent(child_id, notes, category_id, currentDateTime);
    }

    self.getChildEventList = function (id) {
        EventService.getChildEventList(id);
    }

    self.updateNotes = function(eventId, notes, childId) {
        EventService.updateNotes(eventId, notes, childId);
    }

    // self.getCategoryList();

    self.showFeedingTrackingButton = false; 
    self.showSleepingTrackingButton = false; 
    self.showDiaperingTrackingButton = false; 
    self.showBathingTrackingButton = false; 
    self.showMedicationTrackingButton = false; 
    self.showOtherTrackingButton = false;

    self.showAllButtons = function(childId) {
        console.log('showAllButtons function', childId);
        if(childId !== '' || childId !== undefined) {
            self.showFeedingTrackingButton = true; 
            self.showSleepingTrackingButton = true; 
            self.showDiaperingTrackingButton = true; 
            self.showBathingTrackingButton = true; 
            self.showMedicationTrackingButton = true; 
            self.showOtherTrackingButton = true;
        }
    }
}]);