/* ------------ VARIABLES ------------ */

// Get all the checkboxes
var checkboxes = document.getElementsByClassName("checkbox");

// Need to add a unique ID to each row in the table
var rows = document.getElementsByTagName("tr");
for (var i = 0; i < rows.length; i++) {
    rows[i].id = "row" + i;
}


/* ------------ FUNCTIONS ------------ */

function lastDateOpened() {
    const date = new Date();
    const d = date.getUTCDate();
    const m = date.getUTCMonth() + 1;
    const today = d + "/" + m;

    // If lastDateOpened is not the same as the current date, clear storage
    if (localStorage.getItem("lastDateOpened") != today && !null ) {
    localStorage.clear();
    localStorage.setItem("lastDateOpened", today);
        // Make sure checkboxes are unchecked
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
        var row = document.getElementById(checkboxes[i].parentNode.parentNode.id);
        row.style.textDecoration = "none";
        row.style.backgroundColor = "#2b2b2b";
        }
    } else {
        localStorage.setItem("lastDateOpened", today);
    }
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    };
    return i;
}

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

    // If the time ticks past midnight, clear storage and reload the page without cache
    if (h == 0o0 && m == 0o0 && s == 0o1) {
        localStorage.clear();
        location.reload(true);
    }
}

function styleOnLoad() {
    for (var i = 0; i < checkboxes.length; i++) {
        if (localStorage.getItem(checkboxes[i].value) == "true") {
            checkboxes[i].checked = true;
            var row = document.getElementById(checkboxes[i].parentNode.parentNode.id);
            row.style.textDecoration = "line-through";
            row.style.backgroundColor = "green";
        }
    }
}

/* ------------ SETUP ------------ */

lastDateOpened();
Clock();
styleOnLoad();


/* ------------ EVENT LISTENERS ------------ */

for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("click", function () {
        if (this.checked) {
            var row = document.getElementById(this.parentNode.parentNode.id);
            localStorage.setItem(this.value, `true`);
            row.style.textDecoration = "line-through";
            row.style.backgroundColor = "green";
        } else {
            var row = document.getElementById(this.parentNode.parentNode.id);
            localStorage.removeItem(this.value);
            row.style.textDecoration = "none";
            row.style.backgroundColor = "#2b2b2b";
        }
    }
)};