var matchNumber = 0;
var valKey = [];
var matchArray = [];
var teams = []
var currentEvent = "barrie2020";

// $(window).on('load', function() {
//     if (!(firebase.auth().currentUser)) {
//         $('#login_modal').modal('show');
//         alert("Please Login to your account to input data");
//     }
//     if (firebase.auth().currentUser.email == "692413@pdsb.net") {
//         console.log(true);
//         document.getElementById("ashpan").style.display = "block";
//     }
// });

$(document).ready(function () {

    // $("#auto_switch_success").change(function() {
    //     if ((parseInt($('#auto_switch_success').val()) > 0) || (parseInt($('#auto_scale_success').val()) > 0)) {
    //         $("#baseline_n").removeClass("active");
    //         $("#baseline_y").addClass("active");
    //     } else {
    //         $("#baseline_n").addClass("active");
    //         $("#baseline_y").removeClass("active");
    //     }
    // });
    // $("#auto_scale_success").change(function() {
    //     if ((parseInt($('#auto_switch_success').val()) > 0) || (parseInt($('#auto_scale_success').val()) > 0)) {
    //         $("#baseline_n").removeClass("active");
    //         $("#baseline_y").addClass("active");
    //     } else {
    //         $("#baseline_n").addClass("active");
    //         $("#baseline_y").removeClass("active");
    //     }
    // });
    $('.climb').change(function () {
        if ($('input[id=assisted-climb]:checked').val() === "Assisted Climb") {
            console.log("true");
            document.getElementById("assisted-climb-team").style.display = "block";
        } else {
            console.log("false");
            document.getElementById("assisted-climb-team").style.display = "none";
        }
        if ($('input[id=lifted-team]:checked').val() === "Lifted Team") {
            console.log("true");
            document.getElementById("lifted-climb-team").style.display = "block";
        } else {
            console.log("false");
            document.getElementById("lifted-climb-team").style.display = "none";
        }
        // if ($('input[id=failed-climb]:checked').val() === "Failed Climb") {
        //     console.log("true");
        //     document.getElementById("failed-climb-attempt").style.display = "block";
        // } else {
        //     console.log("false");
        //     document.getElementById("failed-climb-attempt").style.display = "none";
        // }

    });
});


// var counter = 0;
function submitData() {

    $('#uploading').html("");

    // if (inputVerification()) {

    updateDatabase();

    // }

}

// function validTeam() {
//     if (!(teams.includes($('#team').val()))) {
//         $("#teamCheck").html("Team " + $('#team').val() + " is not attending the Science Division.");
//     } else if ((teams.includes($('#team').val())) || ($('#team').val() == "")) {
//         $("#teamCheck").html("");
//     }
// }

function inputVerification() {
    var check = true;
    var team = parseInt($('#team').val());
    if (isNaN(parseInt($('#team').val()))) {
        $('#uploading').html($('#uploading').html() + "<br>Please enter a team number as an integer.");
        check = false;
    }

    if (isNaN(parseInt($('#matchnumber').val()))) {
        $('#uploading').html($('#uploading').html() + "<br>Please enter a match number as an integer.");
        check = false;
    }

    if (typeof $('label#line.active').attr('value') === "undefined") {
        $('#uploading').html($('#uploading').html() + "<br>Please select a value for starting position.");
        check = false;
    }
    if (typeof $('input[name="climb"]:checked').val() === "undefined") {
        $('#uploading').html($('#uploading').html() + "<br>Please select a value for climb.");
        check = false;
    }
    return check;
}


