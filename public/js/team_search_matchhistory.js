function returnAutoSum(dataO, selector) {
  return parseInt(dataO[selector]);
}

function returnTeleopSum(dataO, selector) {
  var sum = 0;
  for (data in dataO) {
    sum += dataO[data][selector];
  }
  return parseInt(sum);
}

function getNumCycles(dataO) {
  var num = 0;
  var dataArr = {};
  for (data in dataO) {
    // THIS NEEDS TO BE PROPERLY FIXED AT SOME POINT
    if (Object.keys(dataO)[num] != "cycle10" && "00000" == (dataO[data]["lower_success"] + dataO[data]["lower_fail"] + dataO[data]["outer_success"] + dataO[data]["outer_fail"] + dataO[data]["inner_success"])) {
      return num - 1;
    }
    num++;
  }
}

function populateMatchHistory() {
  db.collection("barrie2020").doc("teamMatchData").collection(team).get().then(function (querySnapshot) {
    $('#auto_table').html("");
    $('#teleop_table').html("");
    querySnapshot.forEach(function (doc) {
      var rowAuto = $('<tr></tr>');
      var lowerScoredAuto = returnAutoSum(doc.data().autoStats, "lower_success");
      var lowerFailAuto = returnAutoSum(doc.data().autoStats, "lower_fail");
      var outerScoredAuto = returnAutoSum(doc.data().autoStats, "outer_success");
      var outerFailAuto = returnAutoSum(doc.data().autoStats, "outer_fail");
      var innerScoredAuto = returnAutoSum(doc.data().autoStats, "inner_success");
      rowAuto.append($('<td></td>').text(doc.id));
      rowAuto.append($('<td></td>').text(lowerFailAuto + " " + lowerScoredAuto));
      rowAuto.append($('<td></td>').text(outerFailAuto + " " + outerScoredAuto));
      rowAuto.append($('<td></td>').text(innerScoredAuto));
      $('#auto_table').append(rowAuto);

      var rowTeleop = $('<tr></tr>');
      var lowerScoredTeleop = returnTeleopSum(doc.data().teleopCycleStats, "lower_success");
      var lowerFailTeleop = returnTeleopSum(doc.data().teleopCycleStats, "lower_fail");
      var outerScoredTeleop = returnTeleopSum(doc.data().teleopCycleStats, "outer_success");
      var outerFailTeleop = returnTeleopSum(doc.data().teleopCycleStats, "outer_fail");
      var innerScoredTeleop = returnTeleopSum(doc.data().teleopCycleStats, "inner_success");
      var totalScored = lowerScoredTeleop + outerScoredTeleop + innerScoredTeleop;
      var totalMissed = lowerFailTeleop + outerFailTeleop;
      var totalShot = totalScored + totalMissed;
      var cellPercentage = Math.floor((totalScored / totalShot) * 100);

      rowTeleop.append($('<td></td>').text(doc.id));
      rowTeleop.append($('<td></td>').text(lowerFailTeleop + " " + lowerScoredTeleop));
      rowTeleop.append($('<td></td>').text(outerFailTeleop + " " + outerScoredTeleop));
      rowTeleop.append($('<td></td>').text(innerScoredTeleop));
      rowTeleop.append($('<td></td>').text(cellPercentage + "%  (" + totalScored + "/" + totalShot + ")"));
      rowTeleop.append($('<td></td>').text(getNumCycles(doc.data().teleopCycleStats)));
      $('#teleop_table').append(rowTeleop);
    });
  });

  //matchHistoryOverall();
  // matchHistoryTeleop();
  // matchHistoryTeleop();
  // matchHistoryClimb();
  // matchHistoryDefense();
  // matchHistoryComments();
  // pitData();
}

// function matchHistoryOverall() {
//   $('#overall_table').html("");
//   for (i = 0; i < data.match_number.length; i++) {
//     var row = $('<tr></tr>');
//     row.append($('<th scope="row"></th>').text(data.match_number[i]));
//     $('#overall_table').append(row);
//   }
// }

