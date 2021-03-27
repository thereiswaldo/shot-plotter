function setUpShots() {
    d3.select("#hockey-rink")
        .select("#outside-perimeter")
        .on("click", e => {
            createShot(e);
        });
}

function createShot(e) {
    // https://stackoverflow.com/a/29325047
    var teamId = d3.select("input[name='home-away']:checked").property("value");
    var homeBool = teamId === "#home-team";
    var id = uuidv4();
    createDot(teamId, homeBool, d3.pointer(e), id);
    createRow(homeBool, d3.pointer(e), id);
}

function createDot(teamId, homeBool, coords, id) {
    d3.select(teamId)
        .append("circle")
        .attr("cx", coords[0])
        .attr("cy", coords[1])
        .attr("r", 1.5)
        .attr("id", id)
        .attr("class", homeBool ? "home-shot" : "away-shot");
}

function createRow(homeBool, coords, id) {
    var adjustedX = (coords[0] - 100).toFixed(2);
    var adjustedY = (coords[1] - 42.5).toFixed(2);

    // create row
    var row = d3
        .select("#shot-table-body")
        .append("tr")
        .attr("class", homeBool ? "home-row" : "away-row");

    // get shot number
    row.append("th")
        .attr("scope", "col")
        .text(
            d3
                .select("#shot-table-body")
                .selectAll("tr")
                .size()
        );

    // get player field
    var player = d3
        .select("#options")
        .select("#player-input")
        .property("value");

    row.append("td").text(homeBool ? "Home" : "Away");
    row.append("td").text(player);
    row.append("td").text(adjustedX);
    row.append("td").text(adjustedY);
    row.attr("id", id);
    row.on("mouseover", () => {
        d3.select("#teams")
            .select("[id='" + id + "']")
            .transition()
            .duration(75)
            .attr("r", 3);
    });
    row.on("mouseout", () => {
        d3.select("#teams")
            .select("[id='" + id + "']")
            .transition()
            .duration(75)
            .attr("r", 1.5);
    });
}

export { setUpShots };