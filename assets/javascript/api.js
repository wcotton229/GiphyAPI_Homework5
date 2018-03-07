$(document).ready(function(){

    var displayedButtons = ["Captian America", "Thor", "Iron Man"];

    function displayImg(){

        $("#display-images").empty();
        var input = $(this).attr("data-name");
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=M8o8isQMDqBsTUWue5JkUMPh7NmBn4Rc";   

        $.ajax({
            url: queryURL, 
            method: "GET"
        }).then(function(response) {

            for(var i = 0; i < limit; i++) {    

                var displayDiv = $("<div>");
                displayDiv.addClass("holder");
                var image = $("<img>");
                image.attr("src", response.data[i].images.original_still.url);
                image.attr("data-still", response.data[i].images.original_still.url);
                image.attr("data-animate", response.data[i].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.append(image);

                var rating = response.data[i].rating;
                console.log(response);
                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating)

                $("#display-images").append(displayDiv);
            }
        });
    }

    function renderButtons(){ 

        $("#display-buttons").empty();

        for (var j = 0; j < displayedButtons.length; j++){

            var newButton = $("<button>") 
            newButton.attr("class", "btn btn-primary");
            newButton.attr("id", "input")  
            newButton.attr("data-name", displayedButtons[j]); 
            newButton.text(displayedButtons[j]); 
            $("#display-buttons").append(newButton); 
        }
    }

    function imageChangeState() {          

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
    }

    $("#submitBtn").on("click", function(){

        var input = $("#user-input").val().trim();
        form.reset();
        displayedButtons.push(input);
                
        renderButtons();

        return false;
    })

    renderButtons();

    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);
});