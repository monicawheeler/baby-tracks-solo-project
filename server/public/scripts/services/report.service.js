myApp.service('ReportService', ['$http', '$location', function ($http, $location) {
    console.log('ReportService Loaded');
    var self = this;

    // Storage for sorted events
    self.sortedEvents = {
        list: []
    };
    console.log('when service loads: self.sortedEvents.list', self.sortedEvents.list);
    

    //get request to get the children events by date
    self.sortBySelectedDate = function(childId, theDay) {
        $http.get(`/api/report/${childId}/${theDay}`)
            .then(function (response) {
                self.sortedEvents.list = response.data;
            })
            .catch(function (error) {
                console.log('error, response:', response);
                self.message = "Something went wrong. Please try again."
            });
        };
}]);
