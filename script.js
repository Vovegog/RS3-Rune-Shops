// JS code should create a cookie holding which checkboxes have been marked.
// These cookies should expire at 00:00 UTC on the following day, as that is when reset happens.
// Additionally, marked checkboxes and their corresponding table-row should have a dash through them, and be highlighted.

// Get all the checkboxes, and add an event listener to each one.
var checkboxes = document.getElementsByClassName("checkbox");
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

