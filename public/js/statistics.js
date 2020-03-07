function analyzeSet(dataset) {

    if (dataset.length <= 0) {
        return 0;
    }

    var median = math.median(dataset);
    return median;

}

function getMean(dataset){
  var sum = 0
  for (i=0; i < dataset.length; i++){
    sum += dataset[i]
  }
  return (sum/dataset.length)
}

function getAverageStd(dataset){
  const mean = getMean(dataset);
  var total_std = 0
  for (i = 0; i < dataset.length; i++){
    std = Math.abs(dataset[i] - mean)
    total_std += std
  }
  return (total_std/dataset.length)
}

function analyzeData() {
  // pref_shot_type = [inner,outer,lower]
  var pref_shot_type = [];
  var a_average_pps  = [];
  var auto_total = [];
  var teleop_total = [];
  var teleop_cycles = [];
  var t_average_ppc = [];

  var dc_mentions = 0;
  var brownout_mentions = 0;

  var self_climbs = 0;
  var parks = 0;
  var scale_leveled = 0;
  var lifted_team_climbs = 0;
  var failed_climbs = 0;
  var failed_parks = 0;
  var assisted_climbs = 0;
  var did_not_attempts = 0;

  var defense_counter = 0;
  var pref_defense_type = [];

  for (i = 0; i < data.match_number.length; i++) {

    var auto_points = 0;
    var teleop_points = 0;

    var auto_inner_scored = data.auto_innerport_success[i];
    var auto_outer_scored = data.auto_outerport_success[i];
    var auto_inner_missed = data.auto_outerport_success[i];
    var auto_outer_missed = data.auto_outerport_fail[i];
    var auto_lower_missed = data.auto_lowport_fail[i];
    var auto_lower_scored = data.auto_lowport_success[i];


    var inner_missed = 0;
    var inner_scored = 0;
    var outer_missed = 0;
    var outer_scored = 0;
    var lower_missed = 0;
    var lower_scored = 0;
    var total_cycles = 0;
    var auto_pps = 0;
    var teleop_ppc = 0;

    var c_inner_array = [data.teleop_inner_c1[i],data.teleop_inner_c2[i],
    data.teleop_inner_c3[i],data.teleop_inner_c4[i],data.teleop_inner_c5[i],
    data.teleop_inner_c6[i],data.teleop_inner_c7[i],data.teleop_inner_c8[i],
    data.teleop_inner_c9[i],data.teleop_inner_c10[i]];

    var c_outer_missed_array = [data.teleop_outer_fail_c1[i],data.teleop_outer_fail_c2[i],
    data.teleop_outer_fail_c3[i],data.teleop_outer_fail_c4[i],data.teleop_outer_fail_c5[i],
    data.teleop_outer_fail_c6[i],data.teleop_outer_fail_c7[i],data.teleop_outer_fail_c8[i],
    data.teleop_outer_fail_c9[i],data.teleop_outer_fail_c10[i]];

    var c_outer_scored_array = [data.teleop_outer_success_c1[i],data.teleop_outer_success_c2[i],
    data.teleop_outer_success_c3[i],data.teleop_outer_success_c4[i],data.teleop_outer_success_c5[i],
    data.teleop_outer_success_c6[i],data.teleop_outer_success_c7[i],data.teleop_outer_success_c8[i],
    data.teleop_outer_success_c9[i],data.teleop_outer_success_c10[i]];

    var c_lower_missed_array = [data.teleop_lower_fail_c1[i],data.teleop_lower_fail_c2[i],
    data.teleop_lower_fail_c3[i],data.teleop_lower_fail_c4[i],data.teleop_lower_fail_c5[i],
    data.teleop_lower_fail_c6[i],data.teleop_lower_fail_c7[i],data.teleop_lower_fail_c8[i],
    data.teleop_lower_fail_c9[i],data.teleop_lower_fail_c10[i]];

    var c_lower_scored_array = [data.teleop_lower_success_c1[i],data.teleop_lower_success_c2[i],
    data.teleop_lower_success_c3[i],data.teleop_lower_success_c4[i],data.teleop_lower_success_c5[i],
    data.teleop_lower_success_c6[i],data.teleop_lower_success_c7[i],data.teleop_lower_success_c8[i],
    data.teleop_lower_success_c9[i],data.teleop_lower_success_c10[i]];

    for (j =0; i < c_inner_array; j++){
      if (c_inner_array[j] > 0){
        total_cycles += 1
        inner_scored += c_inner_array[j]
        pref_shot_type[0] += 1
      }
    }

    for (j =0; i < c_outer_missed_array; j++){
      if (c_outer_missed_array[j] > 0){
        total_cycles += 1
        outer_missed += c_outer_missed_array[j]
        pref_shot_type[1] += 1
      }
    }

    for (j =0; i < c_outer_scored_array; j++){
      if (c_outer_scored_array[j] > 0){
        total_cycles += 1
        outer_scored += c_outer_scored_array[j]
        inner_missed += c_outer_scored_array[j]
        pref_shot_type[0] += 1
      }
    }

    for (j =0; i < c_lower_scored_array; j++){
      if (c_lower_scored_array[j] > 0){
        total_cycles += 1
        lower_scored += c_lower_scored_array[j]
        pref_shot_type[2] += 1
      }
    }

    for (j =0; i < c_lower_missed_array; j++){
      if (c_lower_missed_array[j] > 0){
        total_cycles += 1
        lower_missed += c_lower_missed_array[j]
        pref_shot_type[2] += 1
      }
    }

    teleop_points = (3*inner_scored)+(2*outer_scored)+(lower_scored);
    teleop_ppc= ((3*inner_scored)+(2*outer_scored)+(lower_scored))/total_cycles;

    auto_points = (6*inner_scored)+(4*outer_scored)+(2*lower_scored);
    auto_pps = ((6*inner_scored)+(4*outer_scored)+(2*lower_scored))/(inner_scored+outer_scored+outer_missed+lower_scored+lower_missed);

    teleop_total.push(teleop_points);
    auto_total.push(auto_points);
    a_average_pps.push(auto_pps);
    t_average_ppc.push(teleop_ppc)

    if (data.defense_strength != 'None'){
      defense_counter++
    }

    if (data.match_comment[i].includes('dc') || data.match_comment[i].includes('DC')){
      dc_mentions++
    }

    if (data.match_comment[i].includes('brownout') || data.match_comment[i].includes('brown out') || data.match_comment[i].includes('Brown out')){
      brownout_mentions++
    }

    if (data.climb == 'Self Climb'){
      self_climbs ++
    }
    else if (data.climb == 'Parked'){
      parks++
    }
    else if (data.climb == 'Lifted Team'){
      lifted_team_climbs++
    }
    else if (data.climb == 'Scale Leveled'){
      scale_leveled++
    }
    else if (data.climb == 'Failed Climb'){
      failed_climbs++
    }
    else if (data.climb == 'Failed Park'){
      failed_parks++
    }
    else if (data.climb == 'Assisted Climb'){
      assisted_climbs++
    }
    else if (data.climb == 'Did Not Attempt'){
      did_not_attempts++
    }
  }

  var max_index = 2;
  for (x=0; x < pref_shot_type.length; x++){
    if (pref_shot_type[x] > pref_shot_type[max_index]){
      max_index = x
    }
  }

  if (max_index == 0){
    pref_shot = 'Inner'
  } else if (max_index == 1){
    pref_shot = 'Outer'
  } else if (max_index == 2 && pref_shot_type[2] > 0) {
    pref_shot = 'Lower'
  } else {
    pref_shot = 'None'
  }

  return [getMean(teleop_points),
      getAverageStd(teleop_points),
      getMean(teleop_ppc),
      getAverageStd(teleop_ppc),
      getMean(auto_points),
      getAverageStd(auto_points),
      getMean(auto_pps),
      getAverageStd(auto_pps),
      pref_shot,
      dc_mentions,
      brownout_mentions,
      self_climbs,
      parks,
      lifted_team_climbs,
      scale_leveled,
      failed_climbs,
      failed_parks,
      assisted_climbs,
      did_not_attempts,
      defense_counter
  ];

}

