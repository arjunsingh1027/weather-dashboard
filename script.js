// user search variable
var userSearch = $("#searchTermInput").val();

var urlQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + userSearch + "&appid=5cbd72fd5e331dfb73ef7b35fe744b79"

$("#submit").on("click", function (event) {
    event.preventDefault();
    userQuery();
});

function userQuery() {
    // ajax call for user input
    $.ajax({
        url: urlQuery,
        method: "GET",
    }).then(function (response) {
        const card = $("<div>")
            .attr("class", "container")
            .append(
                $("<div>")
                    .attr("class", "row")
                    .append(
                        $("<div>")
                            .attr("class", "col-md-10")
                            .append(
                                $("<h2>").text("City")
                            )
                    )
            );
        $("#results").append(card);
    });
    console.log("Yay you clicked a button!");
};
