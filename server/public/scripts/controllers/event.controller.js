myApp.controller('EventController', ['$http', 'FamilyService', 'ChildService', 'EventService', 'moment', function($http, FamilyService, ChildService, EventService, moment) {
    console.log('EventController created');
    var self = this;

	self.message = EventService.message;
    
    self.showFeedingTrackingButton = true;
    self.showSleepingTrackingButton = true;
    self.showDiaperingTrackingButton = true;
    self.showBathingTrackingButton = true;
    self.showMedicationTrackingButton = true;
    self.showOtherTrackingButton = true;

    // Show all of the "Track New" buttons when selecting the child
    self.showAllButtons = function(childId) {
        if(childId !== '' || childId !== undefined) {
            self.showFeedingTrackingButton = true; 
            self.showSleepingTrackingButton = true; 
            self.showDiaperingTrackingButton = true; 
            self.showBathingTrackingButton = true; 
            self.showMedicationTrackingButton = true; 
            self.showOtherTrackingButton = true;
        }
    }
    
    // FamilyService variables
    self.familyService = FamilyService;
    self.familyObject = FamilyService.familyObject;

    // ChildService variables
    self.childService = ChildService;
    self.categoryList = ChildService.categoryList;
    
    // EventService variables
    self.childEvents = EventService.childEvents;

    self.categoryFeeding = EventService.categoryFeeding;
    self.categorySleeping = EventService.categorySleeping;
    self.categoryDiapering = EventService.categoryDiapering;
    self.categoryBathing = EventService.categoryBathing;
    self.categoryMedication = EventService.categoryMedication;
    self.categoryOther = EventService.categoryOther;

    // ChildService to get the list of children
	self.getChildList = function (familyId) {
		ChildService.getChildList(self.familyObject.id);
    }
    
    // Run the getChildList function
	self.getChildList(self.familyObject.id);

	// Get the childList variable
	self.childList = ChildService.childList;

    // ChildService to get the list of categories
    self.getCategoryList = function() {
        ChildService.getCategoryList();
    }

    // EventService to create an event
    self.trackEvent = function(child_id, notes, category_id) {
        let currentDateTime = new Date();
        EventService.trackEvent(child_id, notes, category_id, currentDateTime);
    }

    // EventService to get the event list for the current child
    self.getChildEventList = function (id) {
        EventService.getChildEventList(id);
    }

    // EventService to update the notes for the recent event
    self.updateNotes = function(eventId, notes, childId) {
        EventService.updateNotes(eventId, notes, childId);
    }
}]);