function pushToStats(team) {
    console.log(data.team_number);
    console.log(data.auto_switch_success);
    $('#uploading').html("");

    pushed = analyzeData();

    firebase.database().ref('statistics/').child(team).set({
        team: team,
        auto_switch_success: pushed[0],
        auto_scale_success: pushed[1],
        teleop_switch_success: pushed[2],
        teleop_scale_winning_success: pushed[3],
        teleop_scale_losing_success: pushed[4],
        teleop_opp_switch_success: pushed[5],
        teleop_vault: pushed[6],
        switch_accuracy: pushed[7],
        switch_opp_accuracy: pushed[8],
        scale_winning_accuracy: pushed[9],
        scale_losing_accuracy: pushed[10],
        scale_overall_accuracy: pushed[11]
    }).then(function(done) {
        console.log("Successfully uploaded stats to statistics/" + team);
        $("#uploading").show();
        $('#uploading').html($('#uploading').html() + "<br>Successfully uploaded " + team + " to statistics.");
        setTimeout(function() {
            $("#uploading").hide();
        }, 750);
    });
}

// function createGraph() {

//     if (typeof d3 !== 'undefined') {

//         console.log(data);

//         // var graphData = [
//         //     {"match":5,   "Auto Switch":2,    "Auto Scale":5, "Auto Vault":3},
//         //     {"match":11,   "Auto Switch":1,    "Auto Scale":5, "Auto Vault":3},
//         //     {"match":17,   "Auto Switch":5,    "Auto Scale":5, "Auto Vault":3},
//         //     {"match":23,   "Auto Switch":2,    "Auto Scale":5, "Auto Vault":3},
//         //     {"match":29,   "Auto Switch":2,    "Auto Scale":5, "Auto Vault":3},
//         //     {"match":36,   "Auto Switch":2,    "Auto Scale":5, "Auto Vault":3},
//         //     {"match":42,   "Auto Switch":2,    "Auto Scale":5, "Auto Vault":3},
//         //     {"match":48,   "Auto Switch":2,    "Auto Scale":5, "Auto Vault":3},
//         //     {"match":54,   "Auto Switch":2,    "Auto Scale":5, "Auto Vault":3},
//         //     {"match":60,  "Auto Switch":2,    "Auto Scale":5, "Auto Vault":3},
//         //     {"match":66,  "Auto Switch":2,    "Auto Scale":5, "Auto Vault":3},
//         //     {"match":72,  "Auto Switch":2,    "Auto Scale":5, "Auto Vault":3}];
//         // var key = ["Auto Switch", "Auto Scale", "Auto Vault"];
//         // var colors = ["#FF0000", "#00FF00" , "#0000FF"];

