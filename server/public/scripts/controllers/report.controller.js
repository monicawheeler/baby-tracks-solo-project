myApp.controller('ReportController', ['FamilyService', 'ReportService', 'EventService', 'ChildService', function (FamilyService, ReportService, EventService, ChildService) {
    console.log('ReportController created');
    var self = this;

    self.today = new Date();

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

    // TODO use onchange to grab the picked date from datepicker
    // run a function that displays only events from current date
    self.selectedDate = function(today) {
        console.log('date', today)
    }

    // function that queries with a get request based on a 
    // conditional greater than the picked date

}]);
