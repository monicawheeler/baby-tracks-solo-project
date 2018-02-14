myApp.service('EventService', ['$http', '$location', function($http, $location) {
    console.log('EventService Loaded');
    var self = this;

    self.trackEvent = function(child_id, notes, category_id, date, time, familyId) {
        if (child_id === '' || child_id === undefined) {
            self.message = 'Please select a child.'
        } else {
            let eventObjectToSend = {
                date: date,
                time: time,
                notes: notes,
                child_id: child_id,
                category_id: category_id
            };
            console.log('trackEvent:', eventObjectToSend);
            // Post Event
            $http.post('/api/event', eventObjectToSend).then(function(response) {
                console.log('success');
            },
            function(response) {
                console.log('error');
                self.message = 'Something went wrong. Please try again.'
            })
        }
    }; // end trackEvent
}]);