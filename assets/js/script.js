var workingHours = []
const startTime = 1;
const endTime = 24;

// Initialize for all the working hours in your day
for (time = startTime; time <= endTime; time++) {
    timeBlock = {
        id: time,
        displayHour: moment(time, "hh").format('hA'),
        todo: "",
    }

    workingHours.push(timeBlock)

}

// Save the hours in the day to local store
function saveWorkingHours() {
    localStorage.setItem("workingHours", JSON.stringify(workingHours));
}

// Display working hours
function displayWorkingHours() {
    workingHours.forEach(timeBlock => {
        $("#" + timeBlock.id).val(timeBlock.todo)
    })
}

//load data function -- runs save and display
function loadWorkingHours() {
    var dataLoaded = JSON.parse(localStorage.getItem("workingHours"));

    if (dataLoaded) {
        workingHours = dataLoaded;
    }

    saveWorkingHours()
    displayWorkingHours()
}

workingHours.forEach(function (timeBlock) {
    // Create timeBlock row and append container to it
    var row = $("<form>")
        .addClass("row");
    $(".container").append(row);

    // Display the hour
    var timeField = $("<div>")
        .addClass("col-md-2 hour")
        .text(timeBlock.displayHour);

    var todoText = $("<textarea>")
        .addClass("col-md-9 description p-0")
    todoText.attr("id", timeBlock.id);

    // Style according to scrooge.. post ghosts
    var currentHour = moment().hour();
    if (timeBlock.id == currentHour) {
        todoText.addClass("present")
    } else if (timeBlock.id < currentHour) {
        todoText.addClass("past")
    } else if (timeBlock.id > currentHour) {
        todoText.addClass("future")
    }

    // Save button
    var saveIcon = $("<i class='far fa-save fa-lg'></i>")
    var saveButton = $("<button>")
        .addClass("col-md-1 saveBtn");

    // Put it all together now
    saveButton.append(saveIcon);
    row.append(timeField, todoText, saveButton)
})

// Save button event
$(".saveBtn").on("click", function (event) {
    event.preventDefault();
    debugger;
    var index = $(this).siblings(".description").attr("id") - 1;
    workingHours[index].todo = $(this).siblings(".description").val();

    // Make sure we update data and dispaly
    saveWorkingHours();
    displayWorkingHours;
    // loadWorkingHours();
})

// Initialize the page
var currentDate = moment().format('dddd, MMMM Do');
$("#currentDay").text(currentDate);

loadWorkingHours()