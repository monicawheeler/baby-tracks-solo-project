myApp.controller('ReportController', ['FamilyService', 'ReportService', 'EventService', 'ChildService', 'moment', function (FamilyService, ReportService, EventService, ChildService, moment) {
    var self = this;

    self.searchEvents = "";
    
    self.showEvents = false;
    
    self.editMode = false;

    self.familyService = FamilyService;
    self.familyObject = FamilyService.familyObject;

    // EventService variables
    self.childEvents = EventService.childEvents;
    
    // ChildService to get the list of children
	self.getChildList = function (familyId) {
		ChildService.getChildList(self.familyObject.id);
    }
    
    // Run the getChildList function
	self.getChildList(self.familyObject.id);

	// Get the childList variable
	self.childList = ChildService.childList;

    // EventService to get the event list for the current child
    self.getChildEventList = function (id) {
        EventService.getChildEventList(id);
    }

    self.sortBySelectedDate = function(childId, theDay) {
        // theDay = theDay.toLocaleString();
        let formattedDate = moment(theDay, 'MM-DD-YYYY', true).format('YYYY-MM-DD');

        ReportService.sortBySelectedDate(childId, formattedDate);
    }

    self.sortedEvents = ReportService.sortedEvents;
}]);
