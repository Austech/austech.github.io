angular.module("userdisplay", ["firebase"]).directive("firebaseuser", function() {
    return {
        scope: {
            myAuth: '=fbuser',
            logout: '=logout',
            home: '=home',
            account: '=account'
        },
        templateUrl: '/templates/fbuser.html'
    };
}).factory("userauthsetup", function($firebaseObject) {
    var globals = 
    {
        auth: {},
        account: {},
    };
    return {
        data: globals,
        setup: function(callback) {
            firebase.onAuth(function(auth) {
                if (callback)
                    callback(auth);
                if (auth == null) return;
                globals.account = $firebaseObject(firebase.child("accounts/" + auth.uid + "/displayName"));
                globals.auth = auth;
            });
        },
    }
});