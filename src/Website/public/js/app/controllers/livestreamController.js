'use strict';

angular.module('raspiSurveillance.controllers').controller('LivestreamController', [
  '$scope', '$rootScope', '$sce', function ($scope, $rootScope, $sce) {

    // Attributes
    $scope.onPlayerReady = function onPlayerReady(videoPlayer) {
      $scope.videoPlayer = videoPlayer;
    };

    $scope.stream = {
      sources: [],
      theme: 'bower_components/videogular-themes-default/videogular.css',
      autoPlay: true
    };

    // Actions
    $scope.getStreamUrl = function () {
      if ($scope.stream.sources.length === 0) {
        return null;
      }

      return $sce.getTrustedResourceUrl($scope.stream.sources[0].src);
    };


    $scope.playStream = function (url, type) {
      if ($scope.stream.sources.length > 0 && url.toLowerCase() === $scope.getStreamUrl().toLowerCase()) {
        console.log('Already playing livestream "' + url + '" (' + type + ')');
        return;
      }

      console.info('Playing livestream "' + url + '" (' + type + ')');

      $rootScope.$broadcast('playingStream', url, type);

      $scope.stream.sources = [{ src: $sce.trustAsResourceUrl(url), type: type }];
      $scope.videoPlayer.play();
    }

    $scope.$on('playStream', function (event, url, type) {
      $scope.playStream(url, type);
    });

    $scope.playStreamFromUrl = function () {
      $scope.playStream($scope.customUrl, 'video/mp4');
    }

    $scope.$on('removingStreamSource', function (event, url) {
      if ($scope.stream.sources.length === 0) {
        return;
      }

      if (url.toLowerCase() === $scope.getStreamUrl().toLowerCase()) {
        console.info('Stopping livestream (stream source "' + url + '" is being removed)');

        $scope.videoPlayer.stop();
        $scope.stream.sources = [];
      }
    });

  }
]);