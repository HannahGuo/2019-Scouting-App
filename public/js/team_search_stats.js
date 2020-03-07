function populateStats() {

    $("#stats_table").html("");

    analysis = analyzeData();

    var row = $('<tr></tr>');
    row.append($('<td></td>').text("Average Points Per Teleop (PPT)"));
    row.append($('<td></td>').text(analysis[0]));
    $('#stats_table').append(row);

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Average Standard Deviation for PPT"));
    row.append($('<td></td>').text(analysis[1]));
    $('#stats_table').append(row);

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Average Points Per Teleop-Cycle (PPTC)"));
    row.append($('<td></td>').text(analysis[2]));
    $('#stats_table').append(row);

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Average Standard Deviation for PPTC"));
    row.append($('<td></td>').text(analysis[3]));
    $('#stats_table').append(row);

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Average Points Per Autonomous (PPA)"));
    row.append($('<td></td>').text(analysis[4]));
    $('#stats_table').append(row);

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Average Standard Deviation for PPA"));
    row.append($('<td></td>').text(analysis[5]));
    $('#stats_table').append(row);

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Average Points per Autonomous Shot"));
    row.append($('<td></td>').text(analysis[6]));
    $('#stats_table').append(row);

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Preferred Shot Type"));
    row.append($('<td></td>').text(analysis[7]));

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Number of Disconnects"));
    row.append($('<td></td>').text(analysis[8]));

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Brownout Instances"));
    row.append($('<td></td>').text(analysis[9]));

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Self Climbs"));
    row.append($('<td></td>').text(analysis[10]));

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Parks"));
    row.append($('<td></td>').text(analysis[11]));

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Lifted Team Climbs"));
    row.append($('<td></td>').text(analysis[12]));

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Scale Leveled Climbs"));
    row.append($('<td></td>').text(analysis[13]));

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Failed Climbs"));
    row.append($('<td></td>').text(analysis[14]));

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Failed Parks"));
    row.append($('<td></td>').text(analysis[15]));

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Assisted Climbs"));
    row.append($('<td></td>').text(analysis[16]));

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Did Not Attempts"));
    row.append($('<td></td>').text(analysis[17]));

    row = $('<tr></tr>');
    row.append($('<td></td>').text("Number of Times Defense Played"));
    row.append($('<td></td>').text(analysis[17]));

    $('#stats_table').append(row);

}
