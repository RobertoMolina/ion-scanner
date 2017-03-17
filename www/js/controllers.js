angular.module('scanner.controllers', [])
    .controller('HomeController', function($scope, $rootScope, $cordovaBarcodeScanner, $ionicPlatform) {
        var vm = this;

        vm.scan = function(){
            $ionicPlatform.ready(function() {
                $cordovaBarcodeScanner
                    .scan()
                    .then(function(result) {
                        // Success! Barcode data is here
                        vm.scanResults = "We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled;
                    }, function(error) {
                        // An error occurred
                        vm.scanResults = 'Error: ' + error;
                    });
            });
        };

        vm.scanResults = '';
    });
    .controller('SurveyController', function($cordovaInAppBrowser) {

      var options = {
          location: 'yes',
          clearcache: 'yes',
          toolbar: 'no'
        };

      document.addEventListener("deviceready", function () {
        $cordovaInAppBrowser.open('http://ngcordova.com', '_blank', options)
          .then(function(event) {
            // success
          })
          .catch(function(event) {
            // error
          });


        $cordovaInAppBrowser.close();

      }, false);

      $rootScope.$on('$cordovaInAppBrowser:loadstart', function(e, event){

      });

      $rootScope.$on('$cordovaInAppBrowser:loadstop', function(e, event){
        // insert CSS via code / file
        $cordovaInAppBrowser.insertCSS({
          code: 'body {background-color:blue;}'
        });

        // insert Javascript via code / file
        $cordovaInAppBrowser.executeScript({
          file: 'script.js'
        });
      });

      $rootScope.$on('$cordovaInAppBrowser:loaderror', function(e, event){

      });

      $rootScope.$on('$cordovaInAppBrowser:exit', function(e, event){

      });

    });