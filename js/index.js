(function() {
  
  var app = angular.module('dribbbleViewer', []);
  
  var MainController = function($scope, $http) {

    var dribbbleUrl = 'https://api.dribbble.com/v1/shots.json?access_token=f688ac519289f19ce5cebc1383c15ad5c02bd58205cd83c86cbb0ce09170c1b4';

    $scope.search = function(response) {
      $http.get(dribbbleUrl)
      .then( getShots, onError );
    };
    
    var getShots = function(response) {
      $scope.shots = response.data;
    };

    var onError = function(reason) {
      console.log("Error");
    };

  }; /* controller */
  
  app.controller("MainController", ["$scope", "$http", MainController]);
  
  app.filter("sanitize", ['$sce', function($sce) {
    return function(htmlCode) {
      return $sce.trustAsHtml(htmlCode);
    };
  }]);
  
}());