// function matchHistoryAuto() {
//   $('#auto_table').html("");
//   for (i = 0; i < data.match_number.length; i++) {
//     var row = $('<tr></tr>');
//     row.append($('<th scope="row"></th>').text(data.match_number[i]));
//     row.append($('<td></td>').text(data.auto_innerport_success[i]));
//     row.append($('<td></td>').text(data.auto_outerport_fail[i]));
//     row.append($('<td></td>').text(data.auto_outerport_success[i]));
//     row.append($('<td></td>').text(data.auto_lowport_fail[i]));
//     row.append($('<td></td>').text(data.auto_lowport_success[i]));
//     row.append($('<td></td>').text(data.auto_line[i]));
//     row.append($('<td></td>').text(data.no_auto[i]));
//     $('#auto_table').append(row);
//   }
// }

// function matchHistoryTeleop() {
//   $('#teleop_table').html("");

//   for (i = 0; i < data.match_number.length; i++) {
//     var c_inner = 0;
//     var c_outer_missed = 0;
//     var c_outer_scored = 0;
//     var c_lower_missed = 0;
//     var c_lower_scored = 0;
//     var total_inner_cycles = 0;
//     var total_outer_cycles = 0;
//     var total_lower_cycles = 0;

//     var c_inner_array = [data.teleop_inner_c1[i], data.teleop_inner_c2[i],
//       data.teleop_inner_c3[i], data.teleop_inner_c4[i], data.teleop_inner_c5[i],
//       data.teleop_inner_c6[i], data.teleop_inner_c7[i], data.teleop_inner_c8[i],
//       data.teleop_inner_c9[i], data.teleop_inner_c10[i]
//     ];

//     var c_outer_missed_array = [data.teleop_outer_fail_c1[i], data.teleop_outer_fail_c2[i],
//       data.teleop_outer_fail_c3[i], data.teleop_outer_fail_c4[i], data.teleop_outer_fail_c5[i],
//       data.teleop_outer_fail_c6[i], data.teleop_outer_fail_c7[i], data.teleop_outer_fail_c8[i],
//       data.teleop_outer_fail_c9[i], data.teleop_outer_fail_c10[i]
//     ];

//     var c_outer_scored_array = [data.teleop_outer_success_c1[i], data.teleop_outer_success_c2[i],
//       data.teleop_outer_success_c3[i], data.teleop_outer_success_c4[i], data.teleop_outer_success_c5[i],
//       data.teleop_outer_success_c6[i], data.teleop_outer_success_c7[i], data.teleop_outer_success_c8[i],
//       data.teleop_outer_success_c9[i], data.teleop_outer_success_c10[i]
//     ];

//     var c_lower_missed_array = [data.teleop_lower_fail_c1[i], data.teleop_lower_fail_c2[i],
//       data.teleop_lower_fail_c3[i], data.teleop_lower_fail_c4[i], data.teleop_lower_fail_c5[i],
//       data.teleop_lower_fail_c6[i], data.teleop_lower_fail_c7[i], data.teleop_lower_fail_c8[i],
//       data.teleop_lower_fail_c9[i], data.teleop_lower_fail_c10[i]
//     ];

//     var c_lower_scored_array = [data.teleop_lower_success_c1[i], data.teleop_lower_success_c2[i],
//       data.teleop_lower_success_c3[i], data.teleop_lower_success_c4[i], data.teleop_lower_success_c5[i],
//       data.teleop_lower_success_c6[i], data.teleop_lower_success_c7[i], data.teleop_lower_success_c8[i],
//       data.teleop_lower_success_c9[i], data.teleop_lower_success_c10[i]
//     ];

//     for (j = 0; j < c_inner_array.length; j++) {
//       c_inner += parseInt(c_inner_array[j]);
//       if (parseInt(c_inner_array[j]) > 0) {
//         total_inner_cycles += 1;
//       }
//     }

//     for (j = 0; j < c_outer_missed_array.length; j++) {
//       c_outer_missed += parseInt(c_outer_missed_array[j]);
//       if (parseInt(c_outer_missed_array[j]) > 0) {
//         total_outer_cycles += 1;
//       }
//     }

