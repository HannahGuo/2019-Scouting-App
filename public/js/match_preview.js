var currentEventCode = "2020onbar";
var currentEvent = "york2020"

var matchNumber = "";

function getMatchNumber() {
    matchNumber = $("#matchNumber").val() + "";

    if (matchNumber != "")
        loadAlliances();
}

function loadAlliances() {
    db.collection(currentEvent).doc("matchAlliances").collection(matchNumber).get().then(function (querySnapshot) {
        $('#alliance_table').html("");
        var alliance = "redAlliance";
        querySnapshot.forEach(function (doc) {
            var rowAlliance = $('<tr class=' + alliance + '></tr>');

            for (var i = 0; i < 3; i++) {
                var dataToAdd = doc.data()[i];

                if (dataToAdd == "1325") {
                    rowAlliance.append($('<td></td>').html("<strong><u>" + dataToAdd + "<u></strong>"));
                    continue
                }
                rowAlliance.append($('<td></td>').html(dataToAdd));

            }

            alliance = "blueAlliance";
            $('#alliance_table').append(rowAlliance);
        });
    });
}

function genUrl(things) {
    const key = "?X-TBA-Auth-Key=" + "Z9sHYqZD6LdHj0mCWfvOvYTz8nAKALntU0AOIApeWaq5RYmlxnptRAhBNTt3aJmq";
    let url = "https://www.thebluealliance.com/api/v3/";
    for (let i = 0; i < things.length; i++)
        url += things[i] + "/"

    if (url[url.length - 1].endsWith("/"))
        url = url.substring(0, url.length - 1);
    // console.log(url + key);
    return url + key;
}

function retrieveCurrentEventMatches() {
    $.get(genUrl(["event", currentEventCode, "matches", "simple"]), function (data, status) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].comp_level == "qm") {
                var red_alliance = [data[i].alliances.red.team_keys[0].substring(3, data[i].alliances.red.team_keys[0].length),
                    data[i].alliances.red.team_keys[1].substring(3, data[i].alliances.red.team_keys[1].length),
                    data[i].alliances.red.team_keys[2].substring(3, data[i].alliances.red.team_keys[2].length)
                ];
                var blue_alliance = [data[i].alliances.blue.team_keys[0].substring(3, data[i].alliances.blue.team_keys[0].length),
                    data[i].alliances.blue.team_keys[1].substring(3, data[i].alliances.blue.team_keys[1].length),
                    data[i].alliances.blue.team_keys[2].substring(3, data[i].alliances.blue.team_keys[2].length)
                ];
                writeMatchesToFirebase(data[i].match_number.toString(), "ared", $.extend({}, red_alliance));
                writeMatchesToFirebase(data[i].match_number.toString(), "blue", $.extend({}, blue_alliance));
            }
        };
    });
}

function writeMatchesToFirebase(matchNumber, alliance, teams) {
    db.collection(currentEvent).doc("matchAlliances").collection(matchNumber).doc(alliance).set(teams).then(function () {
            console.log("Document successfully updated!");
        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
        });
}

retrieveCurrentEventMatches();