function updateDatabase() {
    var team = $('#team').val();
    var match_number = $('#matchnumber').val() + "";
    if (document.getElementById('climb_other').value === "" || document.getElementById('climb_other').value === null) {
        document.getElementById('climb_other').value = "-";
    }

    if (document.getElementById('comment').value === "" || document.getElementById('comment').value === null) {
        document.getElementById('comment').value = "-";
    }

    if (document.getElementById('assisted-climb-team').value === "" || document.getElementById('assisted-climb-team').value === null) {
        document.getElementById('assisted-climb-team').value = "-";
    }

    if (document.getElementById('lifted-climb-team').value === "" || document.getElementById('assisted-climb-team').value === null) {
        document.getElementById('lifted-climb-team').value = "-";
    }

    var currentData = {
        autoStats: {
            auto_cells_pickup: parseInt($('#auto_cells_pickup').val()),
            auto_cells_missed: parseInt($('#auto_cells_missed').val()),
            auto_lowport_success: parseInt($('#auto_lowport_success').val()),
            auto_lowport_fail: parseInt($('#auto_lowport_fail').val()),
            auto_outerport_success: parseInt($('#auto_outerport_success').val()),
            auto_outerport_fail: parseInt($('#auto_outerport_fail').val()),
            auto_innerport_success: parseInt($('#auto_innerport_success').val()),
            auto_line: $('label[name="line"].active').attr('value'),
            no_auto: $('label[name="auto"].active').attr('value'),
        },

        teleopCycleStats: {
            cycle1: {
                lower_success: parseInt($('#teleop_lower_success_c1').val()),
                lower_fail: parseInt($('#teleop_lower_fail_c1').val()),
                outer_success: parseInt($('#teleop_outer_success_c1').val()),
                outer_fail: parseInt($('#teleop_outer_fail_c1').val()),
                inner_success: parseInt($('#teleop_inner_c1').val())
            },
            cycle2: {
                lower_success: parseInt($('#teleop_lower_success_c2').val()),
                lower_fail: parseInt($('#teleop_lower_fail_c2').val()),
                outer_success: parseInt($('#teleop_outer_success_c2').val()),
                outer_fail: parseInt($('#teleop_outer_fail_c2').val()),
                inner_success: parseInt($('#teleop_inner_c2').val())
            },
            cycle3: {
                lower_success: parseInt($('#teleop_lower_success_c3').val()),
                lower_fail: parseInt($('#teleop_lower_fail_c3').val()),
                outer_success: parseInt($('#teleop_outer_success_c3').val()),
                outer_fail: parseInt($('#teleop_outer_fail_c3').val()),
                inner_success: parseInt($('#teleop_inner_c3').val())
            },
            cycle4: {
                lower_success: parseInt($('#teleop_lower_success_c4').val()),
                lower_fail: parseInt($('#teleop_lower_fail_c4').val()),
                outer_success: parseInt($('#teleop_outer_success_c4').val()),
                outer_fail: parseInt($('#teleop_outer_fail_c4').val()),
                inner_success: parseInt($('#teleop_inner_c4').val())
            },
            cycle5: {
                lower_success: parseInt($('#teleop_lower_success_c5').val()),
                lower_fail: parseInt($('#teleop_lower_fail_c5').val()),
                outer_success: parseInt($('#teleop_outer_success_c5').val()),
                outer_fail: parseInt($('#teleop_outer_fail_c5').val()),
                inner_success: parseInt($('#teleop_inner_c5').val())
            },
            cycle6: {
                lower_success: parseInt($('#teleop_lower_success_c6').val()),
                lower_fail: parseInt($('#teleop_lower_fail_c6').val()),
                outer_success: parseInt($('#teleop_outer_success_c6').val()),
                outer_fail: parseInt($('#teleop_outer_fail_c6').val()),
                inner_success: parseInt($('#teleop_inner_c6').val())
            },
            cycle7: {
                lower_success: parseInt($('#teleop_lower_success_c7').val()),
                lower_fail: parseInt($('#teleop_lower_fail_c7').val()),
                outer_success: parseInt($('#teleop_outer_success_c7').val()),
                outer_fail: parseInt($('#teleop_outer_fail_c7').val()),
                inner_success: parseInt($('#teleop_inner_c7').val())
            },
            cycle8: {
                lower_success: parseInt($('#teleop_lower_success_c8').val()),
                lower_fail: parseInt($('#teleop_lower_fail_c8').val()),
                outer_success: parseInt($('#teleop_outer_success_c8').val()),
                outer_fail: parseInt($('#teleop_outer_fail_c8').val()),
                inner_success: parseInt($('#teleop_inner_c8').val())
            },
            cycle9: {
                lower_success: parseInt($('#teleop_lower_success_c9').val()),
                lower_fail: parseInt($('#teleop_lower_fail_c9').val()),
                outer_success: parseInt($('#teleop_outer_success_c9').val()),
                outer_fail: parseInt($('#teleop_outer_fail_c9').val()),
                inner_success: parseInt($('#teleop_inner_c9').val())
            },
            cycle10: {
                lower_success: parseInt($('#teleop_lower_success_c10').val()),
                lower_fail: parseInt($('#teleop_lower_fail_c10').val()),
                outer_success: parseInt($('#teleop_outer_success_c10').val()),
                outer_fail: parseInt($('#teleop_outer_fail_c10').val()),
                inner_success: parseInt($('#teleop_inner_c10').val())
            }
        },

        climbStats: {
            climb_type: document.querySelector('input[name="climb"]:checked').value,
            climb_assist: $('#assisted-climb-team').val(),
            climb_lift: $('#lifted-climb-team').val(),
            climb_notes: $('#climb_other').val(),

        },

        fit_under_panel: $('label[name="fit_panel"].active').attr('value'),

        defense_strength: document.querySelector('input[name="defense_strength"]:checked').value,
        defense_type: document.querySelector('input[name="defense_type"]:checked').value,

        match_scouter: $('#scouter').val() === "" ? "-" : $('#scouter').val(),
        match_comment: $('#comment').val() === "" ? "-" : $('#comment').val(),
    };

    db.collection(currentEvent).doc("teamMatchData/" + team + "/" + match_number).set(currentData).then(function () {
            console.log("Document successfully updated!");
        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
        });;

    console.log("Team " + team + " added to teamlist.");
    location.reload();
    $('html,body').scrollTop(0);


    // var counter = firebase.database().ref('allteams/' + team).orderByKey();
    // counter.once("value").then(function(snapshot) {
    //     snapshot.forEach(function(childSnapshot) {
    //         var list_of_matches = childSnapshot.key;
    //         matchArray.push(list_of_matches);
    //     });
    //     var length_of_matches = matchArray.length;
    //     firebase.database().ref().child('allteams/' + team + '/match-count').set(length_of_matches - 1);
    // });

}

// USE TO FETCH TEAM LIST ARRAY... USE FOR NEW COMPETITION
// function fetchTeams() {
//     console.log('hey');
//     var xmlhttp = new XMLHttpRequest();
//     const year = '2018';
//     const event = 'arc';
//     const api = 'https://www.thebluealliance.com/api/v3/event/' + year + event + '/teams/keys' + '?X-TBA-Auth-Key=aSeFMfnmXUczi0DbldlhqJ6u2EyCgEt3XcQyFtElytJCdRHj7swAs8S2vatmCeBX';
//     var teams = []
//     xmlhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             var data = JSON.parse(this.responseText);
//             teams = data;
//             for (i = 0; i < teams.length; i++) {
//                 teams[i] = parseInt(teams[i].substring(3));
//             }

//             teams.sort(sortNumber);
//             for (i = 0; i < teams.length; i++) {
//                 teams[i] = String(teams[i]);
//             }
//             console.log(teams);
//             $("#team").autocomplete({
//                 source: teams
//             });
//         }
//     };
//     xmlhttp.open("GET", api, true);
//     xmlhttp.send();
// }

// function sortNumber(a, b) {
//     return a - b;
// }
// window.onload = fetchTeams;