myApp.controller('LoginController', ['$http', '$location', 'FamilyService', 'ChildService', function ($http, $location, FamilyService, ChildService) {
	var self = this;

	// User object
	self.user = {
		username: '',
		family_name: '',
		password: ''
	};

	// FamilyService variables
	self.familyService = FamilyService;
	self.familyObject = FamilyService.familyObject;

	// login function to login users
	self.login = function () {
		if (self.user.username === '' || self.user.password === '') {
			self.message = "Enter your username and password!";
		} else {
			$http.post('/api/family/login', self.user).then(
				function (response) {
					if (response.status == 200) {
						console.log('success: ', response.data);
						// location works with SPA (ng-route)
						$location.path('/tracking');
					} else {
						console.log('failure error: ', response);
						self.message = "Incorrect credentials. Please try again.";
					}
				},
				function (response) {
					console.log('failure error: ', response);
					self.message = "Incorrect credentials. Please try again.";
				});
		}
	}; // end login 

	// registerUser function to register users
	self.registerUser = function () {
		if (self.user.username === '' || self.user.family_name === '' || self.user.password === '') {
			self.message = "Choose a username, family name, and password!";
		} else {
			console.log('sending to server...', self.user);
			$http.post('/api/family/register', self.user).then(function (response) {
				console.log('success');
				$location.path('/login-new');
			},
				function (response) {
					console.log('error');
					self.message = "Something went wrong. Please try again."
				});
		}
	}; // end registerUser
}]);