//         var graphData = [];
//         for (var i = 0; i < data.match_number.length; i++) {
//             bar = {
//                 "match": data.match_number[i],
//                 "Auto Switch": data.auto_switch_success[i],
//                 "Auto Scale": data.auto_scale_success[i],
//                 "Auto Vault": data.auto_vault[i],
//                 "Teleop Switch": data.teleop_switch_success[i],
//                 "Teleop Scale": data.teleop_scale_success[i],
//                 "Teleop Opp Switch": data.teleop_opp_switch_success[i],
//                 "Teleop Vault": data.teleop_vault[i]
//             };
//             graphData.push(bar);
//         };

//         var key = ["Auto Switch", "Auto Scale", "Auto Vault", "Teleop Switch", "Teleop Scale", "Teleop Opp Switch", "Teleop Vault"];
//         var colors = ["#FFEB3B", "#FF9800", "#CDDC39", "#2196F3", "#3F51B5", "#9C27B0", "#E91E63"];


//         $('#stacked-bar').html("");

//         initStackedBarChart.draw({
//             data: graphData,
//             key: key,
//             colors: colors,
//             element: 'stacked-bar'
//         });

//     }

// }


// var initStackedBarChart = {
//     draw: function(config) {
//         me = this,
//             domEle = config.element,
//             stackKey = config.key,
//             stackColors = config.colors,
//             graphData = config.data,
//             margin = {
//                 top: 20,
//                 right: 20,
//                 bottom: 100,
//                 left: 30
//             },
//             width = 700 - margin.left - margin.right,
//             height = 600 - margin.top - margin.bottom,
//             xScale = d3.scaleBand().range([0, width]).padding(0.1),
//             yScale = d3.scaleLinear().range([height, 0]),
//             color = d3.scaleOrdinal()
//             .domain(stackKey)
//             .range(stackColors),
//             xAxis = d3.axisBottom(xScale),
//             yAxis = d3.axisLeft(yScale),
//             svg = d3.select("#" + domEle).append("svg")
//             .attr("width", width + margin.left + margin.right)
//             .attr("height", height + margin.top + margin.bottom)
//             .append("g")
//             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//         var stack = d3.stack()
//             .keys(stackKey)
//             .order(d3.stackOrderNone)
//             .offset(d3.stackOffsetNone);

