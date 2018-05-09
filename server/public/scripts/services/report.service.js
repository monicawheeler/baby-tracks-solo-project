myApp.service('ReportService', ['$http', '$location', function ($http, $location) {
    console.log('ReportService Loaded');
    var self = this;

    // Storage for sorted events
    self.sortedEvents = {
        list: []
    };

    // TODO figure out how to send a date and in what format
    // in order to store and use as a get request

    //get request to get the children events 
    self.sortBySelectedDate = function(theDay, id) {
        console.log('theDay', theDay);
        
        $http.get(`/api/report/family/${id}`)
            .then(function (response) {
                self.sortedEvents.list = response.data;
            })
            .catch(function (error) {
                console.log('error, response:', response);
                self.message = "Something went wrong. Please try again."
            });
        };
}]);
