// Initialize CMP DATABASE
firebase.initializeApp({
	apiKey: "AIzaSyAau-WrmNX1wWHTQWNxUQbNqINE3dWdb90",
	authDomain: "scouting-2020-a001b.firebaseapp.com",
	databaseURL: "https://scouting-2020-a001b.firebaseio.com",
	projectId: "scouting-2020-a001b",
	// storageBucket: "scouting-2020-a001b.appspot.com",
	// messagingSenderId: "881518357204",
	// appId: "1:881518357204:web:479c1ecb18af6c08a7a941",
	// measurementId: "G-GW45249Q4E"
});
var db = firebase.firestore();

// Initialize HANNAH DATABASE

// firebase.initializeApp({
//     apiKey: "AIzaSyAORXJe-xsRCVo3dgD3zESmjcgoS-65r3I",
//     databaseURL: "https://scouting1325.firebaseio.com",
//     authDomain: "scouting1325.firebaseapp.com",
//     projectId: "scouting1325"
// });
// var db = firebase.firestore();

// Initialize DEV DATABASE 
// var config = {
//     apiKey: "AIzaSyAUxp-Hz_5ZKo2WabIiEU3PUU8TEGwWAQE",
//     authDomain: "scouting-compiler-dev.firebaseapp.com",
//     databaseURL: "https://scouting-compiler-dev.firebaseio.com",
//     projectId: "scouting-compiler-dev",
//     storageBucket: "scouting-compiler-dev.appspot.com",
//     messagingSenderId: "211665111326"
// };
// firebase.initializeApp(config);


// ------------------------------------------------------------------------------------------------------------------------------

// var whitelisted_emails = []


// function fetch_emails() {
//     firebase.database().ref("emails").orderByKey().once("value").then(function(snapshot) {
//         snapshot.forEach(function(childSnapshot) {
//             whitelisted_emails.push(childSnapshot.val());
//         });
//         loginStatus();
//     });
// }

// function toWhitelist() {
//     fetch_emails();
//     console.log(whitelisted_emails.length)
//     firebase.database().ref().child('emails/' + (whitelisted_emails.length + 1)).set($("#toWhitelistEmail").val());
//     location.reload();
// }

// function google_signin() {
//     var provider = new firebase.auth.GoogleAuthProvider();
//     var user = firebase.auth().currentUser;
//     if (user) {
//         loginStatus();
//         alert('You\'re already signed in');
//     } else {
//         firebase.auth().signInWithPopup(provider).then(function(result) {
//             // This gives you a Google Access Token. You can use it to access the Google API.
//             var token = result.credential.accessToken;
//             // The signed-in user info.
//             var user = result.user;
//             console.log("You've signed in")
//             loginStatus();
//         }).catch(function(error) {
//             // Handle Errors here.
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             var email = error.email;
//             var credential = error.credential;
//             console.log(errorCode);
//             console.log(errorMessage);
//             console.log(email);
//             console.log(credential);
//             // ...
//         });

//     }
// }


// function loginStatus() {
//     var user = firebase.auth().currentUser;
//     if (user) {
//         if (!(whitelisted_emails.includes(user.email))) {
//             alert("You haven't been approved to input data with " + user.email + ". Please login with the correct email or contact Ashpan")
//             console.log("Nah bee you're a fake fan");
//             firebase.auth().signOut();
//         }
//         updateNav();
//         // document.getElementById("login_link").onclick = google_signout();
//     } else {

//         // document.getElementById("login_link").onclick = google_signin();

//     }
//     updateNav();
// }

// function google_signout() {
//     console.log("You've signed out");
//     firebase.auth().signOut();
//     loginStatus();
// }


// function updateNav() {
//     var user = firebase.auth().currentUser;
//     if (user) {
//         document.getElementById('login').text = 'Welcome ' + user.displayName;
//         document.getElementById('login').style.color = '';
//         document.getElementById("login_link").innerHTML = "Log Out";
//         $("#login_link").attr("onclick", "google_signout()");


//     } else {
//         document.getElementById("login_link").innerHTML = "Log In";
//         $("#login_link").attr("onclick", "google_signin()");
//         document.getElementById('login').style.color = "#f93e3e";
//         document.getElementById('login').text = 'Signed Out';
//     }

// }


// window.onload = function() {
//     fetch_emails();
//     updateNav();
// };

// Disable scroll
$(function() {
    $(':input[type=number]').on('mousewheel', function(e) {
        $(this).blur();
    });
});