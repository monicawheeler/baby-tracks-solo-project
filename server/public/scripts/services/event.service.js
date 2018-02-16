myApp.service('EventService', ['$http', '$location', function ($http, $location) {
    console.log('EventService Loaded');
    var self = this;
    self.message = '';

    // self.feedingTimeDifferenceInHours = 0;
    // self.sleepingTimeDifferenceInHours = 0;
    // self.diaperingTimeDifferenceInHours = 0;
    // self.medicationTimeDifferenceInHours = 0;
    // self.otherTimeDifferenceInHours = 0;

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

    self.trackEvent = function (child_id, notes, category_id, datetime) {
        let eventObjectToSend = {
            child_id: child_id,
            notes: notes,
            category_id: category_id,
            datetime: datetime
        };
        console.log('trackEvent:', eventObjectToSend);
        // Post Event
        $http.post('/api/event', eventObjectToSend) 
            .then(function (response) {
                console.log('success');
                console.log('track event in service - success - child_id', child_id);

                self.getChildEventList(child_id);
            })
            .catch(function (error) {
                console.log('error, response:', response);
                self.message = "Something went wrong. Please try again."
            });

    }; // end trackEvent

    self.getChildEventList = function (id) {
        self.currentDateTime = new Date();
        console.log('in getChildEventList');

        // get category events based on child
        $http.get(`/api/event/child/${id}`).then(function (response) {

            if (response.data) {
                self.childEvents.list = response.data;
                console.log('self.childEvents.list', self.childEvents.list);

                // GET feeding category content
                $http.get(`/api/event/category/feeding/${id}`)
                    .then(function (response) {
                        self.categoryFeeding.list = response.data;
                        // if(self.categoryDiapering.list[0].datetime != '' || self.categoryDiapering.list[0].datetime != undefined || self.categoryDiapering.list[0].datetime != null) {
                        //     // calculate the hours between current time and last event
                        //     self.diaperingTimeDifferenceInHours =  Math.ceil(((((Math.abs(self.currentDateTime - new Date(self.categoryDiapering.list[0].datetime))) / 1000) / 60) / 60));
                        //     console.log('diapering time difference:', self.diaperingTimeDifferenceInHours);
                        // }
                    })
                    .catch(function (error) {
                        console.log('error, response:', response);
                        self.message = "Something went wrong. Please try again."
                    }); // end getting feeding category


                // GET sleeping category content
                $http.get(`/api/event/category/sleeping/${id}`)
                    .then(function (response) {
                        self.categorySleeping.list = response.data;
                        // if(self.categoryDiapering.list[0].datetime != '' || self.categoryDiapering.list[0].datetime != undefined || self.categoryDiapering.list[0].datetime != null) {
                        //     // calculate the hours between current time and last event
                        //     self.diaperingTimeDifferenceInHours =  Math.ceil(((((Math.abs(self.currentDateTime - new Date(self.categoryDiapering.list[0].datetime))) / 1000) / 60) / 60));
                        //     console.log('diapering time difference:', self.diaperingTimeDifferenceInHours);
                        // }
                    })
                    .catch(function (error) {
                        console.log('error, response:', response);
                        self.message = "Something went wrong. Please try again."
                    }); // end getting sleeping category


                // GET diapering category content
                $http.get(`/api/event/category/diapering/${id}`)
                    .then(function (response) {
                        self.categoryDiapering.list = response.data;
                        // if(self.categoryDiapering.list[0].datetime != '' || self.categoryDiapering.list[0].datetime != undefined || self.categoryDiapering.list[0].datetime != null) {
                        //     // calculate the hours between current time and last event
                        //     self.diaperingTimeDifferenceInHours =  Math.ceil(((((Math.abs(self.currentDateTime - new Date(self.categoryDiapering.list[0].datetime))) / 1000) / 60) / 60));
                        //     console.log('diapering time difference:', self.diaperingTimeDifferenceInHours);
                        // }
                    })
                    .catch(function (error) {
                        console.log('error, response:', response);
                        self.message = "Something went wrong. Please try again."
                    }); // end getting diapering category


                // GET medication category content
                $http.get(`/api/event/category/medication/${id}`)
                    .then(function (response) {
                        self.categoryMedication.list = response.data;
                    })
                    .catch(function (error) {
                        console.log('error, response:', response);
                        self.message = "Something went wrong. Please try again."

                    }); // end getting medication category


                // GET other category content
                $http.get(`/api/event/category/other/${id}`)
                    .then(function (response) {
                        self.categoryOther.list = response.data;
                    })
                    .catch(function (error) {
                        console.log('error, response:', response);
                        self.message = "Something went wrong. Please try again."
                    });  // end getting other category

            } else {
                console.log('get events by child id failed');
            }
        });
    }; // end getChildEventList

    self.updateNotes = function (eventId, notes, childId) {
        let notesToSend = {
            notes: notes
        };
        console.log('in service, updateNotes - eventId and notes', eventId, notesToSend);
        $http.put(`/api/event/update/${eventId}`, notesToSend)
            .then(function (response) {
                console.log('success');
                self.getChildEventList(childId);
            })
            .catch(function (error) {
                console.log('error, response:', response);
                self.message = "Something went wrong. Please try again."
            });
    }; // end updateNotes
}]);