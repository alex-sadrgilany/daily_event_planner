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
                console.log("The user's event was saved!");
            }
            else {
                // replace value of this hour's text box with the last saved text
                loadText();
            }
    }
    // Saving to Local Storage
    else {
        localStorage.setItem(hour, text);
        console.log("The user's event was saved!");
    }
}   

var loadText = function() {
    // create an array of all the necessary hour ids
    var hourIdArray = ["am9", "am10", "am11", "pm12", "pm13", "pm14", "pm15", "pm16", "pm17"];

    // create a for loop to get local storage for each hour's unique id
    for (i = 0; i < hourIdArray.length; i++) {
        var id = hourIdArray[i];
        $("#"+ id + " .description").val(localStorage.getItem(id));
    };
    console.log("All of the user's events were loaded!");
};

var deleteText = function() {
    // Grabbing the proper text from the sibling of the button the user just clicked
    var text2 = $(this).siblings(".description");
    // Grabbing the id of the parent
    var hour2 = $(this).parent().attr("id");

    // confirm the user wants to delete
    var yesNo = confirm("Are you sure you want to delete this event?");
        if (yesNo) {
            text2.val("");
        }
        else {
            return;
        }
    
    localStorage.setItem(hour2, text2.val());
    console.log("The user's event was deleted!");
    loadText();
}

// Creating a function that will check the current hour against the hour of each row
var checkTime = function() {
    var currentHour = moment().hour();

    // using split to capture only the number from each row's id
    var plannerTime = parseInt($(this).attr("id").split("m")[1]);

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
    else {
        return;
    }
}

// Adding event listeners to the necessary buttons
$(".saveBtn").on("click", saveText);
$(".deleteBtn").on("click", deleteText);
// Calling the checkTime function to loop through each hour's time-block and update their classes accordingly
$(".time-block").each(checkTime);
// loading local storage
loadText();