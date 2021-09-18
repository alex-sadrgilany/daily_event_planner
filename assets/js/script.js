// Creating variable for the current date and time
var currentDateTime = moment().format("LLLL");
// Printing current date and time to the proper tag in the header section
$("#currentDay").html(currentDateTime);
console.log("It is currently " + currentDateTime);


var saveText = function() {

    // Grabbing the text from the sibling of the button the user just clicked
    var text = $(this).siblings(".description").val().trim();
    // Grabbing the id of the parent
    var hour = $(this).parent().attr("id");

    // Adding an edge case for if the user accidentally saves a deleted field
    if (text==="") {
        var yesNo = confirm("Your event for this hour is empty. Are you sure you want to save?");
            if (yesNo) {
                localStorage.setItem(hour, text);
            }
            else {
                // replace value of this hour's text box with the last saved text
                loadText();
            }
    }
    // Saving to Local Storage
    else {
        localStorage.setItem(hour, text);
    }
}   

var loadText = function() {
    // create an array of all the necessary hour ids
    var hourIdArray = ["am9", "am10", "am11", "pm12", "pm1", "pm2", "pm3", "pm4", "pm5"];

    // create a for loop to get local storage for each hour's unique id
    for (i = 0; i < hourIdArray.length; i++) {
        var id = hourIdArray[i];
        $("#"+ id + " .description").val(localStorage.getItem(id));
    };
};

// Creating a function that will check the current hour against the hour of each row
var checkTime = function() {
    var currentHour = moment().hour();

    // using split to capture only the number from each row's id
    var plannerTime = $(".time-block").attr("id").split("m")[1];

    if (plannerTime < currentHour) {
        $(this).removeClass("present");
        $(this).removeClass("future");
        $(this).addClass("past");
    }
    else if (plannerTime === currentHour) {
        $(this).removeClass("future");
        $(this).removeClass("past");
        $(this).addClass("present");
    }
    else if (plannerTime > currentHour) {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
    }
    
}

$(".saveBtn").on("click", saveText);

loadText();

$(".time-block").each(checkTime);