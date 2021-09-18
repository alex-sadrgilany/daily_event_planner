// Creating variable for the current date and time
var currentDateTime = moment().format("LLLL");
// Printing current date and time to the proper tag in the header section
$("#currentDay").html(currentDateTime);
console.log("It is currently " + currentDateTime);


var saveText = function() {

    var text = $(this).siblings(".description").val().trim();
    var hour = $(this).parent().attr("id");

    console.log(text);
    console.log(hour);

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
    else {
        localStorage.setItem(hour, text);
    }
}   

function loadText () {
    // create an array of all the necessary hour ids
    var hourIdArray = ["am9", "am10", "am11", "pm12", "pm1", "pm2", "pm3", "pm4", "pm5"];

    // create a for loop to get local storage for each hour's unique id
    for (i = 0; i < hourIdArray.length; i++) {
        var id = hourIdArray[i];
        $("#"+ id + " .description").val(localStorage.getItem(id));
    };
};


$(".saveBtn").on("click", saveText);

loadText();