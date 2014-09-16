var startercontrollers = angular.module('starter.controllers', ['restservice'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, RestService) {
    // Form data for the login modal
    $scope.loginData = {};
    
    var image = function (data, status) {
        //console.log(data);
        $scope.getimage = data;
    };
    RestService.image().success(image);
    
    var book = function (data, status) {
        //console.log(data);
        $scope.getbook = data;
    };
    RestService.book().success(book);

    var region = function (data, status) {
        //console.log(data);
        $scope.getregion = data;
    };
    RestService.region().success(region);

    var scheduler = function (data, status) {
        //console.log(data);
        $scope.getscheduler = data;
    };
    RestService.scheduler().success(scheduler);

    var mpconstituency = function (data, status) {
        //console.log(data);
        $scope.getmpconstituency = data;
    };
    RestService.mpconstituency().success(mpconstituency);

    var mlaconstituency = function (data, status) {
        //console.log(data);
        $scope.getmlaconstituency = data;
    };
    RestService.mlaconstituency().success(mlaconstituency);

    var position = function (data, status) {
        //console.log(data);
        $scope.getposition = data;
    };
    RestService.position().success(position);

    var state = function (data, status) {
        //console.log(data);
        $scope.getstate = data;
    };
    RestService.state().success(state);

    var video = function (data, status) {
        //console.log(data);
        $scope.getvideo = data;
    };
    RestService.video().success(video);


    var insertvotesuccess = function (data, status) {
        //console.log(data);

    };
    $scope.insertvote = function (data) {
        //console.log("Insert button is clicked");
        RestService.insertvote(data).success(insertvotesuccess);
        //RestService.viewall().success(viewsuccess);
    };

   

    var insertmembershipsuccess = function (data, status) {
        //console.log(data);

    };
    $scope.insertmembership = function (data) {
        //console.log("InsertMembership button is clicked");
        RestService.insertmembership(data).success(insertmembershipsuccess);
        //RestService.viewall().success(viewsuccess);
    };



    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function (userinfo) {
        
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        //console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
    
})

.controller('VoteCtrl', function ($scope) {
    $scope.playvoteaudio=function() {
       console.log("Audio Start");
        $('.voteaudio').get(0).play();
    };
})

.controller('HomeCtrl', function ($scope, $stateParams, $ionicModal,RestService) {

    
   
    //RestService.loadwall();
    
    init();
    RestService.loadwall();
    
    $scope.loginData = {};
    var firstlogin = $.jStorage.get("firstlogin");
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/user-info.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
        if (firstlogin != 1) {
            $scope.modal.show();

        }
    });
    
    
    var insertuserinfosuccess = function (data, status) {
        $.jStorage.set("firstlogin", 1);
    };
   
    $scope.alertnew='';
    // Triggered in the login modal to close it
    $scope.closeLogin = function (data) {

        $scope.alertnew="Invalid Input";
        if(data.username && data.phoneno)
        {
            RestService.insertuserinfo(data).success(insertuserinfosuccess);
            $scope.modal.hide();
            $scope.alertnew="";
        }
        else
        {
            
        }
    },

    // Open the login modal
    $scope.login = function () {
        if (firstlogin != 1) {
            $scope.modal.show();
        }
    };


})

.controller('AboutCtrl', function ($scope, $stateParams, $ionicModal, $ionicTabsDelegate) {
})

.controller('ArticleCtrl', function ($scope, $stateParams) {})

.controller('ArticleInsideCtrl', function ($scope, $stateParams, $location,RestService) {
    $scope.walldata = [];
    $scope.isrefresh = false;
	$scope.orderby = 'id';
    RestService.loadwall();
	
	function getwallindex(id) {
		for(var i=0;i<$scope.walldata.length;i++)
		{
			if($scope.walldata[i].id==id)
			return i;
		}
		
	};
	
	$scope.playaudio=function(audioclass,index) {
		index=getwallindex(index);
		$('.'+audioclass).get(0).play();
		$scope.walldata[index].media="stop";
	};
	$scope.stopaudio=function(audioclass,index) {
		index=getwallindex(index);
		$('.'+audioclass).get(0).pause();
		$scope.walldata[index].media="play";
	};
	$scope.playvideo=function(videoclass,index) {
		index=getwallindex(index);
		$('.'+videoclass).get(0).play();
		$scope.walldata[index].media="stop";
	};
	$scope.stopvideo=function(videoclass,index) {
		index=getwallindex(index);
		$('.'+videoclass).get(0).pause();
		$scope.walldata[index].media="play";
	};
    
    $scope.sharetext=function(text) {
        window.plugins.socialsharing.share(text);
    };
    $scope.shareimage=function(image) {
        window.plugins.socialsharing.share(null, null, image, null);
    };
	$scope.sharemedia=function(media) {
        window.plugins.socialsharing.share("Media", "Media", media);
    };

    $scope.refreshwall = function () {
       
        $scope.walldata=RestService.getwall();
		$scope.orderby = 'name';
		$scope.orderby = 'id';
        //console.log($scope.walldata);
    };
    
    
    $scope.$on('$viewContentLoaded', function () {
        //console.log("content loaded");
        $scope.refreshwall();
    });
    $scope.clearwall=function() {
        $scope.walldata=[];
        RestService.clearwall();
    };
    


})

.controller('ScheduleCtrl', function ($scope, $stateParams) {
})

.controller('PhotosCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate) {
    $scope.nextSlide = function() {
        $ionicSlideBoxDelegate.next();
    };
    $scope.prevSlide = function() {
        $ionicSlideBoxDelegate.previous();
    };
})

.controller('PhotosInnerCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate, $routProvider) {
    
})

.controller('FacebookCtrl', function ($scope, $stateParams) {
})

.controller('TwitterCtrl', function ($scope, $stateParams) {
    $scope.$on('$viewContentLoaded', function () {
        ! function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0],
                p = /^http:/.test(d.location) ? 'http' : 'https';
            if (!d.getElementById(id)) {
                js = d.createElement(s);
                js.id = id;
                js.src = p + "://platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js, fjs);
            }
        }(document, "script", "twitter-wjs");
    });
})

.controller('MembershipCtrl', function ($scope, $stateParams) {
})
.controller('AudioCtrl', function ($scope, $stateParams) {
})
.controller('BookCtrl', function ($scope, $stateParams) {
//   alert('book');
    $scope.groups = [];
  for (var i=0; i<10; i++) {
    $scope.groups[i] = {
      name: i,
      items: []
    };
    for (var j=0; j<3; j++) {
      $scope.groups[i].items.push(i + '-' + j);
    }
  }
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
    
})

.controller('UploadCtrl', function ($scope, $stateParams,$ionicPopup, $timeout) {
    $scope.showPopup = function() {
        $scope.data = {}

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '',
            title: 'Share',
            scope: $scope,
            buttons: [
                { text: 'Cancel' },
            ]
                });
                myPopup.then(function(res) {
                //console.log('Tapped!', res);
                });
                };
})

.controller('VoteFormCtrl', function ($scope, $stateParams) {
   
})

.controller('VideosCtrl', function ($scope, $stateParams) {
})

.controller('YoutubeCtrl', function ($scope) {
});