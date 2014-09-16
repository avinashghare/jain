var apiServer = 'http://mafiawarloots.com/jainbackend/politician/index.php';
var restservice = angular.module('restservice', [])

.factory('RestService', function ($http) {
    var mywall = [];
    var db = openDatabase('mydb', '1.0', 'appdb', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS WALL (id unique, title,userdata,status)');
        //tx.executeSql('INSERT INTO WALL (id, title,userdata) VALUES (1, "foobar","Android")');

        tx.executeSql('SELECT * FROM WALL WHERE `status`=0', [], function (tx, results) {
            var len = results.rows.length,
                i;

            for (i = 0; i < len; i++) {
				var message=results.rows.item(i);
				message.id=parseInt(message.id);
                mywall.push(message);
                //console.log(results.rows.item(i));

            }

        }, null);
    });

    function addtosql(data5) {

        db.transaction(function (tx) {
            //console.log("addtosqlcalled");
            //console.log(data5);
            for (j = 0; j < data5.length; j++) {
                //console.log(data5);
                tx.executeSql('INSERT INTO WALL (id, title,userdata,status) VALUES (' + data5[j].id + ', "' + data5[j].title + '","' + data5[j].userdata + '",0)');
            }

        });

    };


    return {
        viewall: function () {

            return $http.get(apiServer + "/vote/create");
        },
        region: function () {
            return $http.get(apiServer + "/region/find", {});
        },
        book: function () {
            return $http.get(apiServer + "/book/find", {});
        },
        scheduler: function () {
            return $http.get(apiServer + "/scheduler/find", {});
        },
        mpconstituency: function () {
            return $http.get(apiServer + "/mpconstituency/find", {});
        },
        mlaconstituency: function () {
            return $http.get(apiServer + "/mlaconstituency/find", {});
        },
        image: function () {
            return $http.get(apiServer + "/image/find", {});
        },
        position: function () {
            return $http.get(apiServer + "/position/find", {});
        },
        video: function () {
            return $http.get(apiServer + "/video/find", {});
        },
        state: function () {
            return $http.get(apiServer + "/state/find", {});
        },
        mpconstituency: function () {
            return $http.get(apiServer + "/mpconstituency/find", {});
        },
        inputdetails: function (id, firstname, lastname) {
            //console.log(id + firstname + lastname);
            return $http.get(apiServer + "/vote/create?id=" + id + "&firstname=" + firstname + "&lastname=" + lastname, {});
        },
        deletecustomer: function (id) {
            //console.log(id);
            return $http.get(apiServer + "/welcome/deletecustid?id=" + id, {});
        },
        insertmembership: function (data) {
            //console.log(data);
            return $http.get(apiServer + "/membership/create", {
                params: data
            });
        },
        insertuserinfo: function (data) {
            //console.log(data);
            return $http.get(apiServer + "/registration/create", {
                params: data
            });
        },
        insertvote: function (data) {
            //console.log(data);
            return $http.get(apiServer + "/vote/create", {
                params: data
            });
        },
        insertimage: function (data, image) {
            //console.log(data);
            //console.log(image);
            return $http.get(apiServer + "/upload/create?text=" + data + "&image=" + image, {});
        },
        viewid: function (id) {
            //console.log(id);
            return $http.get(apiServer + "/vote/create?id=" + id, {});
        },
        loadwall: function () {


            //console.log("Load wall executed");
            var lastid = 0;
            var newdata = {};
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM WALL ORDER BY `id` DESC LIMIT 0,1', [], function (tx, results) {
                    var len = results.rows.length;

                    var i = 0;
                    //console.log(results);
                    if (results.rows.length > 0) lastid = results.rows.item(i).id;

                    //console.log("Last ID: " + lastid);
                    //$http.get(apiServer + "/wall/getwall?id=" + lastid, {}).success(function (data) {
                    $http.get(apiServer+"/wall/getmessages?id=" + lastid, {}).success(function (data) {
                        addtosql(data);
                        var j = 0;
                        for (j = 0; j < data.length; j++) {
                            mywall.push(data[j]);

                        }
                    });


                }, null);
                var i = 0;


            });





        },
        getwall: function () {

            return mywall;
        },
        clearwall: function () {
            mywall = [];
            db.transaction(function (tx) {
                tx.executeSql('UPDATE WALL SET `status`=1 WHERE `status`=0');
            });
        }
    }

});