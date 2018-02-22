myApp.service('EventService', ['$http', '$location', function ($http, $location) {
    console.log('EventService Loaded');
    var self = this;
    self.message ='';

    // Storage for childEvents
    self.childEvents = {list: []};

    // Storage for category data
    self.categoryFeeding = {list: []};
    self.categorySleeping = {list: []};
    self.categoryDiapering = {list: []};
    self.categoryBathing = {list: []};
    self.categoryMedication = {list: []};
    self.categoryOther = {list: []};

    // trackEvent POST request
    self.trackEvent = function (child_id, notes, category_id, datetime) {
        let eventObjectToSend = {
            child_id: child_id,
            notes: notes,
            category_id: category_id,
            datetime: datetime
        };
        
        $http.post('/api/event', eventObjectToSend) 
            .then(function (response) {
                console.log('success posting even');
                self.getChildEventList(child_id);
            })
            .catch(function (error) {
                console.log('error, response:', response);
                self.message = "Something went wrong. Please try again."
            });

    }; // end trackEvent

    // getChildEventList GET request
    self.getChildEventList = function (id) {
        self.currentDateTime = new Date();

        // get category events based on child
        $http.get(`/api/event/child/${id}`)
            .then(function (response) {
                console.log('success get child event list');
                self.childEvents.list = response.data;
                
                // GET feeding category content
                $http.get(`/api/event/category/feeding/${id}`)
                    .then(function (response) {
                        self.categoryFeeding.list = response.data;
                    })
                    .catch(function (error) {
                        console.log('error, response:', response);
                        self.message = "Something went wrong. Please try again."
                    }); // end getting feeding category

                // GET sleeping category content
                $http.get(`/api/event/category/sleeping/${id}`)
                    .then(function (response) {
                        self.categorySleeping.list = response.data;
                    })
                    .catch(function (error) {
                        console.log('error, response:', response);
                        self.message = "Something went wrong. Please try again."
                    }); // end getting sleeping category

                // GET diapering category content
                $http.get(`/api/event/category/diapering/${id}`)
                    .then(function (response) {
                        self.categoryDiapering.list = response.data;
                    })
                    .catch(function (error) {
                        console.log('error, response:', response);
                        self.message = "Something went wrong. Please try again."
                    }); // end getting diapering category

                // GET bathing category content
                $http.get(`/api/event/category/bathing/${id}`)
                    .then(function (response) {
                        self.categoryBathing.list = response.data;
                    })
                    .catch(function (error) {
                        console.log('error, response:', response);
                        self.message = "Something went wrong. Please try again."
                    }); // end getting bathing category

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

            })
            .catch(function (error) {
                console.log('error, response:', response);
                self.message = "Something went wrong. Please try again."
            });
            
    }; // end getChildEventList

    // updateNotes PUT request
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