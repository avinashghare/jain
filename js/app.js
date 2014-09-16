// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','restservice'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
	
	
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })
  
    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: 'HomeCtrl'
        }
      }
    })
  

  .state('app.about', {
      url: "/about",
      views: {
          'menuContent' :{
              templateUrl: "templates/about.html",
              controller: 'AboutCtrl'
          }
      }
  })

    .state('app.article', {
        url: "/article",
      views: {
          'menuContent' :{
            templateUrl: "templates/article.html",
          controller: 'ArticleCtrl'
        }
      }
    })
  
   
    .state('app.article-inside', {
        url: "/wall",
      views: {
        'menuContent' :{
            templateUrl: "templates/article-inside.html",
          controller: 'ArticleInsideCtrl'
        }
      }
    })
  
    .state('app.schedule', {
        url: "/schedule",
      views: {
        'menuContent' :{
            templateUrl: "templates/schedule.html",
            controller: 'ScheduleCtrl'
        }
      }
    })
  
    .state('app.photos', {
        url: "/photos",
      views: {
        'menuContent' :{
            templateUrl: "templates/photos.html",
            controller: 'PhotosCtrl'
        }
      }
    })
  
    .state('app.photos-inner', {
        url: "/photos/inner",
      views: {
        'menuContent' :{
            templateUrl: "templates/photos-inner.html",
            controller: 'PhotosInnerCtrl'
        }
      }
    })
  
    .state('app.videos', {
        url: "/videos",
      views: {
        'menuContent' :{
            templateUrl: "templates/videos.html",
            controller: 'YoutubeCtrl'
        }
      }
    })
    .state('app.audio', {
        url: "/audio",
      views: {
        'menuContent' :{
            templateUrl: "templates/audio.html",
            controller: 'AudioCtrl'
        }
      }
    })
    .state('app.book', {
        url: "/book",
      views: {
        'menuContent' :{
            templateUrl: "templates/book.html",
            controller: 'BookCtrl'
        }
      }
    })

    .state('app.constituency', {
        url: "/constituency",
      views: {
        'menuContent' :{
            templateUrl: "templates/constituency.html",
            controller: 'VoteCtrl'
        }
      }
    })

    .state('app.party', {
        url: "/party",
      views: {
        'menuContent' :{
            templateUrl: "templates/party.html",
            controller: 'VoteCtrl'
        }
      }
    })

    .state('app.facebook', {
        url: "/facebook",
      views: {
        'menuContent' :{
            templateUrl: "templates/facebook.html",
            controller: 'FacebookCtrl'
        }
      }
    })
  
    .state('app.twitter', {
        url: "/twitter",
      views: {
        'menuContent' :{
            templateUrl: "templates/twitter.html",
            controller: 'TwitterCtrl'
        }
      }
    })

    .state('app.youtube', {
        url: "/youtube",
      views: {
        'menuContent' :{
            templateUrl: "templates/youtube.html",
            controller: 'YoutubeCtrl'
        }
      }
    })

    .state('app.vote', {
        url: "/vote",
      views: {
        'menuContent' :{
            templateUrl: "templates/vote.html",
            controller: 'VoteCtrl'
        }
      }
    })

    .state('app.voteform', {
        url: "/voteform",
      views: {
        'menuContent' :{
            templateUrl: "templates/vote-form.html",
            controller: 'VoteFormCtrl'
        }
      }
    })

    .state('app.membership', {
        url: "/membership",
      views: {
        'menuContent' :{
            templateUrl: "templates/membership.html",
            controller: 'MembershipCtrl'
        }
      }
    })

    .state('app.upload', {
        url: "/upload",
      views: {
        'menuContent' :{
            templateUrl: "templates/upload.html",
            controller: 'UploadCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    });
    
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})


.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}])

.filter('unique', ['$parse', function ($parse) {

  return function (items, filterOn) {

    if (filterOn === false) {
      return items;
    }

    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
      var newItems = [],
        get = angular.isString(filterOn) ? $parse(filterOn) : function (item) { return item; };

      var extractValueToCompare = function (item) {
        return angular.isObject(item) ? get(item) : item;
      };

      angular.forEach(items, function (item) {
        var isDuplicate = false;

        for (var i = 0; i < newItems.length; i++) {
          if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          newItems.push(item);
        }

      });
      items = newItems;
    }
    return items;
  };
}]);