
var firebase = new Firebase("https://codepals.firebaseio.com/");

//Automatically create a guest user if not authed
function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

firebase.onAuth(function(authdata) {
    console.log("Header onauth", authdata);
    if (authdata) {
        if (firebase.getAuth().github != null) {
            firebase.child("/accounts/" + firebase.getAuth().uid).update(
                {
                    displayName: firebase.getAuth().github.username,
                    points: 0,
                    avatar: firebase.getAuth().github.cachedUserProfile.avatar_url,
                    github: firebase.getAuth().github.cachedUserProfile.html_url,
                });
        }
        else {
            firebase.child("/accounts/" + firebase.getAuth().uid).update(
                {
                    displayName: "Guest:" + s4() + "-" + s4(),
                    points: 0,
                });
        }
    }
    else {
        firebase.authAnonymously(function(error, authData) {
            if (error != null) return;
        });
    }
});

function githubLogin() {
    firebase.authWithOAuthRedirect("github", function(err) { });
};
