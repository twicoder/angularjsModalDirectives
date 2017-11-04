(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:HomeCtrl
	* @description
	* # HomeCtrl
	* Controller of the app
	*/

	angular
		.module('angm-test2')
		.controller('HomeCtrl', ['$scope','$modal',function($scope,$modal){
			$scope.title = "Hello, Angm-Generator!";

			$scope.open = function(){
				var modalInstance = $modal.open({
					templateUrl: 'myModalContent.html',
					controller:'ModalCtrl'
				});
			};
		}])
		.controller('ModalCtrl',function($scope,$modalInstance){

			// Added some content too Modal usiing $scope
			$scope.content = "ModalCtrl, Yeah!";

			// Add cancel button
			$scope.cancel = function(){
				$modalInstance.dismiss('cancel');
			};
		});

})();
