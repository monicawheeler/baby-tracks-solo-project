myApp.service('ReportService', ['$http', '$location', function ($http, $location) {
    console.log('ReportService Loaded');
    var self = this;

    // Storage for sorted events
    self.sortedEvents = {
        list: []
    };

    //get request to get the children events 
    self.sortBySelectedDate = function(childId, theDay) {
        console.log('theDay', theDay, 'theChild', childId);
        
        $http.get(`/api/report/${childId}/${theDay}`)
            .then(function (response) {
                console.log('response in report get request', response);
                
                self.sortedEvents.list = response.data;
            })
            .catch(function (error) {
                console.log('error, response:', response);
                self.message = "Something went wrong. Please try again."
            });
        };
}]);
