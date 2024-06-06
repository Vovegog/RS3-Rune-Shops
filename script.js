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
    var t = setTimeout(function () {
        Clock()
    }, 500);

    // If the time is 00:00:00, refresh the page to reset the checkboxes
    if (h == 0 && m == 0 && s == 1) {
        location.reload();
    }
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
}

Clock();

// Get all the checkboxes
var checkboxes = document.getElementsByClassName("checkbox");

// Need to add a unique ID to each row in the table
var rows = document.getElementsByTagName("tr");
for (var i = 0; i < rows.length; i++) {
    rows[i].id = "row" + i;
}


function styleOnLoad() {
    // When loading the webpage, or refreshing, check to see if there are any checked boxes. Style them accordingly
    for (var i = 0; i < checkboxes.length; i++) {
        if (document.cookie.indexOf(checkboxes[i].value) != -1) {
            checkboxes[i].checked = true;
            var row = document.getElementById(checkboxes[i].parentNode.parentNode.id);
            row.style.textDecoration = "line-through";
            row.style.backgroundColor = "green";
        }
    }
}
styleOnLoad();

for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("click", function () {

        // If the box gets checked, console.log it out, add it as a cookie and style the row
        if (this.checked) {
            // Get today's date and set the expiry date to the following day
            var today = new Date();
            var expiry = new Date(today);
            expiry.setUTCDate(today.getUTCDate() + 1);
            expiry.setUTCHours(2, 0, 0, 0);
            expiry = expiry.toUTCString();

            // console.log("Checked: " + this.value + " in row " + this.parentNode.parentNode.id + " with expiry date: " + expiry); //debugging
            var row = document.getElementById(this.parentNode.parentNode.id);
            document.cookie = this.value + `=true; expires=${expiry}`;
            row.style.textDecoration = "line-through";
            row.style.backgroundColor = "green";

        } else { // In case of unchecking, delete the cookie and remove the styling
            console.log("Unchecked: " + this.value + " in row " + this.parentNode.parentNode.id);
            var row = document.getElementById(this.parentNode.parentNode.id);
            document.cookie = this.value + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            row.style.textDecoration = "none";
            row.style.backgroundColor = "#2b2b2b";
        }
    });
}


// Add a button to check what cookies are currently stored, for debugging.

// var cookieButton = document.getElementById("cookieButton");
// cookieButton.addEventListener("click", function() {
//     console.log(document.cookie.valueOf());
//     document.getElementById("cookies").innerHTML = document.cookie;
// });


// In case of fuckery, code to delete all cookies. Thanks, StackOverflow

// function deleteAllCookies() {
//     var c = document.cookie.split("; ");
//     for (i in c)
//     document.cookie =/^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
// }

// deleteAllCookies();