//     for (j = 0; j < c_outer_scored_array.length; j++) {
//       c_outer_scored += parseInt(c_outer_scored_array[j]);
//       if (parseInt(c_outer_scored_array[j]) > 0) {
//         total_outer_cycles += 1;
//       }
//     }

//     for (j = 0; j < c_lower_scored_array.length; j++) {
//       c_lower_scored += parseInt(c_lower_scored_array[j]);
//       if (parseInt(c_lower_scored_array[j]) > 0) {
//         total_lower_cycles += 1;
//       }
//     }

//     for (j = 0; j < c_lower_missed_array.length; j++) {
//       c_lower_missed += parseInt(c_lower_missed_array[j]);
//       if (parseInt(c_lower_missed_array[j]) > 0) {
//         total_lower_cycles += 1;
//       }
//     }

//     var total_cycles = total_inner_cycles + total_lower_cycles + total_outer_cycles;
//     var ppc = (((3 * c_inner) + (2 * c_outer_scored) + 1 * (c_lower_scored)) / total_cycles).toFixed(3);

//     var row = $('<tr></tr>');
//     row.append($('<th scope="row"></th>').text(data.match_number[i]));
//     row.append($('<td></td>').text(c_inner.toString()));
//     row.append($('<td></td>').text(c_outer_missed.toString()));
//     row.append($('<td></td>').text(c_outer_scored.toString()));
//     row.append($('<td></td>').text(c_lower_missed.toString()));
//     row.append($('<td></td>').text(c_lower_scored.toString()));
//     row.append($('<td></td>').text(total_cycles.toString()));
//     row.append($('<td></td>').text(ppc.toString()));

//     $('#teleop_table').append(row);

//   }

// }

// function matchHistoryClimb() {

//   $('#climb_table').html("");

//   for (i = 0; i < data.match_number.length; i++) {

//     var row = $('<tr></tr>');

//     row.append($('<th scope="row"></th>').text(data.match_number[i]));
//     row.append($('<td></td>').text(data.climb_assist[i]));
//     row.append($('<td></td>').text(data.climb_lift[i]));
//     row.append($('<td></td>').text(data.climb_notes[i]));
//     //row.append($('<td></td>').text(data.climb_scale_level[i]));
//     row.append($('<td></td>').text(data.climb[i]));


//     $('#climb_table').append(row);

//   }
// }

// function matchHistoryDefense() {

//   $('#defense_table').html("");

//   for (i = 0; i < data.match_number.length; i++) {

//     var row = $('<tr></tr>');

//     row.append($('<th scope="row"></th>').text(data.match_number[i]));
//     row.append($('<th scope="row"></th>').text(data.fit_under_panel[i]));
//     row.append($('<th scope="row"></th>').text(data.defense_type[i]));
//     row.append($('<th scope="row"></th>').text(data.defense_strength[i]));
//     $('#defense_table').append(row);

//   }
// }

// function matchHistoryComments() {

//   $('#comment_table').html("");

//   for (i = 0; i < data.match_number.length; i++) {

//     var row = $('<tr></tr>');

//     row.append($('<th scope="row"></th>').text(data.match_number[i]));
//     row.append($('<td></td>').text(data.match_scouter[i]));
//     row.append($('<td></td>').text(data.match_comment[i]));

//     $('#comment_table').append(row);

//   }

// }


// function pitData() {
//   var pitdata = []
//   firebase.database().ref('pitdata/' + team + '/switch_capable').on('value', function (snapshot) {
//     pitdata[0] = snapshot.val()
//   });
//   firebase.database().ref('pitdata/' + team + '/scale_capable').on('value', function (snapshot) {
//     pitdata[1] = snapshot.val()
//   });
//   firebase.database().ref('pitdata/' + team + '/comments').on('value', function (snapshot) {
//     pitdata[2] = snapshot.val()
//     $('#pit_table').html("");
//     var row = $('<tr></tr>');
//     row.append($('<td></td>').text(pitdata[0]));
//     row.append($('<td></td>').text(pitdata[1]));
//     row.append($('<td></td>').text(pitdata[2]));
//     $('#pit_table').append(row);
//   });

// }