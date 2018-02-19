myApp.controller('LoginController', ['$http', '$location', 'FamilyService', function ($http, $location, FamilyService) {
	console.log('LoginController created');
	var self = this;

	self.user = {
		username: '',
		family_name: '',
		password: ''
	};

	self.familyService = FamilyService;
	self.familyObject = FamilyService.familyObject;

	self.login = function () {
		if (self.user.username === '' || self.user.password === '') {
			self.message = "Enter your username and password!";
		} else {
			console.log('sending to server...', self.user);
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
	};

	self.registerUser = function () {
		if (self.user.username === '' || self.user.family_name === '' || self.user.password === '') {
			self.message = "Choose a username, family name, and password!";
		} else {
			console.log('sending to server...', self.user);
			$http.post('/api/family/register', self.user).then(function (response) {
				console.log('success');
				$location.path('/login');
			},
				function (response) {
					console.log('error');
					self.message = "Something went wrong. Please try again."
				});
		}
	};
}]);