//         var layers = stack(graphData);
//         // graphData.sort(function(a, b) { return b.total - a.total; });
//         xScale.domain(graphData.map(function(d) {
//             return d.match;
//         }));
//         yScale.domain([0, d3.max(layers[layers.length - 1], function(d) {
//             return d[0] + d[1];
//         })]).nice();

//         var layer = svg.selectAll(".layer")
//             .data(layers)
//             .enter().append("g")
//             .attr("class", "layer")
//             .style("fill", function(d, i) {
//                 return color(i);
//             });

//         layer.selectAll("rect")
//             .data(function(d) {
//                 return d;
//             })
//             .enter().append("rect")
//             .attr("x", function(d) {
//                 return xScale(d.data.match);
//             })
//             .attr("y", function(d) {
//                 return yScale(d[1]);
//             })
//             .attr("height", function(d) {
//                 return yScale(d[0]) - yScale(d[1]);
//             })
//             .attr("width", xScale.bandwidth());

//         svg.append("g")
//             .attr("class", "axis axis--x")
//             .attr("transform", "translate(0," + (height + 5) + ")")
//             .call(xAxis);

//         svg.append("g")
//             .attr("class", "axis axis--y")
//             .attr("transform", "translate(0,0)")
//             .call(yAxis);

//         svg.append("text")
//             .attr("class", "x label")
//             .attr("text-anchor", "end")
//             .attr("x", width / 2 + 20)
//             .attr("y", height + 50)
//             .text("Match Number");

//         svg.append("text")
//             .attr("class", "y label")
//             .attr("text-anchor", "end")
//             .attr("y", 6)
//             .attr("dy", ".75em")
//             .attr("transform", "rotate(-90)")
//             .text("Cumulative # of Cubes");

//         // add legend
//         var legend = svg.append("g")
//             .attr("class", "legend")
//             .attr("height", 1000)
//             .attr("width", 200)
//             .attr('transform', 'translate(-120,0)')


//         legend.selectAll('rect')
//             .data(stackColors)
//             .enter()
//             .append("rect")
//             .attr("x", width - 65)
//             .attr("y", function(d, i) {
//                 return 140 - i * 20;
//             })
//             .attr("width", 10)
//             .attr("height", 10)
//             .style("fill", function(d) {
//                 var color = d;
//                 return color;
//             })

//         legend.selectAll('text')
//             .data(stackKey)
//             .enter()
//             .append("text")
//             .attr("x", width - 52)
//             .attr("y", function(d, i) {
//                 return 140 - i * 20 + 9;
//             })
//             .text(function(d) {
//                 var text = d;
//                 return text;
//             });
//     }
// }
