myApp.service('EventService', ['$http', '$location', function($http, $location) {
    console.log('EventService Loaded');
    var self = this;
    self.message = '';

    self.feedingTimeDifferenceInHours = 0;
    self.sleepingTimeDifferenceInHours = 0;
    self.diaperingTimeDifferenceInHours = 0;
    self.medicationTimeDifferenceInHours = 0;
    self.otherTimeDifferenceInHours = 0;

    self.childEvents = {
        list: []
    };
    self.categoryFeeding = {
        list: []
    };
    self.categorySleeping = {
        list: []
    };
    self.categoryDiapering = {
        list: []
    };
    self.categoryMedication = {
        list: []
    };
    self.categoryOther = {
        list: []
    };

    self.trackEvent = function(child_id, notes, category_id, familyId, datetime) {
        if (child_id === '' || child_id === undefined) {
            self.message = 'Please select a child.'
        } else {
            let eventObjectToSend = {
                notes: notes,
                child_id: child_id,
                category_id: category_id,
                datetime: datetime
            };
            console.log('trackEvent:', eventObjectToSend);
            // Post Event
            $http.post('/api/event', eventObjectToSend).then(function(response) {
                console.log('success');
                self.getChildEventList(child_id);
            },
            function(response) {
                console.log('error');
                self.message = 'Something went wrong. Please try again.'
            })
        }
    }; // end trackEvent

    self.getChildEventList = function (id) {
        self.currentDateTime = new Date();

        // get category events based on child
        $http.get(`/api/event/child/${id}`).then(function(response) {
            if(response.data) {
                self.childEvents.list = response.data;
                console.log('self.childEvents.list', self.childEvents.list);

                // GET feeding category content
                $http.get(`/api/event/category/feeding/${id}`).then(function(response){
                    if (response.data) {
                        self.categoryFeeding.list = response.data;
                        // calculate the hours between current time and last event
                        self.feedingTimeDifferenceInHours =  Math.ceil(((((Math.abs(self.currentDateTime - new Date(self.categoryFeeding.list[0].datetime))) / 1000) / 60) / 60));
                        
                        console.log('feeding time difference:', self.feedingTimeDifferenceInHours);
                    } else {
                        console.log('failed getting category');
                    }
                }, function(response) {
                    console.log('failed getting category');
                }); // end getting feeding category

                // GET sleeping category content
                $http.get(`/api/event/category/sleeping/${id}`).then(function(response){
                    if (response.data) {
                        self.categorySleeping.list = response.data;
                        // calculate the hours between current time and last event
                        self.sleepingTimeDifferenceInHours =  Math.ceil(((((Math.abs(self.currentDateTime - new Date(self.categorySleeping.list[0].datetime))) / 1000) / 60) / 60));
                        console.log('sleeping time difference:', self.sleepingTimeDifferenceInHours);
                    } else {
                        console.log('failed getting category');
                    }
                }, function(response) {
                    console.log('failed getting category');
                }); // end getting sleeping category

                // GET diapering category content
                $http.get(`/api/event/category/diapering/${id}`).then(function(response){
                    if (response.data) {
                        self.categoryDiapering.list = response.data;
                        // calculate the hours between current time and last event
                        self.diaperingTimeDifferenceInHours =  Math.ceil(((((Math.abs(self.currentDateTime - new Date(self.categoryDiapering.list[0].datetime))) / 1000) / 60) / 60));
                        console.log('diapering time difference:', self.diaperingTimeDifferenceInHours);
                    } else {
                        console.log('failed getting category');
                    }
                }, function(response) {
                    console.log('failed getting category');
                }); // end getting diapering category

                // GET medication category content
                $http.get(`/api/event/category/medication/${id}`).then(function(response){
                    if (response.data) {
                        self.categoryMedication.list = response.data;
                        // calculate the hours between current time and last event
                        self.medicationTimeDifferenceInHours =  Math.ceil(((((Math.abs(self.currentDateTime - new Date(self.categoryMedication.list[0].datetime))) / 1000) / 60) / 60));
                        console.log('medication time difference:', self.medicationTimeDifferenceInHours);
                    } else {
                        console.log('failed getting category');
                    }
                }, function(response) {
                    console.log('failed getting category');
                }); // end getting medication category

                // GET other category content
                $http.get(`/api/event/category/other/${id}`).then(function(response){
                    if (response.data) {
                        self.categoryOther.list = response.data;
                        // calculate the hours between current time and last event
                        self.otherTimeDifferenceInHours =  Math.ceil(((((Math.abs(self.currentDateTime - new Date(self.categoryOther.list[0].datetime))) / 1000) / 60) / 60));
                        console.log('other time difference:', self.otherTimeDifferenceInHours);
                    } else {
                        console.log('failed getting category');
                    }
                }, function(response) {
                    console.log('failed getting category');
                }); // end getting other category

            } else {
                console.log('get events by child id failed');
            }
        });
    }; // end getChildEventList

    self.updateNotes = function(eventId, notes, childId) {
        let notesToSend = {
            notes: notes
        };
        console.log('in service, updateNotes - eventId and notes', eventId, notesToSend);
        $http.put(`/api/event/update/${eventId}`, notesToSend)
        .then(function(response) {
                console.log('success');
                self.getChildEventList(childId);
            },
            function(response) {
                console.log('error, response:', response);
                self.message = "Something went wrong. Please try again."
            });
    }; // end updateNotes
}]);
