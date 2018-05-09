myApp.controller('ReportController', ['FamilyService', 'ReportService', 'EventService', 'ChildService', function (FamilyService, ReportService, EventService, ChildService) {
    console.log('ReportController created');
    var self = this;

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

    self.sortBySelectedDate = function(theDay, id) {
        theDay = theDay.toLocaleString();
        ReportService.sortBySelectedDate(theDay, self.familyObject.id);
    }
}]);
