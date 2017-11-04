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
		})
		.controller('ModalCustomCtrl',function($scope){
			// Set show modal to false / hide from HTML
			$scope.showModal = false;

			// Toggle function to show and hide mmoodal from HTML
			$scope.toggleModal = function(){
				$scope.showModal = !$scope.showModal;
			};
		})
		.directive('modal',function(){
			return {
				// Add a custom template for modal
				templateUrl:'app/home/modal-tpl.html',
				restrict:'E',
				transclude:true,
				replace:true,
				scope:true,
				link:function postLink(scope,element,attrs){
					scope.title = attrs.title;

					scope.$watch(attrs.visible, function(value){
						if(value == true){
							$(element).modal('show');
						} else {
							$(element).modal('hide');
						}
					});

					$(element).on('shown.bs.modal',function(){
						scope.$apply(function(){
							scope.$parent[attrs.visible] = true;
						});
					});

					$(element).on('hidden.bs.modal',function(){
						scope.$apply(function(){
							scope.$parent[attrs.visible] = false;
						});
					});
				}
			};
		})
		.controller('BootstrapTabCtrl',function($scope,$http){
			// Added some content to Tab / can be from a JSON with
			// $http or $resouce
			$http.get('app/home/tab-content.json')
				.then(function(result){
					// Get dynamic data from JSON file
					$scope.tabs = result.data;
				})
				.catch(function(status){
					// if error, show status
					console.log(status);
				});
		})
		.directive('customTabs',function(){
			return {
				restrict:'E',
				transclude:true,
				scope:{},
				controller:["$scope",function($scope){
					var panes = $scope.panes = [];

					$scope.select = function(pane){
						angular.forEach(panes,function(pane){
							pane.selected = false;
						});
						pane.selected = true;
					};

					this.addPane = function(pane){
						if(panes.length == 0){
							$scope.select(pane);
						}
						panes.push(pane);
					};
				}], // Using inline template
				template:
				`
				<div class="tabbable">
					<ul class="nav nav-tabs">
						<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">
							<a href="" ng-click="select(pane)">{{pane.title}}</a>
						</li>
					</ul>
					<div class="tab-content" ng-transclude></div>
				</div>
				`,
				replace:true
			};
		})
		.directive('pane',function(){
			return {
				require:'^customTabs',
				restrict:'E',
				transclude:true,
				scope:{
					title:'@'
				},
				link:function(scope,element,attrs,tabsCtrl){
					tabsCtrl.addPane(scope);
				},// Using inline template
				template:
				`
				<div class="tab-pane" ng-class="{active:selected}" ng-transclude>
				</div>
				`,
				replace:true
			};
		})
		.controller('AccordionCtrl',function($scope){
			// Add some content to accordion
			$scope.groups = [
				{
					title: 'Header Content One',
					content:'Body Content One'
				},
				{
					title:'Header Content Two',
					content:'Body Content Two'
				},
				{
					title:'Header Content Three',
					content:'Body Content Three'
				}
			];
		});

})();
