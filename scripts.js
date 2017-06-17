var API_URL = "https://en.wikipedia.org/w/api.php?action=opensearch&limit=10&namespace=0&format=json&callback=?&search=";


$(document).ready(function () {

    $("#search-btn").on("click", search);
    $("#search-text").on("keyup", function (e) {
        if (e.keyCode == 13) {
            search();
        }
    });

    $("#random-btn").on("click", random);
});

function search() {
    var url = API_URL + $("#search-text").val();
    $.getJSON(url, function (json) {
        var searchText = json[0];
        var titles = json[1];
        var descriptions = json[2];
        var urls = json[3];
        var template;
        $("#result").html(""); // clear before append

        for (var i = 0; i < titles.length; i++) {
            template = CARD_TEMPLATE.replace("{title}", titles[i]);
            template = template.replace("{url}", urls[i]);
            template = template.replace("{description}", descriptions[i]);
            $("#result").append(template);
        }

    });
}

var CARD_TEMPLATE = '<div class="card"> \
  <div class="card-block"> \
   <h4 class="card-title"><a href="{url}">{title}</a></h4> \
    {description} \
  </div> \
</div>';
