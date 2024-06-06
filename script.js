// JS code should create a cookie holding which checkboxes have been marked.
// These cookies should expire at 00:00 UTC on the following day, as that is when reset happens.
// Additionally, marked checkboxes and their corresponding table-row should have a dash through them, and be highlighted.

function Clock() {
    var today = new Date();
    var h = today.getUTCHours();
    var m = today.getUTCMinutes();
    var s = today.getUTCSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('Clock').innerHTML = h + ":" + m + ":" + s;
    var t = setTimeout(function() {
        Clock()
    }, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
}

Clock();

// Get all the checkboxes, and add an event listener to each one.
var checkboxes = document.getElementsByClassName("checkbox");

// Need to add a unique ID to each row in the table
var rows = document.getElementsByTagName("tr");
for (var i = 0; i < rows.length; i++) {
    rows[i].id = "row" + i;
}

for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("click", function() {
        // If the box gets checked, console.log it out, and add it as a cookie
        if (this.checked) {
            console.log("Checked: " + this.name);
            document.cookie = this.name + "=true; expires=Fri, 31 Dec 9999 23:59:59 UTC";
        } else { // In case of unchecking, delete the cookie
            console.log("Unchecked: " + this.name);
            document.cookie = this.name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        }      
    });
}

// Add a button to check what cookies are currently stored, for debugging.
var cookieButton = document.getElementById("cookieButton");
cookieButton.addEventListener("click", function() {
    console.log(document.cookie);
    document.getElementById("cookies").innerHTML = document.cookie;
});

